import { useEffect } from 'react';

/**
 * Wheel-smoothing scroll.
 *
 * Windows mouse wheels fire large, discrete deltas — the "steppy" feel.
 * We intercept those and lerp the scroll position toward a target each
 * frame, which reads as buttery momentum. We deliberately DON'T touch:
 *   - trackpads / precision wheels (small fractional deltas)
 *   - touch devices (coarse pointers get native momentum)
 *   - keyboard, scrollbar drag, or programmatic scrollIntoView
 *   - users who prefer reduced motion
 *
 * Native layout is preserved (position: fixed/sticky keep working) because
 * we drive window.scrollTo rather than transforming a wrapper.
 */
export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReduced || coarsePointer) return;

    const root = document.documentElement;
    root.classList.add('has-smooth-scroll');

    let target = window.scrollY;
    let current = window.scrollY;
    let rafId: number | null = null;
    let animating = false;

    const EASE = 0.13; // higher = snappier, lower = floatier
    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const frame = () => {
      const diff = target - current;
      if (Math.abs(diff) < 0.4) {
        current = target;
        window.scrollTo(0, Math.round(current));
        animating = false;
        rafId = null;
        return;
      }
      current += diff * EASE;
      window.scrollTo(0, current);
      rafId = window.requestAnimationFrame(frame);
    };

    const start = () => {
      if (!animating) {
        animating = true;
        current = window.scrollY;
        rafId = window.requestAnimationFrame(frame);
      }
    };

    const onWheel = (e: WheelEvent) => {
      // Skip pinch-zoom and modifier gestures.
      if (e.ctrlKey || e.metaKey) return;

      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 16; // delta in lines, not pixels
      else if (e.deltaMode === 2) delta *= window.innerHeight; // pages

      // Trackpads / precision wheels emit small deltas — leave them native.
      if (Math.abs(delta) < 30) return;

      e.preventDefault();
      target = Math.min(Math.max(target + delta, 0), maxScroll());
      start();
    };

    // Keep target in sync when scroll comes from anywhere else
    // (keyboard, scrollbar, anchor jumps), so the next wheel tick
    // doesn't snap back to a stale position.
    const onScroll = () => {
      if (!animating) {
        target = window.scrollY;
        current = window.scrollY;
      }
    };

    const onResize = () => {
      target = Math.min(target, maxScroll());
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      root.classList.remove('has-smooth-scroll');
    };
  }, [enabled]);
}
