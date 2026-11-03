// Explicit targets let each page keep its existing grid and image composition.
export function connectPageReveals(root, viewport = window) {
  if (!root) return;
  const targets = [...root.querySelectorAll("[data-reveal]")].filter((element) =>
    !element.parentElement.closest("[data-reveal], .scroll-reveal, .history-timeline"),
  );
  const preference = viewport.matchMedia("(prefers-reduced-motion: reduce)");
  const seen = new Set();
  let observer;

  function show(element) {
    seen.add(element);
    element.dataset.revealed = "true";
    observer?.unobserve(element);
  }
  function prepare() {
    observer?.disconnect();
    if (preference.matches || !viewport.IntersectionObserver) {
      targets.forEach(show);
      return;
    }
    observer = new viewport.IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) show(target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    targets.forEach((element) => {
      element.dataset.motionReady = "true";
      if (seen.has(element) || element.getBoundingClientRect().top < viewport.innerHeight * 0.9) show(element);
      else {
        element.dataset.revealed = "false";
        observer.observe(element);
      }
    });
  }
  function onFocus(event) {
    const target = event.target.closest("[data-reveal]");
    if (target) show(target);
  }
  prepare();
  root.addEventListener("focusin", onFocus);
  preference.addEventListener("change", prepare);
  return () => {
    observer?.disconnect();
    root.removeEventListener("focusin", onFocus);
    preference.removeEventListener("change", prepare);
    targets.forEach((element) => {
      delete element.dataset.motionReady;
      delete element.dataset.revealed;
    });
  };
}
