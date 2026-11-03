import { useEffect, useRef, useState } from "react";
import { loadRecaptcha, recaptchaIsTest, recaptchaSiteKey } from "../utils/recaptcha.js";

export default function ContactCaptcha({ onChange, error }) {
  const host = useRef(null);
  const widget = useRef(null);
  const [size, setSize] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState("Loading CAPTCHA…");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const measure = () => setSize(host.current.clientWidth < 304 ? "compact" : "normal");
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!size) return;
    let active = true;
    let api;
    let id;
    onChange(""); setFailed(false); setStatus("Loading CAPTCHA…");
    loadRecaptcha().then(loaded => {
      if (!active) return;
      api = loaded;
      id = api.render(widget.current, {
        sitekey: recaptchaSiteKey, size, theme: "light",
        callback: token => { if (active) { onChange(token); setStatus("CAPTCHA completed."); } },
        "expired-callback": () => { if (active) { onChange(""); setStatus("CAPTCHA expired. Please complete it again."); } },
        "error-callback": () => { if (active) { onChange(""); setFailed(true); setStatus("CAPTCHA is unavailable. Please retry or contact us by email."); } },
      });
      setStatus("");
    }).catch(() => {
      if (active) { setFailed(true); setStatus("CAPTCHA could not load. Please retry or contact us by email."); }
    });
    const element = widget.current;
    return () => {
      active = false;
      if (api && id !== undefined) api.reset(id);
      element.replaceChildren();
    };
  }, [size, attempt, onChange]);

  return (
    <div id="contact-captcha" className="contact-captcha" ref={host} tabIndex={-1} role="group" aria-label="CAPTCHA verification" aria-describedby="contact-captcha-note contact-captcha-status">
      <div ref={widget} />
      <p id="contact-captcha-note" className="contact-form-note">{recaptchaIsTest ? "CAPTCHA test mode — verification is for preview only." : "Please complete the CAPTCHA before preparing your message."}</p>
      <p id="contact-captcha-status" className="contact-form-note" role="status">{status}</p>
      {failed && <button className="contact-captcha-retry" type="button" onClick={() => setAttempt(value => value + 1)}>Retry CAPTCHA</button>}
      {error && <p className="contact-field-error" role="alert">{error}</p>}
    </div>
  );
}
