/**
 * Shared bridge to the active smooth-scroll driver.
 *
 * Lenis (see SmoothScroll) does not patch `window.scrollTo` — it owns the
 * scroll position from its own rAF loop. A native smooth scroll would therefore
 * be fought by Lenis and land as a stutter or an instant jump. Registering the
 * live instance here lets any component request a proper animated scroll
 * without importing Lenis or threading a ref through the tree.
 *
 * When Lenis is absent (prefers-reduced-motion), we fall back to the native
 * API, which is the correct instant jump in that case.
 */
export interface SmoothScroller {
  scrollTo: (target: number, options?: Record<string, unknown>) => void;
}

let active: SmoothScroller | null = null;

export function registerSmoothScroller(instance: SmoothScroller | null): void {
  active = instance;
}

export function scrollToTop(): void {
  if (active) {
    active.scrollTo(0, { duration: 1.2 });
    return;
  }
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
}
