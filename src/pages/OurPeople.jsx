import PageHero from "../components/PageHero.jsx";
import { familyLeaders, familyValues, familyValuesIntroduction, founders, leadership, leadershipIntroduction, nextGeneration } from "../data/people.js";

const display = "font-heading font-black uppercase tracking-normal [font-kerning:normal] [font-synthesis:none] max-[1001px]:leading-[1.2]";
const images = "/images/our-people/";

function ProfileName({ name }) {
  return name.split(/(Ph\.D\.)/).map((part, index) =>
    part === "Ph.D." ? <span key={index} className="people-credential">{part}</span> : part,
  );
}

function LeaderProfile({ id, name, role, side, theme, photo, paragraphs }) {
  return (
    <article id={id} data-reveal data-portrait-side={side} data-theme={theme || "orange"} aria-labelledby={`${id}-title`} className="leader-profile">
      <div className="leader-profile-fill" aria-hidden="true" />
      <div className="leader-profile-copy">
        <h3 id={`${id}-title`} className="leader-profile-name"><ProfileName name={name} /></h3>
        <p className="leader-profile-role">{role}</p>
        <div className="leader-profile-biography">
          {paragraphs.map((lines, index) => (
            <p key={index}>{lines.map((line, lineIndex) => (
              <span key={line}>{line}{lineIndex < lines.length - 1 ? " " : ""}</span>
            ))}</p>
          ))}
        </div>
      </div>
      <figure className="leader-profile-portrait">
        <div className="leader-profile-photo-window">
          <img src={`${images}${photo.src}`} alt={`Portrait of ${name}`} width={photo.width} height={photo.height} loading="lazy" decoding="async" className="leader-profile-cropped-photo" style={photo.crop} />
        </div>
      </figure>
    </article>
  );
}

export default function OurPeople() {
  return (
    <div className="people-page">
      <PageHero
        id="our-people"
        title="Our People"
        className="page-hero relative aspect-[1920/953] overflow-hidden bg-[#2871ae] max-[1001px]:min-h-[420px] max-[640px]:aspect-[4/5] max-[640px]:min-h-[440px]"
        image={{
          src: `${images}people-banner-updated.webp`,
          alt: "Seven colleagues in silhouette against a blue sky and city skyline",
          width: "1920",
          height: "953",
          className: "absolute inset-0 size-full object-cover object-center",
        }}
        overlayClassName="absolute inset-0"
        titleClassName={`${display} absolute inset-x-0 top-[79.838405%] text-center text-[5.78125cqw] leading-none text-white [text-shadow:0_3px_5px_rgb(0_0_0/0.4)] max-[1001px]:top-auto max-[1001px]:bottom-12 max-[1001px]:text-[clamp(36px,5.4vw,65px)] max-[640px]:bottom-14`}
      />

      <section id="leadership" aria-labelledby="leadership-title" className="people-founders">
        <div className="people-leadership-intro" data-reveal>
          <h2 id="leadership-title" className="people-section-title">Leadership</h2>
          <p>{leadershipIntroduction}</p>
        </div>
        <div className="founder-profiles">
          {founders.map(leader => <LeaderProfile key={leader.id} {...leader} />)}
        </div>
      </section>

      <section id="next-generation" aria-labelledby="next-generation-title" className="people-next-generation">
        <div className="people-generation-panel" data-reveal>
          <h2 id="next-generation-title" className="people-section-title">{nextGeneration.title}</h2>
          <div className="people-generation-statement">
            <h3 className="people-section-title">{nextGeneration.statement.map((line, index) => <span key={line}>{line}{index < nextGeneration.statement.length - 1 ? " " : ""}</span>)}</h3>
            <p>{nextGeneration.copy.map((line, index) => <span key={line} className="min-[1001px]:block">{line}{index < nextGeneration.copy.length - 1 ? " " : ""}</span>)}</p>
          </div>
        </div>
      </section>

      <section aria-label="Babco Foods executive vice presidents" className="leader-profiles">
        {leadership.map(leader => <LeaderProfile key={leader.id} {...leader} />)}
      </section>

      <section id="family-values" aria-labelledby="family-values-title" className="people-values">
        <div className="people-values-intro" data-reveal>
          <h2 id="family-values-title" className="people-section-title">A family business - in more than name</h2>
          <p>{familyValuesIntroduction}</p>
        </div>
        <div className="family-leadership" aria-label="Babco family leadership">
          {familyLeaders.map(({ id, name, role, photo }) => (
            <article key={id} data-reveal className="family-leader" aria-labelledby={`family-${id}-title`}>
              <figure className="family-leader-portrait">
                <img src={`${images}${photo.src}`} alt={`Portrait of ${name}`} width={photo.width} height={photo.height} loading="lazy" decoding="async" style={photo.crop} />
              </figure>
              <h3 id={`family-${id}-title`}><ProfileName name={name} /></h3>
              <p>{role}</p>
            </article>
          ))}
        </div>
        <div className="people-values-grid" data-reveal>
          {familyValues.map(value => (
            <article key={value.title.join(" ")}>
              <h3>{value.title.map((line, index) => <span key={line}>{line}{index < value.title.length - 1 ? " " : ""}</span>)}</h3>
              <p>{value.copy.map((line, index) => <span key={line}>{line}{index < value.copy.length - 1 ? " " : ""}</span>)}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
