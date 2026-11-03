import { useEffect, useRef, useState } from "react";

// Wrap a section in <ScrollReveal> to fade it in once it enters the screen.
export default function ScrollReveal({ children, className = "" }) {
  const wrapper = useRef(null);
  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    const section = wrapper.current;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!section || reducedMotion) return;

    // Content already near the top is visible immediately.
    if (section.getBoundingClientRect().top < window.innerHeight * 0.72) {
      setPhase("revealed");
      return;
    }
    setPhase("waiting");

    // IntersectionObserver tells us when the section enters the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPhase("revealed");
          observer.disconnect(); // Reveal only once per page visit.
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -45px 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapper}
      className={`scroll-reveal transition-[opacity,transform] duration-[900ms] ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 ${phase === "waiting" ? "translate-y-9 opacity-0 focus-within:translate-y-0 focus-within:opacity-100 max-[640px]:translate-y-6" : "translate-y-0 opacity-100"} ${className}`}
      data-phase={phase}
    >
      {children}
    </div>
  );
}
