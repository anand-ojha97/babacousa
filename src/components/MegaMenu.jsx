import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { navigationHref } from "../data/navigation.js";

// Shared layout; menu content and images live in navigation.js.
export default function MegaMenu({ item, index, open, onNavigate }) {
  return (
    <div id={`nav-menu-${index}`} className="mega-menu" hidden={!open} inert={!open}>
      <div className="mega-menu-feature">
        <h2 className={item.headerLabel ? "mega-menu-profile-title" : undefined}>
          {item.headerLabel ? item.label.split(" ").map((word, wordIndex, words) => (
            <span key={word}>{word}{wordIndex < words.length - 1 ? " " : ""}</span>
          )) : item.label}
        </h2>
        <span className="mega-menu-line" aria-hidden="true" style={item.headerLabel ? { top: "49%", height: "51%" } : undefined} />
        <Link className="mega-menu-page" to={item.href} onClick={onNavigate}>
          Go to Page <span className="sr-only">: {item.label}</span><ArrowUpRight aria-hidden="true" />
        </Link>
        <img src={item.image} alt={item.imageAlt} width="600" height="400" />
      </div>
      <nav className="mega-menu-links" aria-label={`${item.label} sections`}>
        {item.links.map(link => (
          <Link key={link.label} to={navigationHref(link)} className={link.indent ? "mega-menu-child" : ""} onClick={onNavigate}>
            {link.indent && <span aria-hidden="true">• </span>}{link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
