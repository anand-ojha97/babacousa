import { Link, useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Search, Menu, X } from "lucide-react";
import { navigation, navigationHref } from "../data/navigation.js";
import MegaMenu from "./MegaMenu.jsx";
import SearchDialog from "./SearchDialog.jsx";

const MOBILE_QUERY = "(max-width: 1100px), (max-height: 500px), (min-aspect-ratio: 7/2)";
// Header labels can differ from the page and footer labels.
const headerNavigation = navigation.map(item => ({ ...item, label: item.headerLabel || item.label }));

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const header = useRef(null);
  const mobileButton = useRef(null);
  const location = useLocation();

  function closeNavigation() { setDropdown(null); setMobileOpen(false); }
  function followLink() { closeNavigation(); setSearchOpen(false); }
  const toggleDropdown = index => setDropdown(current => current === index ? null : index);

  useEffect(() => { followLink(); }, [location]);

  // Reset stale navigation state when rotating / changing breakpoints.
  useEffect(() => {
    const viewport = window.matchMedia(MOBILE_QUERY);
    const reset = () => closeNavigation();
    viewport.addEventListener("change", reset);
    window.addEventListener("orientationchange", reset);
    return () => {
      viewport.removeEventListener("change", reset);
      window.removeEventListener("orientationchange", reset);
    };
  }, []);

  // Lock the background, while the menu can scroll independently.
  useEffect(() => {
    if (!mobileOpen) return;
    const style = document.documentElement.style;
    const previous = style.overflow;
    style.overflow = "hidden";
    return () => { style.overflow = previous; };
  }, [mobileOpen]);

  useEffect(() => {
    function outside(event) {
      if (!header.current?.contains(event.target)) closeNavigation();
    }
    function keydown(event) {
      if (event.key === "Escape") {
        if (mobileOpen) mobileButton.current?.focus();
        else header.current?.querySelector('.desktop-nav button[aria-expanded="true"]')?.focus();
        closeNavigation();
      }
      if (event.key === "Tab" && mobileOpen) {
        const elements = [...header.current.querySelectorAll('a[href],button:not([disabled])')]
          .filter(element => element.getClientRects().length && !element.closest('[hidden]'));
        const first = elements[0], last = elements.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", keydown);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", keydown);
    };
  }, [mobileOpen]);

  return (
    <>
      <div className="site-header-anchor relative z-40 h-0">
        {mobileOpen && <div className="mobile-menu-scrim" aria-hidden="true" onClick={closeNavigation} />}
        <header ref={header} className="site-header babco-header" data-menu-open={mobileOpen || dropdown !== null}>
          <a href="/" aria-label="Babco Foods home" className="header-logo" onClick={followLink}>
            <img src="/images/babco-logo.png" alt="BABCO Foods" width="964" height="336" />
          </a>
          <nav className="desktop-nav header-desktop" aria-label="Main navigation">
            {headerNavigation.map((item, index) => (
              <div key={item.label}>
                <button type="button" aria-expanded={dropdown === index} aria-controls={`nav-menu-${index}`} onClick={() => toggleDropdown(index)}>
                  {item.label}<ChevronDown aria-hidden="true" />
                </button>
                <MegaMenu item={item} index={index} open={dropdown === index} onNavigate={followLink} />
              </div>
            ))}
          </nav>
          <div className="header-actions">
            <button type="button" className="header-icon" aria-label="Search this site" onClick={() => { closeNavigation(); setSearchOpen(true); }}><Search aria-hidden="true" /></button>
            <button ref={mobileButton} type="button" className="header-icon mobile-menu-button" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => { setMobileOpen(current => !current); setDropdown(null); }}>
              {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
          <nav id="mobile-navigation" className="mobile-nav header-mobile" aria-label="Mobile navigation" hidden={!mobileOpen} inert={!mobileOpen}>
            {headerNavigation.map((item, index) => (
              <div className="mobile-nav-group" key={item.label}>
                <button type="button" aria-expanded={dropdown === index} aria-controls={`mobile-submenu-${index}`} onClick={() => toggleDropdown(index)}>
                  {item.label}<ChevronDown aria-hidden="true" />
                </button>
                <div id={`mobile-submenu-${index}`} className="mobile-submenu" hidden={dropdown !== index} inert={dropdown !== index}>
                  <Link to={item.href} className="mobile-menu-feature" onClick={followLink}>
                    <span>Go to {item.label}<ArrowUpRight aria-hidden="true" /></span>
                    <img src={item.image} alt={item.imageAlt} width="150" height="100" />
                  </Link>
                  {item.links.map(link => <Link key={link.label} to={navigationHref(link)} className={link.indent ? "mobile-menu-child" : ""} onClick={followLink}>{link.label}<ArrowUpRight aria-hidden="true" /></Link>)}
                </div>
              </div>
            ))}
          </nav>
        </header>
      </div>
      {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} onNavigate={followLink} />}
    </>
  );
}
