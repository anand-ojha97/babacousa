// Location details and form fields from https://babcofoods.com/contact-us/.
// Support email is published at https://babcofoods.com/privacy-policy/.
export const contactEmail = "support@babcofoods.com";
export const contactPrivacyUrl = "https://babcofoods.com/privacy-policy/";
export const contactPhone = "+1-866-216-9619";
export const contactFax = "+1-732-667-7578";

export const contactOffices = [
  {
    id: "new-jersey", city: "New Jersey", region: "Headquarters & East Coast",
    image: {
      src: "/images/home-banner/babco-office-updated.webp",
      alt: "Babco Foods headquarters at 238 Saint Nicholas Ave, South Plainfield, New Jersey",
      width: 1920, height: 1080,
    },
    map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1848142.1162240724!2d-76.61464707979108!3d40.4676561536674!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3b83ceb12f755%3A0x72368b4c8e8ce4c3!2s238%20St%20Nicholas%20Ave%2C%20South%20Plainfield%2C%20NJ%2007080%2C%20USA!5e0!3m2!1sen!2sin!4v1633242156930!5m2!1sen!2sin",
    title: "Headquarters & East Coast Distribution Center",
    address: "238 Saint Nicholas Ave", cityStateZip: "South Plainfield, NJ 07080, USA", phone: contactPhone,
  },
  {
    id: "chicago", city: "Chicago, IL", region: "US Midwest",
    mapImage: "/images/contact-maps/chicago-map.svg",
    map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d763679.5017775409!2d-88.63989640712171!3d41.609850655055794!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xfa6cfba0ba1a939a!2sBabco%20Foods%20International!5e0!3m2!1sen!2sin!4v1633242023802!5m2!1sen!2sin",
    title: "US Midwest Distribution Center",
    address: "215 S Fairbank St", cityStateZip: "Addison, IL 60101, USA", phone: contactPhone,
  },
  {
    id: "dallas", city: "Dallas, TX", region: "Southern US",
    mapImage: "/images/contact-maps/dallas-map.svg",
    map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d735139.5664927831!2d-97.15424587743948!3d32.90786569136233!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x48433f1bcd9e19a4!2sBabco%20Foods%20International!5e0!3m2!1sen!2sin!4v1633241647903!5m2!1sen!2sin",
    title: "Southern US Distribution Center",
    address: "151 Regal Row #233", cityStateZip: "Dallas, TX 75247, USA", phone: "+1-469-404-1893",
  },
  {
    id: "san-francisco", city: "San Francisco, CA", region: "West Coast",
    mapImage: "/images/contact-maps/san-francisco-map.svg",
    map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1441967.9732066768!2d-121.60800422688666!3d37.2890098711269!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc8c0b234a797ef96!2sBabco%20Foods%20International!5e0!3m2!1sen!2sin!4v1633241810675!5m2!1sen!2sin",
    title: "West Coast Distribution Center",
    address: "1674 Delta Ct", cityStateZip: "Hayward, CA 94544, USA", phone: contactPhone,
  },
  {
    id: "atlanta", city: "Atlanta, GA", region: "Southeast US",
    mapImage: "/images/contact-maps/atlanta-map.svg",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.3634337362314!2d-84.10628312571913!3d33.95749709121645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5a32de3b69039%3A0x9efa5fba1246e477!2s1750%20Breckinridge%20Pkwy%20%23450%2C%20Duluth%2C%20GA%2030096%2C%20USA!5e0!3m2!1sen!2sin!4v1728899895672!5m2!1sen!2sin",
    title: "Southeast US Distribution Center",
    address: "1750 Breckenridge Pkwy #450", cityStateZip: "Duluth, GA 30096, USA", phone: contactPhone,
  },
];

export const contactFields = [
  { name: "fullName", label: "Full name", type: "text", autoComplete: "name", maxLength: 100, placeholder: "Your full name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email", maxLength: 254, placeholder: "you@example.com" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", maxLength: 40, placeholder: "+1 866 216 9619" },
  { name: "message", label: "Message", maxLength: 2000, placeholder: "Type your message here..." },
];

export function phoneHref(phone) { return `tel:${phone.replace(/[^+\d]/g, "")}`; }
export function directionsHref(office) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${office.address}, ${office.cityStateZip}`)}`;
}
