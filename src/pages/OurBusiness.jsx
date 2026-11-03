import PageHero from "../components/PageHero.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";
import CountUp from "../components/CountUp.jsx";
import { salesStats, warehouseStages, logisticsSteps, qualityStats } from "../data/business.js";

const display =
  "font-heading font-black uppercase tracking-normal [font-kerning:normal] [font-synthesis:none] max-[1001px]:leading-[1.2]";
const paragraph =
  "font-paragraph font-semibold tracking-normal [font-kerning:normal] [font-synthesis:none] [font-variant-ligatures:none]";
const medium = paragraph.replace("font-semibold", "font-medium");
const smallDisplay = "font-heading font-bold uppercase tracking-normal [font-kerning:normal] [font-synthesis:none]";
const copy = `${paragraph} text-[max(16px,1.302083cqw)] leading-[1.28] max-[1001px]:text-base max-[1001px]:leading-[1.55]`;
const images = "/images/our-business/";

function BusinessStat({ value, lines, index }) {
  return (
    <div className="business-step" style={{ "--step-delay": `${index * 110}ms` }}>
      <p className={`${display} text-[3.385417cqw] leading-none text-white max-[1001px]:text-[clamp(32px,5vw,48px)] max-[640px]:text-[clamp(24px,7vw,38px)] max-[360px]:text-[22px]`}><CountUp value={value} /></p>
      <p className={`${medium} mt-[0.3cqw] flex flex-col text-[clamp(12px,0.604167cqw,14px)] leading-[1.4] text-white max-[1001px]:mt-1`}>
        {lines.map((line) => <span key={line}>{line}</span>)}
      </p>
    </div>
  );
}

function WarehousePhoto() {
  return (
    <figure className="warehouse-photo" aria-label="Babco warehouse and distribution facility">
      <img src={`${images}warehouse-updated.webp`} alt="Babco warehouse collage showing stocked pallet racks, storage aisles and a forklift" width="908" height="580" loading="lazy" decoding="async" />
    </figure>
  );
}

function QualityPhoto() {
  return (
    <figure className="quality-photo relative aspect-square w-full overflow-hidden rounded-br-[40%] rounded-tl-[40%]">
      <img src={`${images}quality-specialist.webp`} alt="A food quality specialist examining samples with a microscope" width="1254" height="1254" loading="lazy" decoding="async" className="block h-auto w-full -scale-x-100" />
    </figure>
  );
}

export default function OurBusiness() {
  return (
    <>
      <PageHero
        id="our-business"
        title="Our Business"
        className="page-hero relative aspect-[1920/953] overflow-hidden bg-[#15323f] max-[1001px]:min-h-[420px] max-[640px]:aspect-[4/5] max-[640px]:min-h-[440px]"
        image={{
          src: `${images}hero-growth.webp`,
          alt: "A business professional studying a digital growth chart",
          width: "2200",
          height: "1354",
          className: "absolute -left-[8.591146%] top-0 h-[147.175%] w-[118.75%] max-w-none object-cover max-[1001px]:inset-0 max-[1001px]:size-full max-[640px]:object-[43%_center]",
        }}
        overlayClassName="absolute inset-0 bg-linear-to-b from-black/5 via-black/10 to-black/45"
        titleClassName={`${display} absolute inset-x-0 top-[79.7954%] text-center text-[5.78125cqw] leading-none text-white [text-shadow:0_3px_5px_rgb(0_0_0/0.4)] max-[1001px]:top-auto max-[1001px]:bottom-12 max-[1001px]:text-[clamp(36px,5.4vw,65px)] max-[640px]:bottom-14 max-[640px]:text-[clamp(30px,7vw,54px)]`}
      />

      <section id="sales" aria-labelledby="sales-title" className="relative bg-white min-[1001px]:grid min-[1001px]:min-h-[49.635417cqw] min-[1001px]:grid-cols-[43.0828cqw_1fr] min-[1001px]:grid-rows-[auto_1fr] min-[1001px]:gap-x-[3.1526cqw] min-[1001px]:p-[3.3854cqw] max-[1001px]:pt-8">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-r from-[#ff6420] to-[#ed4100] max-[1001px]:hidden" aria-hidden="true" />
        <ScrollReveal className="business-reveal min-[1001px]:col-start-1 min-[1001px]:row-span-2 min-[1001px]:row-start-1 min-[1001px]:min-h-[42.6016cqw] min-[1001px]:w-full max-[1001px]:mx-6 max-[1001px]:aspect-[4/3] max-[1001px]:max-h-[560px] max-[640px]:mx-4">
          <figure className="brand-photo-hover relative size-full overflow-hidden rounded-[2.0833cqw] bg-[#e5e4df] max-[1001px]:rounded-[26px]">
            <img src={`${images}sales-growth.webp`} alt="Wooden SALES blocks with a red arrow rising above them" width="2200" height="1711" loading="lazy" className="absolute -left-[21.176%] -top-[2.818%] w-[133.695%] max-w-none max-[1001px]:inset-0 max-[1001px]:size-full max-[1001px]:object-cover" />
          </figure>
        </ScrollReveal>
        <ScrollReveal className="business-reveal min-[1001px]:col-start-2 min-[1001px]:row-start-1 min-[1001px]:w-[43cqw] min-[1001px]:pt-[0.669287cqw] max-[1001px]:px-6 max-[1001px]:py-8">
          <h2 id="sales-title" className={`${display} business-step text-[4.6875cqw] leading-none text-[#e83e00] max-[1001px]:text-[clamp(32px,4.6vw,46px)]`}>Sales</h2>
          <div className={`${copy} mt-[1.2729cqw] space-y-[1.666667cqw] text-black max-[1001px]:mt-5 max-[1001px]:space-y-5`}>
            <p className="business-step" style={{ "--step-delay": "80ms" }}>
              Developing genuine relationships with our customers is a core value
              <br className="max-[1001px]:hidden" /> that shapes how we do business. We focus on trust, transparency,
              <br className="max-[1001px]:hidden" /> and understanding to build strong, long-term partnerships rather
              <br className="max-[1001px]:hidden" /> than short-term transactions.
            </p>
            <p className="business-step" style={{ "--step-delay": "160ms" }}>
              Through open communication, reliable service, and proactive
              <br className="max-[1001px]:hidden" /> engagement, we deliver consistent value and grow together
              <br className="max-[1001px]:hidden" /> with our customers over time.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal className="business-reveal min-[1001px]:col-start-2 min-[1001px]:row-start-2 min-[1001px]:ml-[1.0094cqw] min-[1001px]:mt-[5cqw] min-[1001px]:w-[36cqw] max-[1001px]:bg-linear-to-r max-[1001px]:from-[#ff6420] max-[1001px]:to-[#ed4100] max-[1001px]:px-6 max-[1001px]:py-10">
          <div className="grid grid-cols-[14.44cqw_1fr] gap-y-[2.9cqw] max-[1001px]:grid-cols-2 max-[1001px]:gap-x-5 max-[1001px]:gap-y-9">
            {salesStats.map((stat, index) => <BusinessStat key={stat.value} {...stat} index={index} />)}
          </div>
        </ScrollReveal>
      </section>

      <section id="warehousing" aria-labelledby="warehousing-title" className="warehouse-section relative bg-white">
        <div className="warehouse-section-background business-gradient" aria-hidden="true" />
        <ScrollReveal className="warehouse-heading">
          <h2 id="warehousing-title" className={`${display} warehouse-title text-babco-blue`}>Warehousing</h2>
        </ScrollReveal>
        <ScrollReveal className="warehouse-media">
          <WarehousePhoto />
        </ScrollReveal>
        <ScrollReveal className="business-reveal business-warehouse-copy warehouse-copy">
          <div className="warehouse-copy-list">
            {warehouseStages.map(({ title, lines }, index) => (
              <div key={title} className="business-step" style={{ "--step-delay": `${index * 120}ms` }}>
                <h3 className={`${display} warehouse-stage-title text-white`}>{title}</h3>
                <p className={`${medium} warehouse-stage-copy text-white`}>{lines.map((line, lineIndex) => <span className="warehouse-copy-line" key={line}>{line}{lineIndex < lines.length - 1 ? " " : ""}</span>)}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section id="business-logistics" aria-labelledby="logistics-title" className="business-gradient relative overflow-hidden min-[1001px]:min-h-[49.635417cqw] max-[1001px]:pt-8">
        <ScrollReveal className="business-reveal relative min-[1001px]:min-h-[10.9375cqw] min-[1001px]:px-[3.7328cqw] min-[1001px]:pb-[1.5625cqw] min-[1001px]:pt-[1.65885cqw] max-[1001px]:px-6">
          <h2 id="logistics-title" className={`${display} business-step text-[4.6875cqw] leading-none text-white max-[1001px]:text-[clamp(32px,4.6vw,46px)]`}>Logistics</h2>
          <p className={`${paragraph} business-step mt-[1.0115cqw] text-[1.822917cqw] leading-[1.2] text-white max-[1001px]:mt-5 max-[1001px]:text-base max-[1001px]:leading-[1.55]`} style={{ "--step-delay": "100ms" }}>
            Our logistics ensure efficient storage, accurate order handling, and on-time delivery while maintaining
            <br className="max-[1001px]:hidden" /> product quality and supply reliability.
          </p>
        </ScrollReveal>
        <div className="relative min-[1001px]:h-[40cqw] min-[1001px]:overflow-hidden">
          <ScrollReveal className="pointer-events-none absolute inset-0 max-[1001px]:hidden">
            <img src={`${images}logistics-truck-updated.png`} alt="A Babco refrigerated delivery truck in a shipping container yard at dusk" width="1920" height="768" loading="lazy" className="reveal-truck absolute inset-0 size-full max-w-none object-contain" />
          </ScrollReveal>
          <ScrollReveal className="business-reveal relative z-10 min-[1001px]:absolute min-[1001px]:left-[3.645833cqw] min-[1001px]:top-[4.166667cqw] min-[1001px]:w-[93.072917cqw] max-[1001px]:mx-auto max-[1001px]:mt-8 max-[1001px]:w-[calc(100%_-_48px)]">
            <ol className="grid grid-cols-5 gap-[0.9375cqw] max-[1001px]:grid-cols-2 max-[1001px]:gap-5 max-[640px]:grid-cols-1 max-[640px]:gap-4">
              {logisticsSteps.map(({ title, lines }, index) => (
                <li key={title.join(" ")} className="business-step" style={{ "--step-delay": `${index * 130}ms` }}>
                  <div className="business-process-card relative h-full min-h-[15.416667cqw] rounded-[1.354167cqw] px-[0.9cqw] pb-[1.25cqw] pt-[0.694531cqw] text-center text-white max-[1001px]:min-h-[180px] max-[1001px]:rounded-[22px] max-[1001px]:px-5 max-[1001px]:py-6">
                    <h3 className={`${smallDisplay} flex min-h-[3.375cqw] flex-col justify-center text-[1.40625cqw] leading-[1.2] max-[1001px]:min-h-0 max-[1001px]:text-[20px] max-[640px]:text-[22px] max-[375px]:text-[20px] max-[340px]:text-[18px]`}>{title.map((line) => <span key={line}>{line}</span>)}</h3>
                    <p className={`${paragraph} mt-[0.524219cqw] text-[0.677083cqw] leading-[1.2] max-[1001px]:mt-4 max-[1001px]:text-[14px] max-[1001px]:leading-[1.5]`}>{lines.map((line, lineIndex) => <span key={line} className="min-[1001px]:block">{line}{lineIndex < lines.length - 1 ? " " : ""}</span>)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </ScrollReveal>
          <ScrollReveal className="relative mt-3 hidden aspect-[1920/768] overflow-hidden max-[1001px]:block" aria-hidden="true">
            <img src={`${images}logistics-truck-updated.png`} alt="" width="1920" height="768" loading="lazy" className="reveal-truck block h-auto w-full max-w-none" />
          </ScrollReveal>
        </div>
      </section>

      <section id="food-safety-quality" aria-labelledby="quality-title" className="relative grid grid-cols-2 bg-[#0f440e] min-[1001px]:min-h-[49.635417cqw] max-[1001px]:grid-cols-1">
        <div className="bg-[#3b6420] p-[5.208333cqw] max-[1001px]:p-6 max-[640px]:p-4">
          <ScrollReveal className="h-full"><QualityPhoto /></ScrollReveal>
        </div>
        <ScrollReveal className="business-reveal relative flex flex-col items-start pb-[5.7578cqw] pl-[4.0943cqw] pr-[3.385417cqw] pt-[5.7578cqw] text-[#bfde7d] max-[1001px]:px-6 max-[1001px]:py-10">
          <h2 id="quality-title" className={`${display} business-step flex flex-col gap-0 text-[4.652083cqw] leading-[1.05] max-[1001px]:text-[clamp(34px,6vw,58px)] max-[1001px]:leading-[1.2]`}>
            <span>Food</span><span className="text-[#8ebc29]">Safety &</span><span>Quality</span>
          </h2>
          <p className={`${copy} business-step mt-[1.5625cqw] w-full max-w-[37.5cqw] leading-[1.4] max-[1001px]:mt-6 max-[1001px]:max-w-none`} style={{ "--step-delay": "110ms" }}>
            We strictly adhere to FDA regulations and U.S. food safety
            <br className="max-[1001px]:hidden" /> standards across sourcing, storage, and distribution,
            <br className="max-[1001px]:hidden" /> ensuring every product meets the highest quality,
            <br className="max-[1001px]:hidden" /> compliance, and safety requirements.
          </p>
          <div className="mt-auto grid w-full grid-cols-[18.3448cqw_1fr] pt-[3.125cqw] max-[1001px]:mt-10 max-[1001px]:grid-cols-2 max-[1001px]:gap-5 max-[1001px]:pt-0">
            {qualityStats.map((stat, index) => <BusinessStat key={stat.value} {...stat} index={index + 2} />)}
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
