import { useLayoutEffect, useRef } from "react";

// The marquee has a single line box, independent of page-heading line heights.
const marqueeText =
  "font-heading font-black uppercase leading-none tracking-normal [font-kerning:normal] [font-synthesis:none]";
// Each half contains three phrases, covering wide screens even at the font cap.
// 72 seconds for three phrases retains the previous 24-second phrase speed.
// The complete Mula R heading face covers every word at one consistent weight.
export default function FooterMarquee() {
  const section = useRef(null);
  const sample = useRef(null);
  const baseline = useRef(null);

  useLayoutEffect(() => {
    const band = section.current;
    const phrase = sample.current;
    const marker = baseline.current;
    const context = document.createElement("canvas").getContext("2d");
    if (!band || !phrase || !marker || !context) return;
    let offset = 0;
    let frame;
    let disposed = false;

    // Center the visible capital letters, accounting for the font's descender
    // space. The zero-height marker gives us the actual first-line baseline.
    function measure() {
      if (disposed) return;
      const style = getComputedStyle(phrase);
      context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const metrics = context.measureText(phrase.textContent.toUpperCase());
      const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize);
      const lines = Math.max(1, Math.round(phrase.getBoundingClientRect().height / lineHeight));
      const firstBaseline = marker.getBoundingClientRect().top;
      const inkTop = firstBaseline - metrics.actualBoundingBoxAscent;
      const inkBottom = firstBaseline + (lines - 1) * lineHeight + metrics.actualBoundingBoxDescent;
      const bounds = band.getBoundingClientRect();
      offset += bounds.top + bounds.height / 2 - (inkTop + inkBottom) / 2;
      band.style.setProperty("--marquee-optical-offset", `${offset}px`);
    }

    function schedule() {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    }

    measure();
    const observer = typeof ResizeObserver === "function" ? new ResizeObserver(schedule) : null;
    observer?.observe(band);
    observer?.observe(phrase);
    window.addEventListener("resize", schedule);
    document.fonts?.ready.then(schedule);
    document.fonts?.addEventListener("loadingdone", schedule);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", schedule);
      document.fonts?.removeEventListener("loadingdone", schedule);
    };
  }, []);

  return (
    <section
      ref={section}
      className="slogan-marquee relative flex min-h-[14.0625cqw] items-center overflow-hidden bg-[#ffebc8] max-[640px]:min-h-[110px]"
      aria-label="Good. Authentic. Pure. Reach. Delicious."
    >
      <p className="sr-only">Good. Authentic. Pure. Reach. Delicious.</p>
      <div
        className="slogan-track flex w-max shrink-0 animate-[tagline-marquee_72s_linear_infinite] motion-reduce:w-full motion-reduce:animate-none"
        aria-hidden="true"
      >
        {[0, 1].map(group => (
          <div key={group} className={`slogan-group flex w-max shrink-0 motion-reduce:w-full ${group === 1 ? "motion-reduce:hidden" : ""}`}>
            {[0, 1, 2].map(copy => (
              <p key={copy} ref={group === 0 && copy === 0 ? sample : undefined} style={{ transform: "translateY(var(--marquee-optical-offset, 0px))" }} className={`${marqueeText} slogan-phrase block w-max shrink-0 text-[clamp(28px,5.625cqw,108px)] whitespace-pre text-babco-red motion-reduce:w-full motion-reduce:whitespace-normal motion-reduce:leading-[1.15] motion-reduce:px-5 motion-reduce:text-center motion-reduce:text-[clamp(20px,5.625cqw,108px)] ${copy > 0 ? "motion-reduce:hidden" : ""}`}>
                {group === 0 && copy === 0 && <span ref={baseline} aria-hidden="true" className="inline-block h-0 w-0 align-baseline" />}
                {"Good. Authentic. Pure. Reach. Delicious. "}
              </p>
            ))}
          </div>
        ))}
      </div>

    </section>
  );
}
