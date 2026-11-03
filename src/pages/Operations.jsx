import { Link } from "react-router";
import PageHero from "../components/PageHero.jsx";
import { ArrowUpRight, Search } from "lucide-react";

const display =
  "font-heading font-black uppercase tracking-normal [font-kerning:normal] [font-synthesis:none] max-[1001px]:leading-[1.2]";
const copy =
  "font-paragraph font-semibold tracking-normal [font-kerning:normal] [font-synthesis:none] [font-variant-ligatures:none] text-[max(16px,1.302083cqw)] leading-[1.2] max-[1001px]:text-base max-[1001px]:leading-[1.55]";

export default function Operations() {
  return (
    <>
      <PageHero
        id="operations"
        title="Operations"
        className="page-hero relative aspect-[1920/953] overflow-hidden bg-[#8d9797] max-[1001px]:min-h-[420px] max-[640px]:aspect-[4/5] max-[640px]:min-h-[440px]"
        image={{
          src: "/images/operations/operations-hero.webp",
          alt: "An operations professional with a tablet inside a food production facility",
          width: "1780",
          height: "883",
          className: "absolute left-0 -top-[0.7515%] h-[101.6079%] w-[101.6667%] max-w-none object-cover max-[1001px]:inset-0 max-[1001px]:size-full max-[640px]:object-[51%_center]",
        }}
        overlayClassName="absolute inset-0 bg-linear-to-b from-black/5 via-black/15 to-black/45"
        titleClassName={`${display} absolute inset-x-0 top-[80.323%] pr-[3.0875cqw] text-center text-[5.78125cqw] leading-none text-white [text-shadow:0_3px_5px_rgb(0_0_0/0.4)] max-[1001px]:top-auto max-[1001px]:bottom-12 max-[1001px]:pr-0 max-[1001px]:text-[clamp(36px,5.4vw,65px)] max-[640px]:bottom-14`}
      />

      <section
        id="infrastructure"
        aria-labelledby="infrastructure-title"
        className="relative bg-[#ffebc8] px-[3.3854cqw] pb-[4.7776cqw] pt-[3.9443cqw] min-[1001px]:min-h-[49.6354cqw] max-[1001px]:px-6 max-[1001px]:py-12 max-[640px]:px-4"
      >
        <div
          className="absolute inset-x-0 top-0 h-1/2 bg-[#f7f5f3]"
          aria-hidden="true"
        />
        <div className="relative text-center">
          <h2 data-reveal
            id="infrastructure-title"
            className={`${display} text-[4.6875cqw] leading-none text-[#ed4100] max-[1001px]:mx-auto max-[1001px]:max-w-[800px] max-[1001px]:text-[clamp(28px,4.5vw,46px)] max-[1001px]:leading-[1.2] max-[640px]:text-[clamp(23px,5.7vw,34px)]`}
          >
            Infrastructure That Delivers
          </h2>
          <p data-reveal
            className={`${copy.replace("font-semibold", "font-medium")} mx-auto mt-[1.0625cqw] max-w-[86.5cqw] text-black max-[1001px]:mt-5 max-[1001px]:max-w-[800px]`}
          >
            Babco Foods’ infrastructure is designed to ensure smooth movement of
            products from source to shelf. By combining facility placement,
            logistics
            <br className="max-[1001px]:hidden" /> coordination, and operational
            expertise, we provide a stable and reliable supply to our partners.
          </p>
          <figure data-reveal className="brand-photo-hover relative mx-auto mt-[3.6198cqw] h-[29.6286cqw] w-[86.3589cqw] overflow-hidden rounded-[2.0833cqw] bg-[#b4d8b2] max-[1001px]:mt-8 max-[1001px]:h-[clamp(300px,38vw,430px)] max-[1001px]:w-full max-[1001px]:rounded-[24px]">
            <img
              src="/images/operations/distribution-map.webp"
              alt="Illustrated distribution network map with routes and location markers"
              width="4000"
              height="2250"
              loading="lazy"
              className="absolute -left-[0.4566%] -top-[21.1648%] w-[101.5627%] max-w-none max-[1001px]:inset-0 max-[1001px]:size-full max-[1001px]:object-cover"
            />
            <Link
              to="/contact-us/#our-locations"
              aria-label="View Babco distribution centers"
              className="absolute left-[1.77%] top-[6.61%] inline-flex min-h-[3.125cqw] items-center justify-center gap-[0.625cqw] rounded-[0.8333cqw] border border-[#ededed] bg-white px-[1.0417cqw] py-[0.625cqw] font-heading text-[0.819271cqw] font-black uppercase leading-[1.2] text-[#777] shadow-sm transition-colors hover:bg-[#fff8ed] hover:text-babco-red max-[1001px]:left-4 max-[1001px]:top-4 max-[1001px]:min-h-11 max-[1001px]:max-w-[calc(100%_-_32px)] max-[1001px]:gap-2 max-[1001px]:rounded-xl max-[1001px]:px-4 max-[1001px]:py-3 max-[1001px]:text-[11px]"
            >
              <Search
                className="size-[0.8333cqw] shrink-0 max-[1001px]:size-4"
                aria-hidden="true"
              />
              Our Distribution Centers
              <ArrowUpRight
                className="size-[0.8333cqw] shrink-0 max-[1001px]:size-4"
                aria-hidden="true"
              />
            </Link>
          </figure>
        </div>
      </section>

      <section
        id="operations-innovation"
        aria-labelledby="operations-innovation-title"
        className="bg-[#ffebc8] px-[3.3854cqw] py-[3.3854cqw] min-[1001px]:min-h-[49.6354cqw] max-[1001px]:px-6 max-[1001px]:py-8 max-[640px]:px-4"
      >
        <div className="relative flex flex-col rounded-[3.125cqw] bg-linear-to-r from-babco-orange to-[#eb3700] pb-[1.46875cqw] pt-[3.1958cqw] min-[1001px]:min-h-[42.8646cqw] max-[1001px]:rounded-[28px] max-[1001px]:p-6 max-[640px]:p-4">
          <h2 data-reveal
            id="operations-innovation-title"
            className={`${display} mx-[2.8557cqw] text-[4.6875cqw] leading-none text-white max-[1001px]:mx-0 max-[1001px]:text-[clamp(28px,4.6vw,45px)] max-[1001px]:leading-[1.2]`}
          >
            Built to Innovate
          </h2>
          <div className="ml-auto mr-[1.3297cqw] mt-[2.5115cqw] min-h-[32.2104cqw] w-[70.5859cqw] rounded-[1.8229cqw] bg-[#ffebc8] pb-[3.125cqw] pl-[3.3854cqw] pr-[25cqw] pt-[3.2435cqw] max-[1001px]:m-0 max-[1001px]:mt-6 max-[1001px]:min-h-0 max-[1001px]:w-full max-[1001px]:rounded-[20px] max-[1001px]:px-6 max-[1001px]:py-7 max-[640px]:px-5">
            <div
              className={`${copy} w-[42.1875cqw] space-y-[1.5625cqw] text-black max-[1001px]:w-full max-[1001px]:space-y-6`}
            >
              <p data-reveal className="max-w-[39.5833cqw] max-[1001px]:max-w-none">
                We continuously invest in modern infrastructure, data-driven
                systems, and intelligent supply-chain processes to strengthen
                operational efficiency and ensure consistent product quality.
              </p>
              <p data-reveal>
                By leveraging automation, cold-chain optimization, and advanced
                inventory management, we streamline distribution while
                empowering our teams to focus on precision, compliance, and
                customer value.
              </p>
              <p data-reveal>
                Our commitment to innovation extends beyond logistics—guiding
                our approach to sourcing, packaging solutions, food safety, and
                sustainability initiatives. This forward-thinking mindset
                enables us to deliver reliable supply, adapt to evolving market
                demands, and support long-term, responsible growth across our
                distribution network.
              </p>
            </div>
          </div>
          <figure data-reveal className="brand-photo-hover absolute right-[2.6594cqw] top-[2.4927cqw] aspect-[425.35/727.94] w-[22.15365cqw] overflow-hidden rounded-[1.04167cqw] bg-[#4a5354] max-[1001px]:relative max-[1001px]:inset-auto max-[1001px]:mt-6 max-[1001px]:aspect-[16/10] max-[1001px]:w-full max-[1001px]:rounded-[20px]">
            <img
              src="/images/operations/innovation-robot.webp"
              alt="Automated warehouse robots moving goods with digital logistics information displays"
              width="1365"
              height="762"
              loading="lazy"
              className="absolute -left-[124.1777%] -top-[35.779%] w-[452.9%] max-w-none max-[1001px]:inset-0 max-[1001px]:size-full max-[1001px]:object-cover"
            />
          </figure>
        </div>
      </section>

      <section
        id="sourcing-partnerships"
        aria-labelledby="sourcing-title"
        className="relative bg-[#fefefe] pb-[3.3854cqw] min-[1001px]:min-h-[49.6354cqw] max-[1001px]:pb-8"
      >
        <div
          className="absolute inset-x-0 top-0 grid h-1/2 grid-cols-2"
          aria-hidden="true"
        >
          <div className="bg-linear-to-r from-babco-blue via-[#819bff] to-babco-blue" />
          <div className="bg-[#caddff]" />
        </div>
        <div className="relative grid min-h-[19.0042cqw] grid-cols-2 max-[1001px]:grid-cols-1">
          <div className="pl-[10.4365cqw] pt-[7.3078cqw] max-[1001px]:bg-linear-to-r max-[1001px]:from-babco-blue max-[1001px]:via-[#819bff] max-[1001px]:to-babco-blue max-[1001px]:px-6 max-[1001px]:pb-7 max-[1001px]:pt-10">
            <h2 data-reveal
              id="sourcing-title"
              className={`${display} flex flex-col gap-0 text-[2.561458cqw] leading-[1.12] text-white max-[1001px]:text-[clamp(24px,4.7vw,36px)] max-[1001px]:leading-[1.2] max-[640px]:text-[clamp(21px,5.5vw,32px)]`}
            >
              <span>Smart Sourcing.</span>
              <span>Strong Partnerships.</span>
            </h2>
          </div>
          <div className="px-[2.8109cqw] pt-[5.4133cqw] max-[1001px]:bg-[#caddff] max-[1001px]:px-6 max-[1001px]:py-8">
            <p data-reveal
              className={`${copy} max-w-[37.5cqw] text-black max-[1001px]:max-w-none`}
            >
              Our supply chain is powered by long-standing partnerships and
              smart sourcing strategies. This approach enables us to maintain
              product integrity, ensure consistent availability, and deliver
              differentiated offerings that meet diverse customer and market
              needs.
            </p>
          </div>
        </div>
        <figure data-reveal className="brand-photo-hover relative ml-[3.8589cqw] mr-[3.3854cqw] h-[27.2458cqw] overflow-hidden rounded-[2.0833cqw] bg-[#867655] max-[1001px]:mx-6 max-[1001px]:mt-6 max-[1001px]:h-auto max-[1001px]:aspect-[16/9] max-[1001px]:rounded-[24px] max-[640px]:mx-4 max-[640px]:aspect-[4/3]">
          <img
            src="/images/operations/warehouse-sourcing.webp"
            alt="Warehouse staff monitoring inventory on a tablet while goods are moved through storage aisles"
            width="1372"
            height="766"
            loading="lazy"
            className="absolute -left-[0.4228%] -top-[47.2473%] w-[101.2158%] max-w-none max-[1001px]:inset-0 max-[1001px]:size-full max-[1001px]:object-cover max-[1001px]:object-[65%_center]"
          />
        </figure>
      </section>
    </>
  );
}
