import { useEffect, useRef, useState } from "react";
import scenes from "../data/richScenes.json";
import { richSceneImages } from "../data/richImages.js";
import { headingText } from "../styles.js";
// The old subset face used enlarged glyphs; compensate when using Mula R.
const headingFontScale = 90 / 66.78;

// Layout positions live in richScenes.json; each headline has its own images.
export default function RichScenes() {
  const section = useRef(null);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  // Observe visibility and the visitor's motion preference.
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const motion = () => setReducedMotion(preference.matches);
    const visibility = () => setVisible(document.visibilityState === "visible");
    motion();
    visibility();
    preference.addEventListener("change", motion);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(
      (entries) => setInView(entries[0].isIntersecting),
      { threshold: 0.2 },
    );
    if (section.current) observer.observe(section.current);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", motion);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    if (!inView || !visible || reducedMotion) return;
    // Move to the next headline every four seconds.
    const timer = window.setTimeout(
      () => setSceneIndex((current) => (current + 1) % scenes.length),
      4000,
    );
    return () => window.clearTimeout(timer);
  }, [sceneIndex, inView, visible, reducedMotion]);
  return (
    <section
      id="about"
      ref={section}
      className="relative aspect-[1920/953] overflow-hidden bg-[linear-gradient(90deg,#ff7474_0%,#e92d2e_50%,#ab020a_100%)] text-white max-[640px]:aspect-[1/1.06] [&_button:focus-visible]:outline-white"
      aria-label="Rich, authentic, fresh, delicious, and homestyle"
      aria-roledescription="carousel"
    >
      {scenes.map((item, index) => (
        <div
          key={item.title}
          className={`absolute inset-0 pointer-events-none transition-opacity duration-[600ms] ${sceneIndex === index ? "opacity-100" : "opacity-0"}`}
          aria-hidden={sceneIndex !== index}
          data-rich-scene
          data-active={sceneIndex === index}
          aria-label={`${index + 1} of ${scenes.length}: ${item.title}`}
        >
          {richSceneImages[item.title].map((portrait, i) => (
            <img
              key={portrait.src}
              className={`scene-photo absolute rounded-[2cqw] object-cover transition-transform duration-[800ms] ease-out left-[var(--portrait-left)] top-[var(--portrait-top)] w-[var(--portrait-width)] h-[var(--portrait-height)] max-[640px]:rounded-[15px] max-[640px]:left-[var(--portrait-mobile-left)] max-[640px]:top-[var(--portrait-mobile-top)] max-[640px]:w-[var(--portrait-mobile-width)] max-[640px]:h-[var(--portrait-mobile-height)] ${sceneIndex === index ? "translate-y-0" : "translate-y-[6px]"}`}
              style={{
                objectPosition: portrait.objectPosition,
                "--portrait-left": `${item.desktop[i].left}%`,
                "--portrait-top": `${item.desktop[i].top}%`,
                "--portrait-width": `${item.desktop[i].width}%`,
                "--portrait-height": `${item.desktop[i].height}%`,
                "--portrait-mobile-left": `${item.mobile[i].left}%`,
                "--portrait-mobile-top": `${item.mobile[i].top}%`,
                "--portrait-mobile-width": `${item.mobile[i].width}%`,
                "--portrait-mobile-height": `${item.mobile[i].height}%`,
              }}
              src={portrait.src}
              alt={portrait.alt}
              width={portrait.width}
              height={portrait.height}
              loading="lazy"
              decoding="async"
            />
          ))}
          <h2
            className={`${headingText} absolute left-1/2 top-[38%] flex h-[24%] -translate-x-1/2 transition-opacity duration-150 ${sceneIndex === index ? "opacity-100 delay-150" : "opacity-0 delay-0"} items-center justify-center whitespace-nowrap w-[var(--heading-width)] text-[length:var(--heading-font)] max-[640px]:w-[var(--mobile-heading-width)] max-[640px]:text-[length:var(--mobile-heading-font)]`}
            style={{
              "--heading-width": `${item.headingWidth}%`,
              "--mobile-heading-width": `${item.mobileHeadingWidth}%`,
              "--heading-font": `${item.headingWidth * headingFontScale / item.headingEmWidth}cqw`,
              "--mobile-heading-font": `${item.mobileHeadingWidth * headingFontScale / item.headingEmWidth}cqw`,
            }}
          >
            {item.title}
          </h2>
        </div>
      ))}
      <div className="absolute bottom-[3%] left-1/2 z-10 flex -translate-x-1/2 items-center max-[640px]:bottom-[1%]">
        {scenes.map((item, index) => (
          <button
            key={item.title}
            className="grid size-9 place-items-center max-[640px]:size-6"
            aria-label={`Show ${item.title} scene`}
            aria-pressed={sceneIndex === index}
            onClick={() => {
              setSceneIndex(index);
            }}
          >
            <span
              className={`block h-[7px] rounded-full transition-[width,background] duration-200 ${sceneIndex === index ? "w-[22px] bg-white max-[640px]:w-4" : "w-[7px] bg-white/50"}`}
            />
          </button>
        ))}
      </div>

    </section>
  );
}
