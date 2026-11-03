import CountUp from "./CountUp.jsx";
import InteractiveDistributionMap from "./InteractiveDistributionMap.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function Locations() {
  return (
    <section
      id="locations"
      className="locations-section relative text-babco-orange"
    >
      <SectionHeading className="reveal-detail text-[4.6875cqw] max-[640px]:text-[10.5cqw]">
        Our location
      </SectionHeading>
      <p className="font-paragraph font-semibold tracking-normal [font-kerning:normal] [font-synthesis:none] [font-variant-ligatures:none] text-[1.822917cqw] leading-[1.2] max-[640px]:text-[15px] max-[640px]:leading-[1.45]">
        Our in-house distribution expanded to cover <CountUp inline value="46" /> states of the <CountUp inline value="50" /> US
        states with <CountUp inline value="5" /> Babco Foods distribution
        <br className="hidden min-[1001px]:block" /> centers located
        strategically across the US.
      </p>
      <InteractiveDistributionMap />
    </section>
  );
}
