import React from "react";
import { AlertTriangle, RotateCw } from "lucide-react";
import { reloadApp } from "@/hooks/use-app-updates";

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches render errors in a page so one broken section doesn't blank the whole
 * site: the navbar stays usable, and navigating away remounts (and resets) this.
 */
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Page failed to render:", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 pt-24 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-portfolio-highlight/10 text-portfolio-highlight">
          <AlertTriangle size={28} aria-hidden="true" />
        </span>
        <h1 className="text-2xl font-semibold text-portfolio-white">Something went wrong</h1>
        <p className="max-w-md text-portfolio-slate">
          This page couldn't be displayed. Try another section, or reload.
        </p>
        <button onClick={reloadApp} className="btn-primary">
          <RotateCw size={17} aria-hidden="true" /> Reload
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;
