import { useEffect, useLayoutEffect, useRef } from "react";
import { matchPath, useLocation, useNavigationType } from "react-router";
import { notFoundMetadata, siteRoutes } from "./routeConfig.js";

function hashTarget(hash) {
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    // A malformed percent-encoded URL must not break navigation.
    return null;
  }
}

// BrowserRouter manages history; this handles metadata, focus and scrolling.
export default function RouteEffects() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef(new Map());
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    const metadata = siteRoutes.find(({ path }) => matchPath(path, location.pathname))
      ?? notFoundMetadata;
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", metadata.description);
  }, [location.pathname]);

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => { window.history.scrollRestoration = previous; };
  }, []);

  useLayoutEffect(() => {
    const key = location.key;
    const saved = positions.current.get(key);
    const changedPage = previousPath.current !== location.pathname;
    previousPath.current = location.pathname;
    let restored = false;
    let position = { x: window.scrollX, y: window.scrollY };
    const rememberPosition = () => {
      position = { x: window.scrollX, y: window.scrollY };
    };
    window.addEventListener("scroll", rememberPosition, { passive: true });

    // Wait for the destination's elements to mount before following its hash.
    const frame = requestAnimationFrame(() => {
      if (navigationType === "POP" && saved) {
        window.scrollTo({ left: saved.x, top: saved.y, behavior: "instant" });
      } else if (location.state?.preserveScroll && !changedPage) {
        // Switching a homepage brand tab should not move the viewport.
      } else {
        const target = location.hash ? hashTarget(location.hash) : null;
        if (target) target.scrollIntoView({ behavior: "instant" });
        else window.scrollTo({ left: 0, top: 0, behavior: "instant" });
      }
      rememberPosition();
      restored = true;
      if (changedPage) document.getElementById("main-content")?.focus({ preventScroll: true });
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", rememberPosition);
      if (restored) positions.current.set(key, position);
      // Bound memory for a very long browsing session.
      if (positions.current.size > 100) positions.current.delete(positions.current.keys().next().value);
    };
  }, [location.key, location.pathname, location.hash, location.state, navigationType]);

  return null;
}
