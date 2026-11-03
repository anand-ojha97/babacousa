import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import FooterMarquee from "../components/FooterMarquee.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";
import RouteEffects from "../routes/RouteEffects.jsx";
import { connectPageReveals } from "../components/pageMotion.js";

// The layout stays mounted; React Router changes the page inside <Outlet />.
export default function SiteLayout() {
  const main = useRef(null);
  const { pathname } = useLocation();
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
        <ScrollReveal key={pathname}>
          <FooterMarquee />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
