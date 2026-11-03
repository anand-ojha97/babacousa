import BannerSlider from "./BannerSlider.jsx";
import { homeBanners } from "../data/homeBanners.js";

const slides = homeBanners.map(slide => ({ ...slide, src: `/images/home-banner/${slide.image}` }));

export default function HomeBanner() {
  return <BannerSlider id="home" title="Babco Foods — Good. Authentic. Pure. Reach." label="Babco Foods highlights" slides={slides} />;
}
