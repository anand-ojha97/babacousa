import { aboutCapabilities } from "../data/aboutPage.js";

export default function AboutCapabilities() {
  return (
    <section id="operation" aria-labelledby="operation-title" className="about-capabilities">
      <div className="capabilities-heading">
        <h2 data-reveal id="operation-title">Operation</h2>
        <div>
          <h3 data-reveal><span>Purpose, backed</span><span>by capability.</span></h3>
          <p data-reveal className="capabilities-intro">
            The reason Babco exists is human. Delivering on it takes a strong business.
          </p>
        </div>
      </div>
      <div className="capabilities-grid" aria-label="Babco capabilities">
        {aboutCapabilities.map(item => (
          <figure data-reveal key={item.title} className="capability-card">
            <div className={`capability-card-media${item.image.nativeSize ? " capability-card-media-native" : ""}`} style={{ backgroundColor: item.image.background }}>
              <img src={item.image.src} alt={item.image.alt}
                width={item.image.width} height={item.image.height}
                loading="lazy" decoding="async"
                style={{ objectPosition: item.image.position, objectFit: item.image.fit ?? "cover", ...(item.image.nativeSize ? { maxWidth: item.image.width, maxHeight: item.image.height } : {}) }} />
            </div>
            <figcaption className="capability-card-copy">
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
