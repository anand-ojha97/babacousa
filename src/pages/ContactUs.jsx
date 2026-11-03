import { Mail, Phone, ArrowUpRight } from "lucide-react";
import PageHero from "../components/PageHero.jsx";
import ContactForm from "../components/ContactForm.jsx";
import ContactLocations from "../components/ContactLocations.jsx";
import { contactEmail, contactPhone, phoneHref } from "../data/contact.js";

const display = "font-heading font-black uppercase tracking-normal [font-kerning:normal] [font-synthesis:none] max-[1001px]:leading-[1.2]";

export default function ContactUs() {
  return (
    <div className="contact-page">
      <PageHero id="contact-us" title="Contact Us"
        className="page-hero relative aspect-[1920/953] overflow-hidden bg-[#7c8682] max-[1001px]:min-h-[420px] max-[640px]:aspect-[4/5] max-[640px]:min-h-[440px]"
        image={{ src: "/images/contact-us/contact-banner-updated.webp", alt: "Wooden contact symbols for email, online enquiries and telephone on a red background", width: "1920", height: "953", className: "absolute inset-0 size-full object-cover object-center max-[640px]:object-[60%_center]" }}
        overlayClassName="absolute inset-0 bg-linear-to-b from-black/5 via-black/10 to-black/50"
        titleClassName={`${display} absolute inset-x-0 top-[79.7954%] text-center text-[5.78125cqw] leading-none text-white [text-shadow:0_3px_5px_rgb(0_0_0/0.4)] max-[1001px]:top-auto max-[1001px]:bottom-12 max-[1001px]:text-[clamp(36px,5.4vw,65px)] max-[640px]:bottom-14`} />
      <ContactLocations />
      <section id="write-to-us" aria-labelledby="contact-message-title" className="contact-message-section">
        <div className="contact-message-intro" data-reveal>
          <h2 id="contact-message-title" className="contact-section-title">Write to us</h2>
          <p className="contact-intro-lead">We value your feedback.</p>
          <p>To learn more about Babco Foods or become a customer, tell us how we can help.</p>
          <div className="contact-direct-links">
            <a href={phoneHref(contactPhone)}><span className="contact-direct-icon"><Phone aria-hidden="true" /></span><span><small>Call us</small><strong>{contactPhone}</strong></span><ArrowUpRight aria-hidden="true" /></a>
            <a href={`mailto:${contactEmail}`}><span className="contact-direct-icon"><Mail aria-hidden="true" /></span><span><small>Email us</small><strong>{contactEmail}</strong></span><ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
        <div data-reveal><ContactForm /></div>
      </section>
    </div>
  );
}
