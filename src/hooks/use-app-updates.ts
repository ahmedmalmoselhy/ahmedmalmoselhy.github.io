import { useEffect } from "react";
import { toast } from "sonner";

const CHECK_EVERY_MS = 15 * 60 * 1000;

/**
 * Vite's entry bundle path, e.g. "/assets/index-C3vjXC1i.js". Its hash changes on
 * every deploy that changes code, so comparing it tells us a newer build is live.
 */
export const entryBundle = (html: string) => html.match(/\/assets\/index-[\w-]+\.js/)?.[0] ?? null;

/**
 * Reload that always gets a fresh index.html: GitHub Pages lets browsers cache it for
 * 10 minutes, so a unique query string sidesteps the cache. The current page (URL hash)
 * is kept; the query is stripped again on load.
 */
export const reloadApp = () =>
  window.location.replace(`${window.location.pathname}?v=${Date.now()}${window.location.hash}`);

/**
 * Installed web apps have no browser reload button and can resume from the background
 * for days. Whenever the app becomes visible (and every 15 min while open), fetch the
 * live index.html uncached and offer a one-tap refresh if a newer build is deployed.
 */
export function useAppUpdates() {
  useEffect(() => {
    // Tidy the URL after a reloadApp() refresh
    if (new URLSearchParams(window.location.search).has("v")) {
      window.history.replaceState(window.history.state, "", window.location.pathname + window.location.hash);
    }
    if (!import.meta.env.PROD) return; // dev server has no hashed bundle

    const running = entryBundle(document.documentElement.outerHTML);
    if (!running) return;
    let notified = false;

    const check = async () => {
      if (notified || document.visibilityState !== "visible") return;
      try {
        const res = await fetch(`/?update-check=${Date.now()}`, { cache: "no-store" });
        const live = entryBundle(await res.text());
        if (live && live !== running) {
          notified = true;
          toast("A new version is available", {
            id: "app-update",
            duration: Infinity,
            action: { label: "Refresh", onClick: reloadApp },
          });
        }
      } catch {
        // Offline or flaky network: try again on the next visibility change / interval
      }
    };

    check();
    const timer = window.setInterval(check, CHECK_EVERY_MS);
    document.addEventListener("visibilitychange", check);
    window.addEventListener("pageshow", check);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", check);
      window.removeEventListener("pageshow", check);
    };
  }, []);
}
