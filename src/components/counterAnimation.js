// Keep the exact value in the layout from first render. An entrance effect
// avoids final → zero flashes, wider intermediate values and fallback digits.
export function connectCounter(element, value, viewport = window) {
  const current = element?.querySelector("[data-count-current]");
  if (!current) return;
  current.textContent = String(value);
  if (element.classList.contains("count-up-inline")) return;
  const preference = viewport.matchMedia("(prefers-reduced-motion: reduce)");
  if (preference.matches || !viewport.IntersectionObserver) return;
  let observer;
  let milestoneObserver;
  let animation;
  let started = false;
  let disposed = false;
  let visible = false;
  const milestone = element.closest("[data-milestone]");

  function stop() {
    animation?.cancel();
    observer?.disconnect();
    milestoneObserver?.disconnect();
  }
  function start() {
    if (disposed || started || !visible || milestone?.dataset.reached === "false") return;
    started = true;
    observer?.disconnect();
    milestoneObserver?.disconnect();
    if (!preference.matches) {
      animation = current.animate?.([
        { opacity: .65, transform: "translateY(5px)" },
        { opacity: 1, transform: "translateY(0)" },
      ], { duration: 450, easing: "ease-out" });
    }
  }
  observer = new viewport.IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    start();
  }, { threshold: .2 });
  observer.observe(element);
  if (milestone && viewport.MutationObserver) {
    milestoneObserver = new viewport.MutationObserver(start);
    milestoneObserver.observe(milestone, { attributes: true, attributeFilter: ["data-reached"] });
  }
  const onPreferenceChange = () => { if (preference.matches) stop(); };
  const onVisibility = () => { if (viewport.document?.hidden) animation?.cancel(); };
  preference.addEventListener("change", onPreferenceChange);
  viewport.document?.addEventListener("visibilitychange", onVisibility);
  return () => {
    disposed = true;
    stop();
    preference.removeEventListener("change", onPreferenceChange);
    viewport.document?.removeEventListener("visibilitychange", onVisibility);
  };
}
