import { useCallback, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { contactEmail, contactFields, contactPrivacyUrl } from "../data/contact.js";
import { buildContactDraft, emptyContact, validateContact } from "../utils/contactForm.js";
import ContactCaptcha from "./ContactCaptcha.jsx";

export default function ContactForm() {
  const [values, setValues] = useState(emptyContact);
  const [errors, setErrors] = useState({});
  const [draft, setDraft] = useState(null);
  const [copyStatus, setCopyStatus] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const updateCaptcha = useCallback(token => { setCaptchaToken(token); if (token) setCaptchaError(""); }, []);
  const form = useRef(null);
  const draftHeading = useRef(null);

  function prepareMessage(event) {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    const invalid = Object.keys(nextErrors)[0];
    if (invalid) { form.current.elements.namedItem(invalid)?.focus(); return; }
    if (!captchaToken) {
      setCaptchaError("Please complete the CAPTCHA to continue.");
      document.getElementById("contact-captcha")?.focus();
      return;
    }
    setDraft(buildContactDraft(values));
    setCopyStatus("");
    requestAnimationFrame(() => draftHeading.current?.focus());
  }

  async function copyMessage() {
    try {
      await window.navigator.clipboard.writeText(draft.body);
      setCopyStatus("Message copied. Paste it into your email app to send.");
    } catch {
      setCopyStatus("Select and copy the message below, then email it to " + contactEmail + ".");
    }
  }

  function editMessage() {
    setDraft(null); setCopyStatus("");
    requestAnimationFrame(() => form.current?.elements.namedItem("fullName")?.focus());
  }

  return (
    <div className="contact-form-card">
      <div className="contact-form-heading">
        <span className="contact-form-icon"><Mail aria-hidden="true" /></span>
        <div><p className="contact-eyebrow">Get in touch</p><h3 className="contact-form-title">{draft ? "Ready to email" : "Your message"}</h3></div>
      </div>
      {draft ? (
        <div className="contact-draft">
          <h4 ref={draftHeading} tabIndex={-1} className="contact-draft-title">Review your message</h4>
          <p>To: <a href={`mailto:${draft.recipient}`}>{draft.recipient}</a></p>
          <pre className="contact-draft-body">{draft.body}</pre>
          <a className="contact-primary-button" href={draft.href}>Open email draft <ArrowUpRight aria-hidden="true" /></a>
          <p className="contact-form-note">Your email app opens with the message ready. Review it and press send there.</p>
          <div className="contact-draft-actions">
            <button type="button" onClick={editMessage}><ArrowLeft aria-hidden="true" />Edit message</button>
            <button type="button" onClick={copyMessage}>{copyStatus.startsWith("Message copied") ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}Copy message</button>
          </div>
          <p className="contact-copy-status" role="status">{copyStatus}</p>
        </div>
      ) : (
        <form ref={form} noValidate onSubmit={prepareMessage} aria-label="Contact Babco Foods">
          <p className="contact-form-note contact-required-note">All fields are required.</p>
          {Object.keys(errors).length > 0 && <p className="contact-form-error-summary" role="alert">Please check the highlighted fields.</p>}
          <div className="contact-fields">
            {contactFields.map(field => (
              <div className={`contact-field ${field.name === "message" ? "contact-field-wide" : ""}`} key={field.name}>
                <label htmlFor={`contact-${field.name}`}>{field.label}<span aria-hidden="true"> *</span></label>
                {field.name === "message" ? (
                  <textarea id={`contact-${field.name}`} name={field.name} rows={5} required maxLength={field.maxLength} placeholder={field.placeholder} value={values[field.name]} onChange={event => setValues(current => ({ ...current, [field.name]: event.target.value }))} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? `contact-${field.name}-error` : undefined} />
                ) : (
                  <input id={`contact-${field.name}`} name={field.name} type={field.type} autoComplete={field.autoComplete} required maxLength={field.maxLength} placeholder={field.placeholder} value={values[field.name]} onChange={event => setValues(current => ({ ...current, [field.name]: event.target.value }))} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? `contact-${field.name}-error` : undefined} />
                )}
                {errors[field.name] && <p id={`contact-${field.name}-error`} className="contact-field-error">{errors[field.name]}</p>}
              </div>
            ))}
          </div>
          <ContactCaptcha onChange={updateCaptcha} error={captchaError} />
          <p className="contact-form-note">We use your details to respond to your inquiry. <a href={contactPrivacyUrl} target="_blank" rel="noopener noreferrer">Privacy policy</a></p>
          <button type="submit" className="contact-primary-button">Prepare message <ArrowUpRight aria-hidden="true" /></button>
          <p className="contact-form-note contact-handoff-note">Next, open an email draft to {contactEmail} and send it from your email app.</p>
        </form>
      )}
    </div>
  );
}
