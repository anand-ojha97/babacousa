import Gallery from "../pages/Gallery.jsx";
import Home from "../pages/Home.jsx";
import WhoWeAre from "../pages/WhoWeAre.jsx";
import Operations from "../pages/Operations.jsx";
import BabcoStory from "../pages/BabcoStory.jsx";
import OurBrands from "../pages/OurBrands.jsx";
import OurBusiness from "../pages/OurBusiness.jsx";
import Innovation from "../pages/Innovation.jsx";
import OurPeople from "../pages/OurPeople.jsx";
import ContactUs from "../pages/ContactUs.jsx";

// Register page components and their browser metadata together.
export const siteRoutes = [
  {
    path: "/", Component: Home,
    title: "Babco Foods | Good. Authentic. Pure. Reach.",
    description: "Explore Babco Foods brands and our distribution network.",
  },
  {
    path: "/who-we-are/", Component: WhoWeAre,
    title: "Who We Are | Babco Foods",
    description: "Meet Babco Foods. Discover our story, vision, mission, and the operations moving authentic food forward since 2002.",
  },
  {
    path: "/operations/", Component: Operations,
    title: "Operations | Babco Foods",
    description: "Discover Babco Foods operations: dependable infrastructure, logistics innovation, smart sourcing, and strong supply-chain partnerships.",
  },
  {
    path: "/babco-story/", Component: BabcoStory,
    title: "Babco Story | Babco Foods",
    description: "Explore the Babco Foods story: moving food forward since 2002, nurturing positive change, and growing our distribution network across the United States.",
  },
  {
    path: "/our-brands/", Component: OurBrands,
    title: "Our Brands | Babco Foods",
    description: "Explore Babco Foods’ inhouse brands Anand, Adarsh, Meenu, and Ullasam, together with the partner brands in our food portfolio.",
  },
  {
    path: "/our-business/", Component: OurBusiness,
    title: "Our Business | Babco Foods",
    description: "Discover Babco Foods’ sales, warehousing, logistics, distribution, and commitment to food safety and quality.",
  },
  {
    path: "/innovation/", Component: Innovation,
    title: "Innovation | Babco Foods",
    description: "Explore Babco Foods’ approach to authentic product sourcing, graphics and packaging, U.S. standards, and technology shaping the future of food.",
  },
  {
    path: "/our-people/", Component: OurPeople,
    title: "Our People | Babco Foods",
    description: "Meet Robert (Bob) Vaz, Olivia Vaz, Ken Vaz and Jean Gerencser, and discover the family leadership and values behind Babco Foods.",
  },
  {
    path: "/contact-us/", Component: ContactUs,
    title: "Contact Us | Babco Foods",
    description: "Contact Babco Foods, prepare an inquiry, or find our distribution centers in New Jersey, Chicago, Dallas, San Francisco, and Atlanta.",
  },
  { path: "/gallery/", Component: Gallery, title: "Gallery | Babco Foods", description: "Explore Babco Foods brands, distribution, retail partnerships and shared food moments in our photo gallery." },
];

export const notFoundMetadata = {
  title: "Page Not Found | Babco Foods",
  description: "This page could not be found. Explore Babco Foods from our home page.",
};
