import { Link } from "react-router";
import PageHero from "../components/PageHero.jsx";
import AboutCapabilities from "../components/AboutCapabilities.jsx";
import { joyMoments } from "../data/aboutPage.js";
import { ArrowUpRight } from "lucide-react";

const display =
  "font-about-heading font-black uppercase tracking-normal [font-kerning:normal] [font-synthesis:none] max-[1001px]:leading-[1.2]";
const paragraphMetrics =
  "font-paragraph tracking-normal [font-kerning:normal] [font-synthesis:none] [font-variant-ligatures:none] text-[max(16px,1.302083cqw)] leading-[1.2] max-[1001px]:text-base max-[1001px]:leading-[1.55]";
const copy = `${paragraphMetrics} font-semibold`;
const caption = `${paragraphMetrics} font-medium`;

function PageLink({ href, children, light = false }) {
  return (
    <Link
      to={href}
      className={`action-hover inline-flex w-fit items-center gap-[0.6cqw] rounded-full px-[0.8333cqw] py-[0.45cqw] font-heading text-[1.034896cqw] font-black leading-[1.4] max-[1001px]:gap-2 max-[1001px]:px-4 max-[1001px]:py-2 max-[1001px]:text-sm ${light ? "bg-white text-[#0f440e] hover:bg-[#ffebc8]" : "bg-babco-blue text-[#0036ae] hover:bg-[#caddff]"}`}
    >
      Go to Page <span className="sr-only">: {children}</span>
      <ArrowUpRight
        className="size-[1.05cqw] max-[1001px]:size-[18px]"
        aria-hidden="true"
      />
    </Link>
  );
}

function Statement({ id, title, lines, children, mission = false }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`px-[3.3854cqw] py-[3.3854cqw] min-[1001px]:min-h-[49.6354cqw] max-[1001px]:px-6 max-[1001px]:py-8 max-[640px]:px-4 ${mission ? "bg-babco-blue" : "bg-[#ffebc8]"}`}
    >
      <div
        className={`flex flex-col rounded-[3.125cqw] pb-[1.3021cqw] pt-[2.98cqw] min-[1001px]:min-h-[42.8646cqw] max-[1001px]:rounded-[28px] max-[1001px]:p-6 max-[640px]:p-4 ${mission ? "bg-linear-to-r from-[#1d5dff] to-[#0036ae]" : "bg-linear-to-r from-babco-orange to-[#eb3700]"}`}
      >
        <h2 data-reveal
          id={`${id}-title`}
          className={`${display} mx-[2.8542cqw] text-[4.6875cqw] leading-none text-white max-[1001px]:mx-0 max-[1001px]:text-[clamp(25px,4.6vw,45px)] ${mission ? "self-end max-[1001px]:self-start" : "self-start"}`}
        >
          {title}
        </h2>
        <div
          className={`mt-[2.72396cqw] w-[70.5859cqw] rounded-[1.8229cqw] px-[3.127cqw] pb-[3.08cqw] pt-[3.46198cqw] max-[1001px]:mt-6 max-[1001px]:w-full max-[1001px]:rounded-[20px] max-[1001px]:px-6 max-[1001px]:py-7 max-[640px]:px-5 ${mission ? "ml-[1.3297cqw] mr-auto bg-[#caddff] max-[1001px]:ml-0" : "ml-auto mr-[1.3297cqw] bg-[#ffebc8] max-[1001px]:mr-0"}`}
        >
          <h3 data-reveal
            className={`${display} flex flex-col gap-0 text-[4.6875cqw] leading-[1.08] text-black max-[1001px]:text-[clamp(24px,4.6vw,45px)] max-[640px]:text-[clamp(17px,5.3vw,30px)]`}
          >
            {lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h3>
          <div
            className={`${copy} mx-[0.2552cqw] mt-[3.06cqw] max-w-[62.5cqw] space-y-[1.5625cqw] text-black max-[1001px]:mx-0 max-[1001px]:mt-6 max-[1001px]:max-w-none max-[1001px]:space-y-5`}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function WhoWeAre() {
  return (
    <>
      <PageHero
        id="who-we-are"
        title="Who We Are"
        className="page-hero relative aspect-[1920/953] overflow-hidden bg-[#87979b] max-[1001px]:min-h-[420px] max-[640px]:aspect-[4/5] max-[640px]:min-h-[440px]"
        image={{
          src: "/images/who-we-are/distribution-video-poster.webp",
          alt: "Babco Foods distribution trucks at the warehouse and travelling through the countryside",
          width: "1920",
          height: "1080",
          className: "absolute inset-0 size-full object-cover object-center",
        }}
        video={{
          src: "/videos/who-we-are-distribution.mp4",
          controlClassName: "absolute bottom-5 right-5 z-10 flex size-11 items-center justify-center rounded-full border-2 border-white bg-black/30 text-white transition-colors hover:bg-black/50 focus-visible:bg-black/50 max-[640px]:bottom-4 max-[640px]:right-4",
        }}
        overlayClassName="absolute inset-0 bg-linear-to-b from-black/5 via-black/15 to-black/45"
        titleClassName={`${display} absolute inset-x-0 top-[79.7954%] text-center text-[5.78125cqw] leading-none text-white [text-shadow:0_3px_5px_rgb(0_0_0/0.4)] max-[1001px]:top-auto max-[1001px]:bottom-12 max-[1001px]:text-[clamp(36px,5.4vw,65px)] max-[640px]:bottom-14`}
      />

      <section
        id="our-company"
        aria-labelledby="company-title"
        className="relative px-[3.3854cqw] pb-[4.375cqw] pt-[4.1604cqw] min-[1001px]:min-h-[49.6354cqw] max-[1001px]:px-6 max-[1001px]:py-12 max-[640px]:px-4"
      >
        <div
          className="absolute inset-x-0 top-0 h-1/2 bg-[#f7f5f3]"
          aria-hidden="true"
        />
        <div className="relative text-center">
          <h2 data-reveal
            id="company-title"
            className={`${display} text-[4.6875cqw] leading-none text-babco-blue max-[1001px]:mx-auto max-[1001px]:max-w-[760px] max-[1001px]:text-[clamp(27px,4.5vw,46px)] max-[1001px]:leading-[1.25]`}
          >
            Moving Food Forward Since 2002
          </h2>
          <p data-reveal
            className={`${copy} mx-auto mt-[1.25cqw] max-w-[84cqw] text-black max-[1001px]:mt-5 max-[1001px]:max-w-[750px]`}
          >
            Built on generations of trust, we remain focused on meeting our
            customers’ needs and expectations. This enduring commitment drives
            us to
            <br className="max-[1001px]:hidden" /> consistently deliver quality,
            reliability, and value in everything we offer, today and for
            generations to come.
          </p>
          <figure data-reveal className="brand-photo-hover mx-auto mt-[3.6979cqw] w-[86.3589cqw] overflow-hidden rounded-[2.0833cqw] max-[1001px]:mt-8 max-[1001px]:w-full max-[1001px]:rounded-[24px]">
            <img
              src="/images/who-we-are/retail-partners.webp"
              alt="A BABCO representative and a retailer talking in a grocery store"
              width="2941"
              height="1263"
              loading="lazy"
              className="h-[22.2396cqw] w-full object-cover object-[center_47%] max-[1001px]:h-auto max-[1001px]:aspect-[2/1] max-[640px]:aspect-[4/3]"
            />
            <figcaption
              className={`${caption} flex min-h-[7.4073cqw] items-center justify-center bg-linear-to-r from-babco-blue to-[#69a9ff] px-[2.5cqw] py-[1.25cqw] text-white max-[1001px]:px-6 max-[1001px]:py-6 max-[640px]:px-5`}
            >
              <p data-reveal className="max-w-[81cqw] max-[1001px]:max-w-none">
                We work with retailers of all sizes, serving South and North
                Indian stores across the US, as well as non-Indian retailers and
                supermarkets with a diverse customer base. Our extensive
                distribution network, guided by quality, ethics, and integrity,
                drives the strong growth of Babco and the brands we represent.
              </p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        id="babco-story"
        aria-labelledby="story-title"
        className="grid grid-cols-[46.212%_1fr] items-stretch gap-[3.3854cqw] px-[3.3854cqw] py-[3.3854cqw] max-[1001px]:grid-cols-1 max-[1001px]:gap-7 max-[1001px]:px-6 max-[1001px]:pb-12 max-[1001px]:pt-8 max-[640px]:px-4"
      >
        <div data-reveal className="brand-photo-hover relative min-h-0 overflow-hidden rounded-[2.0833cqw] max-[1001px]:mx-auto max-[1001px]:aspect-[4/3] max-[1001px]:w-full max-[1001px]:max-w-[620px] max-[1001px]:rounded-[24px]">
          <img
            src="/images/who-we-are/founders-bob-olivia-updated.webp"
            alt="Babco Foods founders Bob and Olivia Vaz"
            width="1356"
            height="1233"
            loading="lazy"
            className="absolute -left-[31.06826%] -top-[4.44158%] w-[151.0144%] max-w-none"
          />
        </div>
        <div className="flex min-w-0 flex-col items-start">
          <h2 data-reveal
            id="story-title"
            className={`${display} text-[4.6875cqw] leading-none text-babco-blue max-[1001px]:text-[clamp(30px,4.6vw,46px)]`}
          >
            Babco Story
          </h2>
          <div className={`${copy} mt-[1.55cqw] max-w-[45.208333cqw] space-y-[1.614583cqw] leading-[1.24] text-black max-[1001px]:mt-5 max-[1001px]:max-w-none max-[1001px]:space-y-5 max-[1001px]:leading-[1.55]`}>
            <p data-reveal>
              When Bob and Olivia Vaz came to America, foods from their family’s home
              in Mangalore, Karnataka, were difficult to find. Their experience reflected a
              larger gap: many South Indian communities were underserved or unserved
              in the U.S. grocery market.
            </p>
            <p data-reveal>
              Bob and Olivia Vaz founded Babco Foods in 2002. Babco Foods and its
              flagship brand, Anand, were created to help fill that gap — bringing the
              foods of specific South Indian regions to families across America.
            </p>
            <p data-reveal>
              Their work established the foundation from which Babco continues to grow.
            </p>
          </div>
          <div className="mt-[1.5625cqw] max-[1001px]:mt-6">
            <PageLink href="/babco-story/">Read the full Babco Story</PageLink>
          </div>
        </div>
      </section>

      <Statement
        id="vision"
        title="Our Vision"
        lines={["Better Food.", "Better Future."]}
      >
        <p data-reveal>
          Better food begins with responsible sourcing, consistent quality, and
          thoughtful distribution. We work closely with trusted partners to
          ensure products meet established standards for safety, reliability,
          and performance at every stage of the supply chain. Through efficient
          logistics and careful handling, we strive to preserve product
          integrity while delivering value to retailers and consumers alike.
        </p>
        <p data-reveal>
          By prioritizing transparency, long-term partnerships, and continuous
          improvement, we aim to support healthier choices today and adapt to
          evolving market needs. Our approach is focused on building a resilient
          and sustainable food ecosystem—one that balances quality,
          accountability, and responsible growth for the future.
        </p>
      </Statement>

      <section id="mission" aria-labelledby="mission-title" className="bg-white pb-[2.083333cqw] max-[1001px]:pb-10">
        <div className="bg-linear-to-r from-[#5ab2ff] via-[#8297ff] to-[#5ab2ff] px-[3.385417cqw] pb-[11.145833cqw] pt-[3.802083cqw] text-white max-[1001px]:px-6 max-[1001px]:pb-[190px] max-[1001px]:pt-10 max-[640px]:px-4 max-[640px]:pb-[180px]">
          <div className="grid grid-cols-2 gap-[1.145833cqw] max-[1001px]:grid-cols-1 max-[1001px]:gap-6">
            <h2 data-reveal id="mission-title" className={`${display} pl-[2.864583cqw] text-[4.6875cqw] leading-none max-[1001px]:pl-0 max-[1001px]:text-[clamp(30px,4.8vw,46px)]`}>Our Mission</h2>
            <div>
              <h3 data-reveal className={`${display} text-[4.6875cqw] leading-none max-[1001px]:text-[clamp(26px,4.8vw,46px)] max-[640px]:text-[clamp(26px,7.2vw,42px)]`}>We Spread Joy</h3>
              <p data-reveal className={`${copy} mt-[1.5625cqw] max-w-[32.552083cqw] leading-[1.24] max-[1001px]:mt-5 max-[1001px]:max-w-[640px] max-[1001px]:leading-[1.55]`}>
                Anand means joy, happiness, bliss. For Babco, joy is what food can carry
                from one person, place and generation to another.
              </p>
            </div>
          </div>
        </div>
        <div className="relative -mt-[7.8125cqw] grid grid-cols-4 gap-[1.197917cqw] px-[3.385417cqw] max-[1001px]:-mt-[150px] max-[1001px]:grid-cols-2 max-[1001px]:gap-x-5 max-[1001px]:gap-y-8 max-[1001px]:px-6 max-[640px]:-mt-[140px] max-[640px]:grid-cols-1 max-[640px]:gap-8 max-[640px]:px-4">
          {joyMoments.map(moment => (
            <figure data-reveal key={moment.title} className="min-w-0 text-center text-black">
              <div className="brand-photo-hover aspect-square overflow-hidden rounded-[1.5625cqw] max-[1001px]:rounded-[24px]">
                <img src={`/images/who-we-are/${moment.image}`} alt={moment.alt} width={moment.width} height={moment.height} loading="lazy" className="size-full object-cover" style={{ objectPosition: moment.position }} />
              </div>
              <figcaption className="mt-[1.25cqw] font-paragraph text-[max(16px,1.302083cqw)] leading-[1.24] tracking-normal [font-kerning:normal] [font-synthesis:none] [font-variant-ligatures:none] max-[1001px]:mt-5 max-[1001px]:text-lg max-[1001px]:leading-[1.4] max-[640px]:text-base max-[640px]:leading-[1.5]">
                <h4 className="font-copy font-bold">{moment.title}</h4>
                <p className="font-semibold">{moment.lines.map((line, index) => <span key={line} className="min-[1001px]:block">{line}{index < moment.lines.length - 1 ? " " : ""}</span>)}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <AboutCapabilities />
    </>
  );
}
