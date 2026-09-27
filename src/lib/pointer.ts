import type React from "react";

/** Pointer-driven effects shared across pages. All respect prefers-reduced-motion where they move things. */

export const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type PE = React.PointerEvent<HTMLElement>;

const local = (e: PE) => {
  const r = e.currentTarget.getBoundingClientRect();
  return { x: e.clientX - r.left, y: e.clientY - r.top, w: r.width, h: r.height };
};

/** Moves the dot-grid glow of a .dot-stage element to the cursor (--mx/--my). */
export const trackPointer = (e: PE) => {
  const { x, y } = local(e);
  e.currentTarget.style.setProperty("--mx", `${x}px`);
  e.currentTarget.style.setProperty("--my", `${y}px`);
};

/** Moves the colour circle of a .halftone portrait (--px/--py). */
export const peek = (e: PE) => {
  const { x, y } = local(e);
  e.currentTarget.style.setProperty("--px", `${x}px`);
  e.currentTarget.style.setProperty("--py", `${y}px`);
};

/** Button drifts slightly toward the cursor. */
export const magnet = (e: PE) => {
  if (reduceMotion()) return;
  const { x, y, w, h } = local(e);
  e.currentTarget.style.transform = `translate(${(x - w / 2) * 0.25}px, ${(y - h / 2) * 0.35}px)`;
};

/** Card tilts toward the cursor; also feeds the .card-dev spotlight (--sx/--sy). */
export const tilt = (e: PE) => {
  const { x, y, w, h } = local(e);
  const el = e.currentTarget;
  el.style.setProperty("--sx", `${(x / w) * 100}%`);
  el.style.setProperty("--sy", `${(y / h) * 100}%`);
  if (!reduceMotion()) {
    el.style.transform = `perspective(900px) rotateX(${(0.5 - y / h) * 6}deg) rotateY(${(x / w - 0.5) * 8}deg) translateY(-4px)`;
  }
};

export const resetTransform = (e: PE) => {
  e.currentTarget.style.transform = "";
};

/** Spread onto any card: tilt + spotlight while hovered, reset on leave. */
export const tiltHandlers = { onPointerMove: tilt, onPointerLeave: resetTransform };
