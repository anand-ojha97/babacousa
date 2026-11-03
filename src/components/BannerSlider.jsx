import { useEffect, useRef, useState } from "react";

export default function BannerSlider({ id, title, label, slides, className = "" }) {
  const section = useRef(null);
  const touchStart = useRef(null);
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    function motion() {
      setReducedMotion(preference.matches);
      if (preference.matches) setPlaying(false);
    }
    const visibility = () => setVisible(document.visibilityState === "visible");
    const observer = new IntersectionObserver(
      entries => setInView(entries[0].isIntersecting), { threshold: 0.2 },
    );
    motion();
    visibility();
    observer.observe(section.current);
    preference.addEventListener("change", motion);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", motion);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  useEffect(() => {
    if (!playing || hovered || !inView || !visible || reducedMotion) return;
    const timer = window.setTimeout(() => setSelected(current => (current + 1) % slides.length), 5000);
    return () => window.clearTimeout(timer);
  }, [selected, playing, hovered, inView, visible, reducedMotion, slides.length]);

  function choose(index) {
    setPlaying(false);
    setSelected((index + slides.length) % slides.length);
  }
  function handleKeys(event) {
    const targets = { ArrowRight: selected + 1, ArrowLeft: selected - 1, Home: 0, End: slides.length - 1 };
    if (event.key in targets) { event.preventDefault(); choose(targets[event.key]); }
  }
  function handleTouchStart(event) {
    if (event.touches.length !== 1 || event.target.closest("button")) { touchStart.current = null; return; }
    touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }
  function handleTouchEnd(event) {
    if (!touchStart.current || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - touchStart.current.x;
    const dy = event.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) choose(selected + (dx < 0 ? 1 : -1));
  }

  return (
    <section id={id} ref={section} className={`home-banner ${className}`} aria-label={label} aria-roledescription="carousel"
      onKeyDown={handleKeys} onFocusCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget) && !event.target.closest(".home-banner-play")) setPlaying(false);
      }}
      onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchCancel={() => { touchStart.current = null; }}>
      <h1 className="sr-only">{title}</h1>
      <div className="home-banner-media">
        {slides.map((slide, index) => (
          <div key={slide.id} className="home-banner-slide" role="group" aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}: ${slide.label}`} aria-hidden={selected !== index} data-active={selected === index}>
            <img src={slide.src} alt={slide.alt} width={slide.width || 1024} height={slide.height || 576}
              fetchPriority={index === 0 ? "high" : "low"} decoding="async" draggable="false" />
          </div>
        ))}
      </div>
      <div className="home-banner-controls">
        <div className="home-banner-selectors">
          {slides.map((slide, index) => (
            <button key={slide.id} type="button" className="home-banner-dot" onClick={() => choose(index)} aria-label={`Show ${slide.label} banner`} aria-pressed={selected === index}>
              <span aria-hidden="true" />
            </button>
          ))}

        </div>
      </div>
      <p className="sr-only" role="status" aria-live={playing ? "off" : "polite"} aria-atomic="true">{slides[selected].label}, slide {selected + 1} of {slides.length}</p>
    </section>
  );
}
