import PageHero from "../components/PageHero.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";

const display = "font-heading font-black uppercase tracking-normal [font-kerning:normal] [font-synthesis:none] max-[1001px]:leading-[1.2]";
const smallDisplay = "font-heading font-bold uppercase tracking-normal [font-kerning:normal] [font-synthesis:none]";
const paragraph = "font-paragraph font-semibold tracking-normal [font-kerning:normal] [font-synthesis:none] [font-variant-ligatures:none]";
const copy = `${paragraph} text-[max(16px,1.302083cqw)] leading-[1.2] max-[1001px]:text-base max-[1001px]:leading-[1.55]`;
const images = "/images/innovation/";

const sourcingPrinciples = [
  { title: ["Village", "to-village"], lines: ["Sourcing directly from", "taluk to taluk & village to village"] },
  { title: ["Authentic", "producers"], lines: ["Identifying authentic", "regional producers"] },
  { title: ["Quality from", "the source"], lines: ["Ensuring quality from", "the source"] },
  { title: ["Direct market", "access"], lines: ["Creating direct market access", "for small manufacturers"] },
];

export default function Innovation() {
  return (
    <>
      <PageHero
        id="innovation"
        title="Innovation"
        className="page-hero relative aspect-[1920/953] overflow-hidden bg-[#6a7470] max-[1001px]:min-h-[420px] max-[640px]:aspect-[4/5] max-[640px]:min-h-[440px]"
        image={{
          src: `${images}innovation-hero.webp`,
          alt: "A food production specialist inspecting fresh peppers on an automated processing line",
          width: "1774",
          height: "887",
          className: "absolute -left-[6.614583%] -top-[7.214061%] w-[113.59375%] max-w-none max-[1001px]:inset-0 max-[1001px]:size-full max-[1001px]:object-cover max-[640px]:object-[65%_center]",
        }}
        overlayClassName="absolute inset-0 bg-linear-to-b from-black/5 via-black/15 to-black/45"
        titleClassName={`${display} absolute inset-x-0 top-[79.7954%] text-center text-[5.78125cqw] leading-none text-white [text-shadow:0_3px_5px_rgb(0_0_0/0.4)] max-[1001px]:top-auto max-[1001px]:bottom-12 max-[1001px]:text-[clamp(36px,5.4vw,65px)] max-[640px]:bottom-14`}
      />

      <section id="product-sourcing" aria-labelledby="product-sourcing-title" className="relative bg-white min-[1001px]:min-h-[54.75cqw] max-[1001px]:pb-12">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-[#f7f5f3]" aria-hidden="true" />
        <ScrollReveal className="business-reveal relative text-center min-[1001px]:pt-[3.731771cqw] max-[1001px]:px-6 max-[1001px]:pt-12">
          <h2 id="product-sourcing-title" className={`${display} business-step text-[4.6875cqw] leading-none text-babco-blue max-[1001px]:text-[clamp(30px,4.6vw,46px)] max-[640px]:text-[clamp(28px,7vw,38px)]`}>Product Sourcing</h2>
          <p className={`${copy} business-step mx-auto mt-[1.255208cqw] max-w-[83.333333cqw] text-black max-[1001px]:mt-5 max-[1001px]:max-w-[800px]`} style={{ "--step-delay": "90ms" }}>
            Our approach is rooted in direct engagement, working taluk to taluk and village to village to identify authentic regional producers.
            <br className="max-[1001px]:hidden" /> By sourcing directly from the origin, we ensure consistent quality, preserve traditional practices, and maintain full
            <br className="max-[1001px]:hidden" /> control over standards from the source itself.
          </p>
        </ScrollReveal>
        <ScrollReveal className="business-reveal relative overflow-hidden rounded-[2.083333cqw] min-[1001px]:absolute min-[1001px]:left-[6.592188cqw] min-[1001px]:top-[15.229167cqw] min-[1001px]:w-[86.358854cqw] max-[1001px]:mx-6 max-[1001px]:mt-8 max-[1001px]:rounded-[26px] max-[640px]:mx-4">
          <figure className="brand-photo-hover relative aspect-[1659/461] overflow-hidden">
            <img src={`${images}product-sourcing-rice-fields.png`} alt="Farmers tending South Indian rice fields at dawn, with a village and a cyclist in the background" width="1659" height="461" loading="lazy" decoding="async" className="block h-auto w-full" />
          </figure>
          <ol className="business-gradient grid min-h-[10.729167cqw] grid-cols-4 px-[1.041667cqw] pb-[1.5625cqw] pt-[1.666667cqw] text-center text-white max-[1001px]:grid-cols-2 max-[1001px]:gap-x-5 max-[1001px]:gap-y-8 max-[1001px]:px-5 max-[1001px]:py-7 max-[640px]:gap-x-4 max-[640px]:gap-y-7 max-[640px]:px-4">
            {sourcingPrinciples.map(({ title, lines }, index) => (
              <li key={title[0]} className="business-step" style={{ "--step-delay": `${index * 120}ms` }}>
                <h3 className={`${smallDisplay} flex flex-col text-[1.822917cqw] leading-none max-[1001px]:text-[22px] max-[640px]:text-[clamp(16px,4.4vw,22px)] max-[360px]:text-[13.5px]`}>{title.map(line => <span key={line}>{line}</span>)}</h3>
                <p className={`${copy} mt-[0.625cqw] max-[1001px]:mt-3 max-[640px]:text-[13px] max-[640px]:leading-[1.4]`}>{lines.map((line, index) => <span key={line} className="min-[1001px]:block">{line}{index < lines.length - 1 ? " " : ""}</span>)}</p>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </section>

      <section id="graphics-packaging" aria-labelledby="graphics-packaging-title" className="packaging-section">
        <ScrollReveal className="packaging-panel">
          <div className="packaging-headings">
            <h2 id="graphics-packaging-title" className={display}>Graphics &amp; Packaging</h2>
            <h3 className={display}>Compliance with<br />FDA &amp; U.S. Standards</h3>
          </div>
          <div className={`packaging-copy ${paragraph}`}>
            <p>All our packaging is developed in strict adherence to FDA regulations and U.S. food safety and labeling standards, ensuring full compliance at every stage. From approved materials and food-safe inks to accurate nutritional labeling and required disclosures, each element is carefully evaluated to meet regulatory requirements and communicate essential product information clearly.</p>
            <p>Alongside compliance, we maintain high aesthetic and quality standards to deliver packaging that is both functional and visually compelling. Through precise design, durable materials, and high print quality, we protect product integrity while presenting a modern, premium appearance suited for the U.S. retail environment, with a consistent and recognizable brand identity.</p>
          </div>
          <figure className="packaging-photo brand-photo-hover">
            <div className="packaging-photo-window"><img src={`${images}fda-standards.webp`} alt="U.S. Food and Drug Administration sign outside its headquarters" width="1018" height="679" loading="lazy" /></div>
          </figure>
        </ScrollReveal>
      </section>

      <section id="future-food" aria-labelledby="future-food-title" className="relative bg-white min-[1001px]:min-h-[49.635417cqw] max-[1001px]:pb-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 grid h-1/2 grid-cols-2 max-[1001px]:hidden" aria-hidden="true"><div className="business-gradient" /><div className="bg-[#caddff]" /></div>
        <div className="relative grid min-h-[19.004167cqw] grid-cols-2 max-[1001px]:grid-cols-1">
          <ScrollReveal className="business-reveal pl-[10.436458cqw] pt-[7.047917cqw] max-[1001px]:bg-linear-to-r max-[1001px]:from-babco-blue max-[1001px]:via-[#819bff] max-[1001px]:to-babco-blue max-[1001px]:px-6 max-[1001px]:pb-8 max-[1001px]:pt-10">
            <h2 id="future-food-title" className={`${display} business-step flex flex-col gap-0 text-[2.561458cqw] leading-[1.12] text-white max-[1001px]:text-[clamp(24px,4.5vw,36px)] max-[1001px]:leading-[1.2]`}><span>Technology Shaping</span><span>The Future of Food</span></h2>
          </ScrollReveal>
          <ScrollReveal className="business-reveal px-[2.810938cqw] pt-[5.413281cqw] max-[1001px]:bg-[#caddff] max-[1001px]:px-6 max-[1001px]:py-8">
            <p className={`${copy} business-step text-black`}>In the coming years, our innovation strategy will focus on
              <br className="max-[1001px]:hidden" /> advancing consumer-driven platforms that keep us ahead of
              <br className="max-[1001px]:hidden" /> evolving food trends. Through strong investment in R&D,
              <br className="max-[1001px]:hidden" /> sustainable packaging, and food science, we develop
              <br className="max-[1001px]:hidden" /> great-tasting products that align with changing lifestyles
              <br className="max-[1001px]:hidden" /> and position us to lead the future of food innovation.</p>
          </ScrollReveal>
        </div>
        <ScrollReveal className="relative ml-[3.858854cqw] mr-[3.385417cqw] h-[27.245833cqw] max-[1001px]:mx-6 max-[1001px]:mt-6 max-[1001px]:h-auto max-[1001px]:aspect-[16/9] max-[640px]:mx-4 max-[640px]:aspect-[4/3]">
          <figure className="brand-photo-hover relative size-full overflow-hidden rounded-[2.083333cqw] bg-[#a3c5c3] max-[1001px]:rounded-[24px]">
            <img src={`${images}future-food.webp`} alt="Fresh leafy vegetables moving through a modern automated food processing facility" width="1915" height="821" loading="lazy" className="absolute -left-[0.270664%] -top-[27.645666%] w-[100.270664%] max-w-none max-[1001px]:inset-0 max-[1001px]:size-full max-[1001px]:object-cover" />
          </figure>
        </ScrollReveal>
      </section>
    </>
  );
}
