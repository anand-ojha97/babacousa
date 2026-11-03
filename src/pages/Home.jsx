import RichScenes from "../components/RichScenes.jsx";
import BrandShowcase from "../components/BrandShowcase.jsx";
import Distribution from "../components/Distribution.jsx";
import Locations from "../components/Locations.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";
import { useSearchParams } from "react-router";
import { brandCatalog } from "../data/brands.js";
import HomeBanner from "../components/HomeBanner.jsx";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedBrand = Number(searchParams.get("brand"));
  const brand = Number.isInteger(requestedBrand) && requestedBrand >= 0 && requestedBrand < brandCatalog.length
    ? requestedBrand : 0;

  function onBrandChange(index) {
    // URL state supports direct links without keeping a second copy in App.
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      next.set("brand", String(index));
      return next;
    }, { replace: true, state: { preserveScroll: true } });
  }
  return (
    <>
      <HomeBanner />
      <ScrollReveal>
        <RichScenes />
      </ScrollReveal>
      <ScrollReveal>
        <BrandShowcase brand={brand} onBrandChange={onBrandChange} />
      </ScrollReveal>
      <ScrollReveal>
        <Distribution />
      </ScrollReveal>
      <Locations />
    </>
  );
}
