import { partnerBrands } from "./brandDirectory.js";
import { brandCatalog } from "./brands.js";

export const aboutLinks = [
  { label: "Who We Are", href: "/who-we-are/" },
  { label: "Babco Story", href: "/babco-story/" },
  { label: "Vision", href: "/who-we-are/#vision" },
  { label: "Mission", href: "/who-we-are/#mission" },
  { label: "Operations", href: "/operations/" },
];
export const navigation = [
  { label: "About us", href: "/who-we-are/", image: "/images/mega-menu/about-us.webp", imageAlt: "Warehouse staff handling an order", links: aboutLinks },
  { label: "Our Brands", href: "/our-brands/", image: "/images/mega-menu/our-brands.webp", imageAlt: "Overhead view of a busy distribution warehouse", links: [
    { label: "Inhouse Brands", href: "/our-brands/#inhouse-brands" },
    ...brandCatalog.map((brand, index) => ({ label: brand.name, href: "/#brands", brand: index, indent: true })),
    { label: "Partner Brands", href: "/our-brands/#partner-brands" },
  ] },
  { label: "Our Business", href: "/our-business/", image: "/images/mega-menu/our-business.webp", imageAlt: "A sales professional working on a laptop", links: [
    { label: "Sales", href: "/our-business/#sales" },
    { label: "Warehousing", href: "/our-business/#warehousing" },
    { label: "Logistics", href: "/our-business/#business-logistics" },
    { label: "Food Safety & Quality", href: "/our-business/#food-safety-quality" },
  ] },
  { label: "Innovation", href: "/innovation/", image: "/images/mega-menu/innovation.webp", imageAlt: "Robotic arms caring for fresh greens", links: [
    { label: "Product Sourcing", href: "/innovation/#product-sourcing" },
    { label: "Graphics & Packaging", href: "/innovation/#graphics-packaging" },
    { label: "The Future of Food", href: "/innovation/#future-food" },
  ] },
  { label: "Our People", href: "/our-people/", image: "/images/mega-menu/our-people.webp", imageAlt: "Four business professionals together", links: [
    { label: "Leadership", href: "/our-people/#leadership" },
    { label: "The Next Generation", href: "/our-people/#next-generation" },
    { label: "Family Values", href: "/our-people/#family-values" },
  ] },
  { label: "Gallery", href: "/gallery/", image: "/images/home-banner/babco-office-updated.webp", imageAlt: "Babco Foods office", links: [{ label: "Photo Gallery", href: "/gallery/" }] },
  { label: "Contact us", href: "/contact-us/", image: "/images/mega-menu/contact-us.webp", imageAlt: "BABCO distribution trucks", links: [
    { label: "Distribution locations", href: "/contact-us/#our-locations" },
    { label: "Write to us", href: "/contact-us/#write-to-us" },
  ] },
];
export const brands = brandCatalog.map(brand => brand.name);
export const footerBrands = [
  { name: "Anand", href: "https://anandusa.com/" },
  { name: "Meenu", href: "https://meenuseafood.com/" },
  { name: "Ullasam", href: "https://ullasam.com/" },
];
export const locations = [
  { name: "San Francisco, CA", x: 12.2, y: 43.8 },
  { name: "Chicago, IL", x: 63.7, y: 28.7 },
  { name: "South Plainfield, NJ", x: 83.2, y: 30.1 },
  { name: "Dallas, TX", x: 51.0, y: 68.6 },
  { name: "Atlanta, GA", x: 70.8, y: 63.5 },
];
export const searchItems = [
  { title: "Our People", detail: "Meet Babco Foods’ family leadership", href: "/our-people/" },
  { title: "Leadership", detail: "Robert (Bob), Olivia, Ken and Jean Vaz", href: "/our-people/#leadership" },
  { title: "Robert (Bob) Vaz", detail: "Partner & CEO", href: "/our-people/#robert-bob-vaz" },
  { title: "Olivia Vaz", detail: "Partner & CFO", href: "/our-people/#olivia-vaz" },
  { title: "The Next Generation", detail: "Raised across cultures. Rooted in all of them.", href: "/our-people/#next-generation" },
  { title: "Family Values", detail: "A family business - in more than name", href: "/our-people/#family-values" },
  { title: "Ken Vaz", detail: "Growth, product strategy and Southern Distribution Center", href: "/our-people/#ken-vaz" },
  { title: "Jean Gerencser", detail: "Operations, financial strategy and West Coast Distribution Center", href: "/our-people/#jean-vaz-gerencser" },
  { title: "Innovation", detail: "Product sourcing, packaging, and the future of food", href: "/innovation/" },
  { title: "Product Sourcing", detail: "Direct engagement with authentic regional producers", href: "/innovation/#product-sourcing" },
  { title: "Graphics & Packaging", detail: "Packaging design, FDA regulations, and U.S. standards", href: "/innovation/#graphics-packaging" },
  { title: "The Future of Food", detail: "Consumer-driven platforms, R&D, and sustainable packaging", href: "/innovation/#future-food" },
  { title: "Our Business", detail: "Sales, warehousing, logistics, food safety and quality", href: "/our-business/" },
  { title: "Sales", detail: "Customer relationships and retail coverage", href: "/our-business/#sales" },
  { title: "Warehousing", detail: "Sourcing, storage, and distribution", href: "/our-business/#warehousing" },
  { title: "Logistics", detail: "Inbound transportation through compliance and documentation", href: "/our-business/#business-logistics" },
  { title: "Food Safety & Quality", detail: "Quality standards across the supply chain", href: "/our-business/#food-safety-quality" },
  { title: "Our Brands", detail: "Inhouse brands and partner brands", href: "/our-brands/" },
  { title: "Inhouse Brands", detail: "Anand, Adarsh, Meenu, and Ullasam", href: "/our-brands/#inhouse-brands" },
  { title: "Partner Brands", detail: "Explore the Babco brand portfolio", href: "/our-brands/#partner-brands" },
  ...partnerBrands.filter(({ name }) => !brands.includes(name)).map(({ name, slug, category, origin }) => ({
    title: name,
    detail: origin ? `${category} · ${origin}` : category,
    href: `/our-brands/#brand-${slug}`,
  })),
  {
    title: "Who We Are",
    detail: "About Babco Foods · Moving food forward since 2002",
    href: "/who-we-are/",
  },
  ...aboutLinks.slice(1).map((link) => ({
    title: link.label,
    detail:
      link.label === "Operations"
        ? "Infrastructure, innovation, and sourcing"
        : "About Babco Foods",
    href: link.href,
  })),
  {
    title: "Our History",
    detail: "Babco Story · Milestones from 2002 to 2024",
    href: "/babco-story/#our-history",
  },
  {
    title: "Nurturing Positive Change",
    detail: "Babco Story · Our values and responsible growth",
    href: "/babco-story/#our-values",
  },
  {
    title: "Infrastructure That Delivers",
    detail: "Operations · Distribution centers and logistics",
    href: "/operations/#infrastructure",
  },
  {
    title: "Built to Innovate",
    detail: "Operations · Automation and cold-chain optimization",
    href: "/operations/#operations-innovation",
  },
  {
    title: "Smart Sourcing",
    detail: "Operations · Strong partnerships and product integrity",
    href: "/operations/#sourcing-partnerships",
  },
  ...brands.map((brand, i) => ({
    title: brand,
    detail: "Our brands",
    href: "/#brands",
    brand: i,
  })),
  {
    title: "Distribution",
    detail: "5 locations · 25+ worldwide suppliers · 250+ SKUs",
    href: "/#distribution",
  },
  {
    title: "Our locations",
    detail: "Distribution across 46 US states",
    href: "/#locations",
  },
  {
    title: "Contact us",
    detail: "Contact form, phone, email, and distribution centers",
    href: "/contact-us/",
  },
];

// A brand link always includes URL state, on any page (including Home).
export function navigationHref(link) {
  return typeof link.brand === "number"
    ? `/?brand=${link.brand}#brands`
    : link.href;
}
