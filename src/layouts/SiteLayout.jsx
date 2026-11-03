import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import FooterMarquee from "../components/FooterMarquee.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";
import RouteEffects from "../routes/RouteEffects.jsx";
import { connectPageReveals } from "../components/pageMotion.js";

// Update this path if you replace the team photo later.
const teamImage = "/images/our-people/babco-team.webp";

function OurTeamSection() {
  return (
    <section
      id="our-team"
      aria-labelledby="our-team-title"
      className="relative bg-white px-[3.385417cqw] py-[2.5cqw] max-[640px]:px-4 max-[640px]:py-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[#f7f5f3]" aria-hidden="true" />
      <figure className="relative overflow-hidden rounded-[2.083333cqw] max-[1001px]:rounded-[26px]">
        <img
          src={teamImage}
          alt="Team members standing together in a food distribution warehouse"
          width="2528"
          height="1696"
          loading="lazy"
          decoding="async"
          className="block h-[34.375cqw] min-h-[360px] max-h-[660px] w-full object-cover object-top"
        />
        <figcaption className="flex min-h-[88px] items-center justify-center bg-linear-to-r from-babco-blue via-[#8696ff] to-babco-blue px-6 py-4 text-center text-white max-[640px]:min-h-[72px] max-[640px]:px-4 max-[640px]:py-3">
          <h2
            id="our-team-title"
            className="font-heading text-[clamp(30px,2.5cqw,48px)] font-black uppercase leading-[1.2] tracking-normal [font-kerning:normal] [font-synthesis:none]"
          >
            Our Team
          </h2>
        </figcaption>
      </figure>
    </section>
  );
}

// The layout stays mounted; React Router changes the page inside <Outlet />.
export default function SiteLayout() {
  const main = useRef(null);
  const { pathname } = useLocation();
  const isPeoplePage = pathname.replace(/\/+$/, "") === "/our-people";
  useEffect(() => connectPageReveals(main.current), [pathname]);

  return (
    <div className="site-layout relative w-full min-w-0 bg-white [container-type:inline-size]">
      <RouteEffects />
      <a
        href="#main-content"
        className="fixed -top-20 left-4 z-50 rounded-lg bg-white px-5 py-3 text-babco-red focus:top-3"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" ref={main} tabIndex={-1}>
        <Outlet />
        {isPeoplePage && <OurTeamSection />}
        <ScrollReveal key={pathname}>
          <FooterMarquee />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
