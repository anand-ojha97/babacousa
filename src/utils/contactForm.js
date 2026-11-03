import { contactEmail } from "../data/contact.js";

export const emptyContact = { fullName: "", email: "", phone: "", message: "" };

export function validateContact(values) {
  const errors = {};
  if (!values.fullName.trim()) errors.fullName = "Please enter your full name.";
  else if (/[\r\n]/.test(values.fullName)) errors.fullName = "Please enter your name on one line.";
  else if (values.fullName.length > 100) errors.fullName = "Please keep your name within 100 characters.";
  if (values.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  const digits = values.phone.replace(/\D/g, "");
  if (values.phone.length > 40 || !/^\+?[\d\s().-]+$/.test(values.phone.trim()) || digits.length < 7 || digits.length > 20) errors.phone = "Please enter a valid phone number, including the area code.";
  if (!values.message.trim()) errors.message = "Please enter your message.";
  else if (values.message.length > 2000) errors.message = "Please keep your message within 2,000 characters.";
  return errors;
}

export function buildContactDraft(values) {
  const body = [
    `Full name: ${values.fullName.trim()}`,
    `Email: ${values.email.trim()}`,
    `Phone: ${values.phone.trim()}`,
    "", "Message:", values.message.trim(),
  ].join("\n");
  const subject = "Website inquiry | Babco Foods";
  return {
    recipient: contactEmail, subject, body,
    href: `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}
