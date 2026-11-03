import { Link } from "react-router";
import PageHero from "../components/PageHero.jsx";
import { inhouseBrands, inhouseProductBanners, partnerBrands } from "../data/brandDirectory.js";

const display =
  "font-heading font-black uppercase tracking-normal [font-kerning:normal] [font-synthesis:none] max-[1001px]:leading-[1.2]";
const copy =
  "font-paragraph font-semibold tracking-normal [font-kerning:normal] [font-synthesis:none] [font-variant-ligatures:none] text-[max(16px,1.302083cqw)] leading-[1.36] max-[1001px]:text-base max-[1001px]:leading-[1.55]";
const imagePath = "/images/our-brands/";
// Shared side margins keep the inhouse and partner sections aligned.
const contentWidth =
  "mx-auto w-[91.137cqw] max-[1001px]:w-[calc(100%_-_48px)] max-[640px]:w-[calc(100%_-_32px)]";

function ProductBanner({ name, slug, image, alt, index, width, height, position, featured }) {
  return (
    <Link
      data-reveal
      data-product-banner={slug}
      to={`/?brand=${index}#brands`}
      aria-label={`Explore ${name} products`}
      className={`relative block min-w-0 overflow-hidden rounded-[3.125cqw] bg-[#f6f5f3] max-[1001px]:rounded-[24px] ${featured ? "col-span-2 w-full aspect-[2740/595] transition-shadow hover:shadow-lg focus-visible:shadow-lg max-[640px]:col-span-1" : "brand-photo-hover aspect-[755/333] max-[640px]:aspect-[16/9]"}`}
    >
      <img
        src={`${imagePath}${image}.webp`}
        alt={alt}
        loading="lazy"
        width={width}
        height={height}
        // Keep the original packaging pixels, crop only empty background,
        // and blend the photo edges into its own matching backdrop.
        className={featured ? "absolute left-[14.963504%] -top-[67.226891%] w-[70.072993%] max-w-none [mask-image:linear-gradient(to_right,transparent,#000_4%,#000_98%,transparent)]" : "h-full w-full object-cover"}
        style={{ objectPosition: position }}
      />
      {featured && <>
        {/* Extend only the empty edges of the original photo into the side gutters. */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-[17.8%]" style={{
          backgroundImage: `url("${imagePath}${image}.webp")`,
          backgroundSize: "2400% 181.512605%",
          backgroundPosition: "left 82.474227%",
          backgroundRepeat: "no-repeat",
        }} />
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-[16.4%]" style={{
          backgroundImage: `url("${imagePath}${image}.webp")`,
          backgroundSize: "6000% 181.512605%",
          backgroundPosition: "right 82.474227%",
          backgroundRepeat: "no-repeat",
        }} />
      </>}
    </Link>
  );
}

export default function OurBrands() {
  return (
    <>
      <PageHero
        id="our-brands"
        title="Our Brands"
        className="page-hero relative aspect-[1920/953] overflow-hidden bg-[#f6d752] max-[1001px]:min-h-[420px] max-[640px]:aspect-[4/5] max-[640px]:min-h-[440px]"
        image={{
          src: `${imagePath}hero-products.webp`,
          alt: "Anand and Ullasam snack and frozen food packs with bowls of South Indian favourites",
          width: "1536",
          height: "1024",
          className: "absolute -left-[0.78125%] -top-[24.13536%] h-[135.387%] w-[100.8%] max-w-none object-cover max-[1001px]:inset-0 max-[1001px]:size-full max-[640px]:object-[52%_center]",
        }}
        overlayClassName="absolute inset-0 bg-linear-to-b from-black/5 via-black/10 to-black/45"
        titleClassName={`${display} absolute inset-x-0 top-[79.7954%] text-center text-[5.78125cqw] leading-none text-white [text-shadow:0_3px_5px_rgb(0_0_0/0.4)] max-[1001px]:top-auto max-[1001px]:bottom-12 max-[1001px]:text-[clamp(36px,5.4vw,65px)] max-[640px]:bottom-14`}
      />

      <section
        id="inhouse-brands"
        aria-labelledby="inhouse-brands-title"
        className="relative bg-white pb-[3.540104cqw] pt-[2.90625cqw] max-[1001px]:py-10 max-[640px]:py-9"
      >
        <h2 data-reveal
          id="inhouse-brands-title"
          className={`${display} text-center text-[4.6875cqw] leading-none text-[#ff5a1d] max-[1001px]:px-5 max-[1001px]:text-[clamp(30px,4.6vw,46px)]`}
        >
          Inhouse Brands
        </h2>
        <nav
          aria-label="Explore our inhouse brands"
          className={`${contentWidth} relative mt-[3.403646cqw] grid grid-cols-4 gap-[3.55469cqw] max-[1001px]:mt-8 max-[1001px]:gap-5 max-[640px]:grid-cols-2 max-[640px]:gap-4`}
        >
          {inhouseBrands.map(({ name, slug, index }) => (
            <Link
              key={slug}
              data-reveal
              style={{ "--reveal-delay": `${index * 70}ms` }}
              to={`/?brand=${index}#brands`}
              aria-label={`Explore ${name} products`}
              className="brand-card-hover flex aspect-[294/142.45] items-center justify-center overflow-hidden rounded-[1.04167cqw] bg-[#f6f5f3] max-[1001px]:rounded-[16px]"
            >
              <img src={`${imagePath}logo-${slug}.webp`} alt={name} width="490" height="230" loading="lazy" className="max-h-[83%] w-[80%] object-contain" />
            </Link>
          ))}
        </nav>
        <div aria-label="Inhouse brand product banners" className={`${contentWidth} mt-[2.493229cqw] grid grid-cols-2 gap-x-[1.453125cqw] gap-y-[1.871875cqw] max-[1001px]:mt-6 max-[1001px]:gap-5 max-[640px]:grid-cols-1 max-[640px]:gap-4`}>
          {inhouseProductBanners.map(banner => <ProductBanner key={banner.slug} {...banner} />)}
        </div>
      </section>

      <section id="partner-brands" aria-labelledby="partner-brands-title" className="pb-[2.29427cqw] pt-[0.9354cqw] max-[1001px]:pb-10 max-[1001px]:pt-4">
        <h2 data-reveal id="partner-brands-title" className={`${display} text-center text-[4.6875cqw] leading-none text-babco-blue max-[1001px]:px-5 max-[1001px]:text-[clamp(30px,4.6vw,46px)]`}>
          Partner Brands
        </h2>
        <p data-reveal className={`${copy} ${contentWidth} mt-[1.7135cqw] text-center text-black max-[1001px]:mt-5`}>
          Our partner brands complement Babco’s portfolio by bringing trusted products, established expertise, and category strength to the markets we serve.
          <br className="max-[1001px]:hidden" /> Through long-term partnerships, we ensure consistent quality, reliable supply, and a diverse offering that meets evolving customer and consumer needs.
        </p>
        <div className={`${contentWidth} mt-[2.3495cqw] grid grid-cols-5 gap-x-[1.6927cqw] gap-y-[2.5271cqw] max-[1001px]:mt-8 max-[1001px]:grid-cols-3 max-[1001px]:gap-5 max-[640px]:grid-cols-2 max-[640px]:gap-4`}>
          {partnerBrands.map(({ name, label, slug, category, categoryLines, origin }, index) => (
            <article data-reveal style={{ "--reveal-delay": `${(index % 5) * 65}ms` }} key={slug} id={`brand-${slug}`} className="brand-card-hover overflow-hidden rounded-[2.0833cqw] bg-[#f6f5f3] max-[1001px]:rounded-[22px]">
              <div className="overflow-hidden">
                <img src={`${imagePath}partner-${slug}.webp`} alt="" width="648" height="441" loading="lazy" className="block aspect-[323.97/220.11] w-full object-cover" />
              </div>
              <div className="flex min-h-[max(68px,3.82135cqw)] flex-col items-center justify-center rounded-[2.0833cqw] bg-[#f0f0f0] px-2 py-[0.55cqw] text-center font-copy font-medium tracking-normal text-black [font-kerning:normal] [font-synthesis:none] [font-variant-ligatures:none] max-[1001px]:rounded-[18px] max-[1001px]:py-3">
                <h3 data-reveal className="partner-brand-name font-bold text-[clamp(11px,0.888cqw,17.05px)] uppercase leading-[1.05] max-[1001px]:mb-1 max-[1001px]:leading-[1.3]">{label || name}</h3>
                {(categoryLines || [category]).map((line) => <p data-reveal key={line} className="text-[clamp(11px,0.879167cqw,16.88px)] leading-[1.05] max-[1001px]:leading-[1.3]">{line}</p>)}
                {origin && <p data-reveal className="text-[clamp(11px,0.879167cqw,16.88px)] leading-[1.05] max-[1001px]:leading-[1.3]">{origin}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
