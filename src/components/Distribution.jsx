import SectionHeading from "./SectionHeading.jsx";
import CountUp from "./CountUp.jsx";

export default function Distribution() {
  return (
    <section
      id="distribution"
      className="relative flex flex-col overflow-hidden px-[7%] pb-4 pt-6 min-[1001px]:block min-[1001px]:aspect-[1920/953] min-[1001px]:p-0"
    >
      <div
        id="authenticity"
        className="relative z-10 bg-white min-[1001px]:bg-transparent mb-[38px] min-h-[146px] w-[94%] min-[1001px]:absolute min-[1001px]:left-[3.65%] min-[1001px]:top-[6.815%] min-[1001px]:m-0 min-[1001px]:min-h-0 min-[1001px]:w-[39.4%]"
      >
        <SectionHeading
          className="text-[clamp(24px,8cqw,70px)] text-babco-blue min-[1001px]:text-[5.276563cqw]"
          style={{ lineHeight: 1.05 }}
        >
          <span className="block">We drive for</span>
          <span className="block pl-[2.08cqw]">authenticity</span>
        </SectionHeading>
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-[calc(100%_-_170px)] bg-[linear-gradient(90deg,#5ab2ff,#8696ff_70%,#5ab2ff)] min-[1001px]:h-[65.0577%]"
        aria-hidden="true"
      />
      <div className="reveal-detail relative z-10 w-full text-white min-[1001px]:absolute min-[1001px]:left-[3.425%] min-[1001px]:top-[40.8%] min-[1001px]:w-[31.3%] [&_p]:font-paragraph [&_p]:font-medium [&_p]:not-italic [&_p]:tracking-normal [&_p]:[font-kerning:normal] [&_p]:[font-synthesis:none] [&_p]:[font-variant-ligatures:none]">
        <SectionHeading className="mb-5 text-[clamp(28px,7cqw,55px)] min-[1001px]:mb-[1.1cqw] min-[1001px]:text-[4.6875cqw]">
          Distribution
        </SectionHeading>
        <p className="first-of-type:min-[1001px]:mt-0 mt-3.5 max-w-none text-sm leading-[1.45] min-[1001px]:ml-[0.22cqw] min-[1001px]:mt-[1.3cqw] min-[1001px]:text-[1.041667cqw] min-[1001px]:leading-[1.2]">
          We deliver an extensive lineup of high-quality products backed by
          dependable distribution, strong compliance standards, and a
          customer-first approach. Our focus on quality, variety, and efficiency
          ensures your business is positioned to grow and outperform
          competitors.
        </p>
        <p className="first-of-type:min-[1001px]:mt-0 mt-3.5 max-w-none text-sm leading-[1.45] min-[1001px]:ml-[0.22cqw] min-[1001px]:mt-[1.3cqw] min-[1001px]:text-[1.041667cqw] min-[1001px]:leading-[1.2]">
          Our dedicated support team works closely with partners to provide
          insights, resolve challenges, and drive long-term success.
        </p>
      </div>
      <div className="reveal-detail relative z-10 mt-[30px] flex w-full justify-between text-white min-[1001px]:absolute min-[1001px]:bottom-[7%] min-[1001px]:left-[3.535%] min-[1001px]:m-0 min-[1001px]:w-[30%] min-[1001px]:grid min-[1001px]:grid-cols-[34.3%_37.6%_28.1%] [&_strong]:block [&_strong]:font-heading [&_strong]:text-[32px] [&_strong]:font-black [&_strong]:leading-none [&_strong]:tracking-normal [&_.stat-label]:mt-[7px] [&_.stat-label]:block [&_.stat-label]:text-[10px] [&_.stat-label]:leading-[1.45] [&_.stat-label]:font-paragraph [&_.stat-label]:font-medium min-[1001px]:[&_strong]:text-[3.385417cqw] min-[1001px]:[&_.stat-label]:mt-[0.4cqw] min-[1001px]:[&_.stat-label]:text-[0.78cqw]">
        <div>
          <strong>
            <CountUp value="5" />
          </strong>
          <span className="stat-label">Distribution locations</span>
        </div>
        <div>
          <strong>
            <CountUp value="25+" />
          </strong>
          <span className="stat-label">World wide suppliers</span>
        </div>
        <div>
          <strong>
            <CountUp value="250+" />
          </strong>
          <span className="stat-label">SKUs</span>
        </div>
      </div>
      <img
        className="image-hover reveal-truck relative z-5 ml-[8%] mt-[30px] h-auto w-[104%] max-w-none min-[1001px]:absolute min-[1001px]:bottom-[0.9275%] min-[1001px]:left-[37.5%] min-[1001px]:m-0 min-[1001px]:w-[62.5%]"
        src="/images/distribution-truck-v2.webp"
        alt="Babco Foods refrigerated delivery truck with the Babco logo on its cab"
        width="1274"
        height="953"
        loading="lazy"
      />
    </section>
  );
}
