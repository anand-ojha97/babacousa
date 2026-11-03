import { useState } from "react";
import { ArrowUpRight, MapPin, Phone, Printer } from "lucide-react";
import { contactFax, contactOffices, directionsHref, phoneHref } from "../data/contact.js";

export default function ContactLocations() {
  const [selected, setSelected] = useState(0);
  const office = contactOffices[selected];
  const preview = office.image ?? {
    src: office.mapImage,
    alt: `Map showing the Babco Foods location at ${office.address}, ${office.cityStateZip}`,
    width: 640, height: 440,
  };
  return (
    <section id="our-locations" aria-labelledby="contact-locations-title" className="contact-locations">
      <div className="contact-locations-intro" data-reveal>
        <h2 id="contact-locations-title" className="contact-section-title">Our locations</h2>
        <p>Connect with our headquarters or a distribution center near you.</p>
      </div>
      <div className="contact-location-layout">
        <div className="contact-office-picker" aria-label="Choose a distribution center" data-reveal>
          {contactOffices.map((item, index) => (
            <button type="button" key={item.id} aria-pressed={selected === index} aria-controls="contact-office-panel" onClick={() => setSelected(index)}>
              <MapPin aria-hidden="true" /><span><strong>{item.city}</strong><span>{item.region}</span></span><ArrowUpRight aria-hidden="true" />
            </button>
          ))}
        </div>
        <div id="contact-office-panel" className="contact-office-panel" data-reveal>
          <div className="contact-office-details" aria-live="polite" aria-atomic="true">
            <div className="contact-office-copy">
              <p className="contact-eyebrow">{office.city}</p>
              <h3>{office.title}</h3>
              <address><MapPin aria-hidden="true" /><span>{office.address}<br />{office.cityStateZip}</span></address>
              <div className="contact-office-numbers">
                <a href={phoneHref(office.phone)}><Phone aria-hidden="true" />{office.phone}</a>
                <p><Printer aria-hidden="true" />Fax: {contactFax}</p>
              </div>
              <a href={directionsHref(office)} target="_blank" rel="noopener noreferrer" className="contact-directions">Get directions <ArrowUpRight aria-hidden="true" /></a>
            </div>
            <div className="contact-map">
              <a href={directionsHref(office)} target="_blank" rel="noopener noreferrer" aria-label={`Open map for ${office.city}`}>
                <img key={office.id} src={preview.src} alt={preview.alt} width={preview.width} height={preview.height} loading="lazy" decoding="async" />
              </a>
            </div>
          </div>
          <div className="contact-interactive-map">
            <iframe key={office.id} src={office.map} title={`Map: ${office.title}`} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </div>
    </section>
  );
}
