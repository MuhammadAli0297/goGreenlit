import "@testing-library/jest-dom/vitest";

// jsdom has no IntersectionObserver. Reveal (and anything built on it)
// creates one on mount, so provide an inert stub: nothing ever intersects,
// which is fine because tests assert on markup, not on scroll behavior.
class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: readonly number[] = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

if (typeof globalThis.IntersectionObserver === "undefined") {
  globalThis.IntersectionObserver = IntersectionObserverStub;
}

// jsdom has no matchMedia either. Report "no match" for everything except
// reduced motion, which reports a match, so scroll-linked effects like
// PageHeroScrollZoom skip attaching listeners in tests.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}
