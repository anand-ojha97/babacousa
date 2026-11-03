import { useLayoutEffect, useRef } from "react";
import { headingText } from "../styles.js";
import { galleryPhotos } from "../data/gallery.js";
import "../gallery.css";

export default function Gallery() {
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    const cards = [...grid.querySelectorAll(".gallery-card")];
    const measure = () => {
      const styles = window.getComputedStyle(grid);
      const rowHeight = parseFloat(styles.gridAutoRows) || 4;
      const gap = parseFloat(styles.getPropertyValue("--gallery-gap")) || 24;
      // Measure the inner card, not its spanned grid area. Image dimensions
      // reserve their full height before lazy loading, including landscape photos.
      for (const card of cards) {
        card.parentElement.style.gridRowEnd = `span ${Math.ceil((card.getBoundingClientRect().height + gap) / rowHeight)}`;
      }
    };
    measure();
    const observer = typeof ResizeObserver === "function" ? new ResizeObserver(measure) : null;
    cards.forEach(card => observer?.observe(card));
    window.addEventListener("resize", measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <>
      <section className="bg-[#ffebc8] px-6 pb-12 pt-40 text-center md:pt-48" aria-labelledby="gallery-title">
        <h1 id="gallery-title" className={`${headingText} text-[clamp(44px,5vw,88px)] text-babco-orange`}>Gallery</h1>
        <p className="mx-auto mt-5 max-w-2xl font-paragraph text-lg font-semibold leading-relaxed">A closer look at our brands, our work, and the joy that food brings.</p>
      </section>
      <section ref={gridRef} aria-label="Babco photo gallery" className="gallery-grid">
        {galleryPhotos.map(({ src, alt, width, height, brand }) => (
          <div key={src} className="gallery-item" data-brand={brand}>
            <figure className="gallery-card">
              <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        ))}
      </section>
    </>
  );
}
