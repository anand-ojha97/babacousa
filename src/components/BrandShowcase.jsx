import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { brandCatalog } from "../data/brands.js";
import CategorySlide from "./CategorySlide.jsx";
import { getProductIndex, getCarouselSlides } from "../data/carousel.js";
import SectionHeading from "./SectionHeading.jsx";
import { carouselArrow } from "../styles.js";

const SLIDE_DURATION = 1300; // Also supplies the CSS transition duration below.

export default function BrandShowcase({ brand, onBrandChange }) {
  // Each brand remembers its position in the circular carousel.
  const [categoryIndices, setCategoryIndices] = useState(() => brandCatalog.map(() => 0));
  const [transitioning, setTransitioning] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const transitionTimer = useRef(null);
  const touchStart = useRef(null);

  const catalog = brandCatalog[brand];
  const count = catalog?.categories.length ?? 0;
  const step = categoryIndices[brand] ?? 0;
  const selected = getProductIndex(step, count);
  const slides = count ? getCarouselSlides(step, catalog.categories).filter(slide => count > 1 || slide.offset === 0) : [];

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    function updatePreference() {
      setReducedMotion(preference.matches);
    }
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => {
      preference.removeEventListener("change", updatePreference);
      clearTimeout(transitionTimer.current);
    };
  }, []);

  useEffect(() => {
    clearTimeout(transitionTimer.current);
    setTransitioning(false);
  }, [brand]);

  function moveCarousel(distance) {
    if (!distance || transitioning || count < 2) return;
    setCategoryIndices((current) =>
      current.map((value, brandIndex) =>
        brandIndex === brand ? value + distance : value,
      ),
    );

    // Every tile moves together. Only the centre tile plays its video.
    if (!reducedMotion) {
      setTransitioning(true);
      transitionTimer.current = setTimeout(() => {
        setTransitioning(false);
      }, SLIDE_DURATION);
    }
  }

  function selectBrand(index, focusTab = false) {
    clearTimeout(transitionTimer.current);
    setTransitioning(false);
    onBrandChange(index);
    if (focusTab) document.getElementById(`brand-tab-${index}`)?.focus();
  }

  function handleTabKeys(event, index) {
    const lastBrand = brandCatalog.length - 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const step = event.key === "ArrowRight" ? 1 : -1;
      selectBrand(
        (index + step + brandCatalog.length) % brandCatalog.length,
        true,
      );
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      selectBrand(event.key === "Home" ? 0 : lastBrand, true);
    }
  }

  function handleSliderKeys(event) {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveCarousel(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      moveCarousel(1);
    }
  }

  function handleTouchStart(event) {
    touchStart.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }

  function handleTouchEnd(event) {
    if (!touchStart.current) return;
    const distanceX = event.changedTouches[0].clientX - touchStart.current.x;
    const distanceY = event.changedTouches[0].clientY - touchStart.current.y;
    // Ignore short movements and vertical scrolling.
    if (Math.abs(distanceX) > 50 && Math.abs(distanceX) > Math.abs(distanceY)) {
      const swipingLeft = distanceX < 0;
      moveCarousel(swipingLeft ? 1 : -1);
    }
    touchStart.current = null;
  }

  if (!catalog) return null;

  return (
    <section
      id="brands"
      style={{ "--brand-slide-duration": `${SLIDE_DURATION}ms` }}
      className="relative pb-[1.9cqw] pt-[4.25cqw] text-center min-[1001px]:min-h-[50.99323cqw] max-[640px]:pb-[34px] max-[640px]:pt-9"
      aria-labelledby="brands-title"
    >
      <SectionHeading
        id="brands-title"
        className="reveal-detail mx-auto relative -left-[1.1%] text-[5.46875cqw] max-[640px]:left-0 text-[#82c341] max-[640px]:text-[9.5cqw]"
      >
        Our brands
      </SectionHeading>

      {/* Tabs and categories both come from src/data/brands.js. */}
      <div
        className="relative z-20 mx-auto mt-[2.668cqw] flex w-fit max-w-[calc(100%_-_32px)] flex-wrap items-center justify-center rounded-full bg-[#e4e4e4] p-[0.42cqw] max-[1001px]:p-1 max-[640px]:mt-5"
        role="tablist"
        aria-label="Select a brand"
      >
        {brandCatalog.map((item, index) => (
          <button
            key={item.name}
            id={`brand-tab-${index}`}
            role="tab"
            aria-selected={brand === index}
            aria-controls={`brand-panel-${index}`}
            tabIndex={brand === index ? 0 : -1}
            className={`font-paragraph font-medium tracking-normal [font-synthesis:none] rounded-full min-w-[6cqw] px-[0.9cqw] py-[0.66cqw] text-[1.04167cqw] leading-[1.3] transition-colors max-[1001px]:px-4 max-[1001px]:py-2 max-[1001px]:text-sm max-[640px]:px-3.5 max-[640px]:py-[9px] max-[640px]:text-[13px] max-[360px]:px-[11px] ${brand === index ? "bg-babco-orange text-[#442312]" : "text-[#333] hover:bg-white/70"}`}
            onClick={() => selectBrand(index)}
            onKeyDown={(event) => handleTabKeys(event, index)}
          >
            {item.name}
          </button>
        ))}
      </div>

      {brandCatalog.map((item, index) => (
        <div
          key={item.name}
          id={`brand-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`brand-tab-${index}`}
          hidden={brand !== index}
        >
          {brand === index && count > 0 && (
            <>
              <div
                className="brand-category-carousel reveal-detail relative isolate mt-0 h-[31.15cqw] min-h-[430px] touch-pan-y overflow-hidden focus-visible:rounded-xl focus-visible:outline-babco-orange focus-visible:-outline-offset-5 max-[1001px]:min-h-[410px] max-[640px]:mt-[18px] max-[640px]:h-[415px] max-[640px]:min-h-0"
                aria-roledescription="carousel"
                aria-label={`${item.name} categories`}
                tabIndex={0}
                onKeyDown={handleSliderKeys}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <button
                  className={`${carouselArrow} left-[3.4%] max-[640px]:left-[2%]`}
                  aria-label={`Previous ${item.name} category`}
                  disabled={transitioning || count < 2}
                  onClick={() => moveCarousel(-1)}
                >
                  <ChevronLeft />
                </button>

                {/* Stable keys let CSS move the same tiles along the curve. */}
                {slides.map((slide) => (
                  <CategorySlide
                    key={slide.key}
                    category={slide.category}
                    brandName={item.name}
                    active={slide.offset === 0}
                    index={slide.index}
                    total={count}
                    position={slide.position}
                    onSelect={() => moveCarousel(slide.offset)}
                  />
                ))}

                <button
                  className={`${carouselArrow} right-[3.4%] max-[640px]:right-[2%]`}
                  aria-label={`Next ${item.name} category`}
                  disabled={transitioning || count < 2}
                  onClick={() => moveCarousel(1)}
                >
                  <ChevronRight />
                </button>
              </div>
              <p className="sr-only" aria-live="polite" aria-atomic="true">
                {item.name}: {catalog.categories[selected].label}, category{" "}
                {selected + 1} of {count}
              </p>
            </>
          )}
          {brand === index && count === 0 && <p className="my-12 font-paragraph">Categories coming soon.</p>}
        </div>
      ))}

      <Link
        to="/our-brands/"
        className="action-hover inline-block mt-6 rounded-full min-[1001px]:mt-[0.6cqw] bg-babco-orange px-[1.45cqw] py-[0.65cqw] font-sans text-[1.145833cqw] font-bold leading-[1.2] text-[#362215] hover:bg-[#f16a2b] max-[1001px]:px-[17px] max-[1001px]:py-[9px] max-[1001px]:text-xs"
      >
        Explore our Brands
      </Link>
    </section>
  );
}
