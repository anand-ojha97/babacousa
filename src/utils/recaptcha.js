// Google's public reCAPTCHA v2 test key. It deliberately provides no bot protection.
// https://developers.google.com/recaptcha/docs/faq
export const recaptchaTestSiteKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
export const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY?.trim() || recaptchaTestSiteKey;
export const recaptchaIsTest = recaptchaSiteKey === recaptchaTestSiteKey;

let apiPromise;
export function loadRecaptcha() {
  if (window.grecaptcha?.render) return Promise.resolve(window.grecaptcha);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const callbackName = "babcoRecaptchaReady";
    const finish = () => { window.clearTimeout(timeout); delete window[callbackName]; };
    const fail = () => {
      finish(); script.remove(); apiPromise = undefined;
      reject(new Error("CAPTCHA could not load. Please retry or contact us by email."));
    };
    window[callbackName] = () => { finish(); resolve(window.grecaptcha); };
    const timeout = window.setTimeout(fail, 15000);
    script.src = `https://www.google.com/recaptcha/api.js?onload=${callbackName}&render=explicit`;
    script.async = true;
    script.defer = true;
    script.onerror = fail;
    document.head.appendChild(script);
  });
  return apiPromise;
}
