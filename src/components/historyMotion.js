// Scroll position drives the coloured line and milestone reveals together.
// Measuring marker centres also keeps the line aligned after mobile reflow.
export function connectHistoryTimeline(section, viewport = window) {
  if (!section) return;
  const list = section.querySelector("ol");
  const rows = [...section.querySelectorAll("[data-milestone]")];
  const markers = rows.map((row) => row.querySelector(".history-marker"));
  if (!list || markers.length < 2) return;

  const motion = viewport.matchMedia("(prefers-reduced-motion: reduce)");
  let frame = null;
  let measureNeeded = true;
  let centres = [];
  let disposed = false;

  function update() {
    frame = null;
    if (disposed) return;
    const listTop = list.getBoundingClientRect().top;
    if (measureNeeded) {
      centres = markers.map((marker) => {
        const rect = marker.getBoundingClientRect();
        return rect.top + rect.height / 2 - listTop;
      });
      list.style.setProperty("--history-start", `${centres[0]}px`);
      list.style.setProperty(
        "--history-length",
        `${centres.at(-1) - centres[0]}px`,
      );
      measureNeeded = false;
    }

    if (motion.matches) {
      delete section.dataset.animated;
      list.style.setProperty("--history-hidden", "0%");
      return;
    }

    // Reveal where the visitor is reading, just below the viewport centre.
    const readingPosition = viewport.innerHeight * 0.74 - listTop;
    const length = centres.at(-1) - centres[0];
    const progress = Math.min(
      1,
      Math.max(0, (readingPosition - centres[0]) / (length || 1)),
    );
    const active = centres.findLastIndex((centre) => centre <= readingPosition);
    list.style.setProperty("--history-hidden", `${(1 - progress) * 100}%`);
    rows.forEach((row, index) => {
      row.dataset.reached = String(index <= active);
      row.dataset.current = String(index === active);
    });
    section.dataset.animated = "true";
  }

  function schedule() {
    if (frame === null && !disposed) {
      frame = viewport.requestAnimationFrame(update);
    }
  }
  function remeasure() {
    measureNeeded = true;
    schedule();
  }

  // Passive scrolling and one frame per update keep the page responsive.
  viewport.addEventListener("scroll", schedule, { passive: true });
  viewport.addEventListener("resize", remeasure);
  viewport.addEventListener("pageshow", remeasure);
  motion.addEventListener("change", remeasure);
  const observer = viewport.ResizeObserver
    ? new viewport.ResizeObserver(remeasure)
    : null;
  observer?.observe(list);
  viewport.document.fonts?.ready.then(() => {
    if (!disposed) remeasure();
  });
  update();

  return () => {
    disposed = true;
    if (frame !== null) viewport.cancelAnimationFrame(frame);
    viewport.removeEventListener("scroll", schedule);
    viewport.removeEventListener("resize", remeasure);
    viewport.removeEventListener("pageshow", remeasure);
    motion.removeEventListener("change", remeasure);
    observer?.disconnect();
    delete section.dataset.animated;
    list.style.removeProperty("--history-hidden");
  };
}
