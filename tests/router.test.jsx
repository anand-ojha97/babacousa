import { test, after } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { JSDOM } from "jsdom";
import { StrictMode, act } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BrowserRouter, MemoryRouter, matchRoutes } from "react-router";
import App from "../src/App.jsx";
import { siteRoutes } from "../src/routes/routeConfig.js";
import { contactOffices, contactEmail } from "../src/data/contact.js";
import { buildContactDraft, emptyContact, validateContact } from "../src/utils/contactForm.js";
import { recaptchaTestSiteKey, recaptchaSiteKey } from "../src/utils/recaptcha.js";
import { founders, leadership, familyValues } from "../src/data/people.js";
import InteractiveDistributionMap from "../src/components/InteractiveDistributionMap.jsx";
import HomeBanner from "../src/components/HomeBanner.jsx";
import RichScenes from "../src/components/RichScenes.jsx";
import { aboutCapabilities } from "../src/data/aboutPage.js";
import { galleryPhotos } from "../src/data/gallery.js";
import { brandCatalog } from "../src/data/brands.js";

const dom = new JSDOM(
  '<!doctype html><html><head><meta name="description" content=""></head><body><div id="root"></div></body></html>',
  { url: "https://babco.test/", pretendToBeVisual: true },
);
const { window } = dom;
Object.assign(globalThis, {
  window, document: window.document, HTMLElement: window.HTMLElement,
  Image: window.Image, MutationObserver: window.MutationObserver,
  IS_REACT_ACT_ENVIRONMENT: true,
});
// Import the client renderer after installing the DOM, so feature detection
// uses this DOM rather than selecting React's legacy input-event fallback.
const { createRoot } = await import("react-dom/client");
const domErrors = [];
window.addEventListener("error", (event) => domErrors.push(event.error));
const frames = new Map();
let frameId = 0;
window.requestAnimationFrame = (callback) => { frames.set(++frameId, callback); return frameId; };
window.cancelAnimationFrame = (id) => frames.delete(id);
globalThis.requestAnimationFrame = window.requestAnimationFrame;
globalThis.cancelAnimationFrame = window.cancelAnimationFrame;
let viewportWidth = 1440;
const mediaQueries = new Map();
window.matchMedia = (media) => {
  if (!mediaQueries.has(media)) {
    const listeners = new Set();
    const query = { matches: media.includes("prefers-reduced-motion") || (media.includes("max-width: 1100px") && viewportWidth <= 1100), media,
      addEventListener(type, listener) { if (type === "change") listeners.add(listener); },
      removeEventListener(type, listener) { if (type === "change") listeners.delete(listener); }, listeners };
    mediaQueries.set(media, query);
  }
  return mediaQueries.get(media);
};
async function resizeViewport(width) {
  viewportWidth = width;
  await act(async () => {
    for (const query of mediaQueries.values()) {
      if (!query.media.includes("max-width: 1100px")) continue;
      const next = width <= 1100;
      if (query.matches !== next) {
        query.matches = next;
        for (const listener of query.listeners) listener({ matches: next, media: query.media });
      }
    }
    window.dispatchEvent(new window.Event("resize"));
  });
  await flushFrames();
}
class Observer {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = globalThis.IntersectionObserver = Observer;
window.ResizeObserver = globalThis.ResizeObserver = Observer;
// Simulate only Google's API boundary; no challenge or network request runs in jsdom.
const captchaWidgets = [];
const captchaResets = [];
window.grecaptcha = {
  render(element, options) { captchaWidgets.push(options); return captchaWidgets.length - 1; },
  reset(id) { captchaResets.push(id); },
};
window.HTMLMediaElement.prototype.pause = function () {};
window.HTMLMediaElement.prototype.load = function () {};
window.HTMLMediaElement.prototype.play = function () { return Promise.resolve(); };
let scrollCalls = [];
let hashCalls = [];
window.scrollTo = ({ left = 0, top = 0 }) => {
  scrollCalls.push({ x: left, y: top });
  Object.defineProperty(window, "scrollX", { configurable: true, value: left });
  Object.defineProperty(window, "scrollY", { configurable: true, value: top });
  window.dispatchEvent(new window.Event("scroll"));
};
window.HTMLElement.prototype.scrollIntoView = function () {
  hashCalls.push(this.id);
  window.scrollTo({ top: 900 });
};
after(() => {
  dom.window.close();
  assert.deepEqual(domErrors, [], "No uncaught DOM event errors");
});

async function flushFrames() {
  for (let pass = 0; frames.size && pass < 8; pass++) {
    const pending = [...frames.values()];
    frames.clear();
    await act(async () => { pending.forEach((callback) => callback(performance.now())); });
  }
}
async function mount(url) {
  window.history.replaceState(null, "", url);
  window.scrollTo({ top: 0 });
  scrollCalls = []; hashCalls = [];
  const root = createRoot(document.getElementById("root"));
  await act(async () => {
    root.render(<StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>);
  });
  await flushFrames();
  return async () => { await act(async () => root.unmount()); frames.clear(); };
}
async function click(element) {
  assert.ok(element, "The expected interactive element exists");
  await act(async () => {
    element.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }));
  });
  await flushFrames();
}
async function historyMove(direction) {
  await act(async () => {
    await new Promise((done, reject) => {
      const timer = setTimeout(() => reject(new Error("History navigation did not complete")), 1000);
      window.addEventListener("popstate", () => { clearTimeout(timer); done(); }, { once: true });
      window.history.go(direction);
    });
  });
  await flushFrames();
}
const selectedBrand = () => document.querySelector('[role="tab"][aria-selected="true"]')?.textContent;
const footerLink = (href) => document.querySelector('footer nav[aria-label="Footer navigation"] a[href="' + href + '"]');

async function fillControl(element, value) {
  const prototype = element.tagName === "TEXTAREA" ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
  await act(async () => {
    Object.getOwnPropertyDescriptor(prototype, "value").set.call(element, value);
    element.dispatchEvent(new window.Event("input", { bubbles: true }));
  });
}

test("all routes render, all referenced assets exist, and internal links resolve", () => {
  const pages = new Map();
  for (const { path } of siteRoutes) {
    const html = renderToStaticMarkup(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);
    const document = new JSDOM(html).window.document;
    assert.equal(document.querySelectorAll("header").length, 1, path);
    assert.equal(document.querySelectorAll("footer").length, 1, path);
    assert.equal(document.querySelectorAll("main h1").length, 1, path);
    assert.ok(!document.querySelector("main h1").textContent.includes("Page not found"), path);
    for (const element of document.querySelectorAll("[src], [poster]")) {
      for (const attr of ["src", "poster"]) {
        const url = element.getAttribute(attr);
        if (url?.startsWith("/")) assert.ok(existsSync(resolve("public", url.slice(1))), path + ": " + url);
      }
    }
    pages.set(path, document);
  }
  for (const [path, document] of pages) {
    for (const anchor of document.querySelectorAll("a[href]")) {
      const url = new URL(anchor.getAttribute("href"), "https://babco.test" + path);
      if (url.origin !== "https://babco.test") continue;
      assert.ok(matchRoutes(siteRoutes, url.pathname), path + ": route " + url.pathname);
      if (url.hash) {
        const targetPage = pages.get(url.pathname);
        assert.ok(targetPage?.getElementById(decodeURIComponent(url.hash.slice(1))), path + ": hash " + url.href);
      }
    }
  }
  for (const match of readFileSync("src/index.css", "utf8").matchAll(/url\(["']?(\/[^)"']+)/g)) {
    assert.ok(existsSync(resolve("public", match[1].slice(1))), "CSS asset: " + match[1]);
  }
});

test("Gallery renders the editable image list without captions or duplicate photos", async () => {
  const cleanup = await mount("/gallery/");
  try {
    const gallery = document.querySelector('section[aria-label="Babco photo gallery"]');
    const figures = [...gallery.querySelectorAll("figure")];
    assert.equal(figures.length, galleryPhotos.length);
    assert.equal(gallery.querySelector("figcaption"), null);
    assert.equal(new Set(galleryPhotos.map(photo => photo.src)).size, galleryPhotos.length);
    for (const [index, figure] of figures.entries()) {
      const image = figure.querySelector("img");
      const photo = galleryPhotos[index];
      assert.equal(figure.textContent.trim(), "");
      assert.equal(image.getAttribute("src"), photo.src);
      assert.equal(image.alt, photo.alt);
      assert.ok(image.alt.trim().length > 0, "Provide image alt text");
      assert.ok(image.width > 0 && image.height > 0, "Provide original image dimensions");
      assert.ok(existsSync(resolve("public", photo.src.slice(1))));
    }
    const brands = galleryPhotos.map(photo => photo.brand);
    const firstUllasam = brands.indexOf("ullasam");
    assert.ok(firstUllasam === -1 || !brands.slice(firstUllasam).includes("anand"), "Keep Anand before Ullasam");
  } finally { await cleanup(); }
});

test("Every editable brand category has a unique id and valid local media", () => {
  const ids = new Set();
  for (const brand of brandCatalog) {
    assert.ok(brand.name.trim());
    for (const category of brand.categories) {
      assert.ok(category.id && !ids.has(category.id), "Use a unique category id: " + category.id);
      ids.add(category.id);
      assert.ok(category.label.trim());
      for (const media of [category.poster, category.video].filter(Boolean)) {
        assert.ok(media.startsWith("/"), "Use a public asset path: " + media);
        assert.ok(existsSync(resolve("public", media.slice(1))), "Missing category media: " + media);
      }
      assert.ok(category.poster, "Provide a poster, including for video categories");
    }
  }
});

test("A newly added brand and image-only categories work without label files or fixed tab limits", async () => {
  const index = brandCatalog.length;
  brandCatalog.push({ name: "Local Test Brand", categories: [
    { id: "local-test-rice", label: "Rice & Grains", poster: "/products/ullasam-rice-white.webp" },
    { id: "local-test-new", label: "New Category", poster: "/products/ullasam-rice-white.webp" },
  ] });
  let cleanup;
  try {
    cleanup = await mount("/?brand=" + index + "#brands");
    assert.equal(selectedBrand(), "Local Test Brand");
    const section = document.getElementById("brands");
    assert.equal(section.querySelectorAll('[role="tab"]').length, brandCatalog.length);
    assert.equal(section.querySelector('img[src^="/categories/"]'), null);
    assert.ok([...section.querySelectorAll("svg text")].some(text => text.textContent.replaceAll(" ", "") === "NewCategory"));
    assert.equal(section.querySelector('[aria-roledescription="slide"]').getAttribute("aria-label"), "1 of 2: Rice & Grains");
    assert.equal(section.querySelector('[data-media-state="image"] video'), null);
    await click(section.querySelector('button[aria-label="Next Local Test Brand category"]'));
    assert.equal(section.querySelector('[aria-roledescription="slide"]').getAttribute("aria-label"), "2 of 2: New Category");
    await click(section.querySelector('button[aria-label="Next Local Test Brand category"]'));
    assert.equal(section.querySelector('[aria-roledescription="slide"]').getAttribute("aria-label"), "1 of 2: Rice & Grains");
  } finally {
    if (cleanup) await cleanup();
    brandCatalog.pop();
  }
});

test("client-side navigation retains the shared layout and updates page metadata", async () => {
  const cleanup = await mount("/");
  try {
    const header = document.querySelector("header");
    for (const route of siteRoutes.slice(1)) {
      await click(footerLink(route.path) ?? document.querySelector('a[href="' + route.path + '"]'));
      assert.equal(window.location.pathname, route.path);
      assert.equal(document.querySelector("header"), header, "Header is retained without a document reload");
      assert.equal(document.title, route.title);
      assert.equal(document.querySelector('meta[name="description"]').content, route.description);
      assert.equal(document.activeElement.id, "main-content");
      assert.equal(window.scrollY, 0);
    }
  } finally { await cleanup(); }
});

test("Explore brands, brand deep links, tab URLs and Back/Forward work together", async () => {
  const cleanup = await mount("/");
  try {
    await click([...document.querySelectorAll("main a")].find((a) => /Explore our Brands/.test(a.textContent)));
    assert.equal(window.location.pathname, "/our-brands/");
    await click(document.querySelector('main a[href="/?brand=2#brands"]'));
    assert.equal(selectedBrand(), "Meenu");
    assert.equal(window.location.search, "?brand=2");
    assert.equal(hashCalls.at(-1), "brands");
    window.scrollTo({ top: 1400 });
    scrollCalls = [];
    await click(document.getElementById("brand-tab-3"));
    assert.equal(selectedBrand(), "Ullasam");
    assert.equal(window.location.search, "?brand=3");
    assert.equal(window.scrollY, 1400);
    assert.equal(scrollCalls.length, 0, "Tab selection preserves the viewport");
    await historyMove(-1);
    assert.equal(window.location.pathname, "/our-brands/");
    await historyMove(1);
    assert.equal(selectedBrand(), "Ullasam");
    assert.equal(window.scrollY, 1400, "Forward restores the remembered scroll position");
  } finally { await cleanup(); }
});

test("initial hash URLs work in StrictMode and invalid brand values fall back safely", async () => {
  for (const query of ["2", "3", "bad", "-1", "99", "1.5"]) {
    const cleanup = await mount("/?brand=" + query + "#brands");
    try {
      assert.equal(selectedBrand(), query === "2" ? "Meenu" : query === "3" ? "Ullasam" : "Anand");
      assert.equal(hashCalls.at(-1), "brands", "Initial hash is followed, even with StrictMode effect cleanup");
    } finally { await cleanup(); }
  }
});

test("section links, menu dismissal, search navigation and non-sticky header survive route changes", async () => {
  const cleanup = await mount("/who-we-are/");
  try {
    const header = document.querySelector("header");
    await click(header.querySelector(".desktop-nav button"));
    assert.equal(header.querySelector(".desktop-nav button").getAttribute("aria-expanded"), "true");
    await click(document.querySelector('#nav-menu-0 a[href="/who-we-are/#vision"]'));
    assert.equal(hashCalls.at(-1), "vision");
    assert.equal(header.querySelector(".desktop-nav button").getAttribute("aria-expanded"), "false");
    await click(header.querySelector('button[aria-label="Open navigation"]'));
    await click(document.querySelectorAll("#mobile-navigation .mobile-nav-group > button")[3]);
    await click(document.querySelector('#mobile-navigation a[href="/innovation/"]'));
    assert.equal(window.location.pathname, "/innovation/");
    assert.equal(header.querySelector(".mobile-menu-button").getAttribute("aria-expanded"), "false");
    await click(header.querySelector('button[aria-label="Search this site"]'));
    assert.ok(document.querySelector('[role="dialog"]'));
    const result = [...document.querySelectorAll('[role="dialog"] a')].find((a) => a.textContent.includes("Leadership"));
    await click(result);
    assert.equal(window.location.pathname, "/our-people/");
    assert.equal(hashCalls.at(-1), "leadership");
    assert.equal(document.querySelector('[role="dialog"]'), null);
    assert.equal(document.body.style.overflow, "");
    window.scrollTo({ top: 200 });
    await flushFrames();
    assert.equal(header.dataset.sticky, undefined);
    assert.ok(!header.parentElement.classList.contains("sticky"));
    await click(footerLink("/our-business/"));
    await flushFrames();
    assert.equal(header.dataset.sticky, undefined);
  } finally { await cleanup(); }
});

test("legacy HTML URLs preserve query/hash and unknown URLs show a 404", async () => {
  let cleanup = await mount("/who-we-are/index.html?source=old#mission");
  try {
    assert.equal(window.location.pathname, "/who-we-are/");
    assert.equal(window.location.search, "?source=old");
    assert.equal(window.location.hash, "#mission");
    assert.equal(hashCalls.at(-1), "mission");
  } finally { await cleanup(); }
  cleanup = await mount("/missing-page/");
  try {
    assert.match(document.querySelector("main h1").textContent, /Page not found/);
    await click(document.querySelector('main a[href="/"]'));
    assert.equal(window.location.pathname, "/");
    assert.ok(document.getElementById("home"));
  } finally { await cleanup(); }
});


test("every mega menu opens, touch accordions reopen after navigation and resize, and closed panels cannot intercept taps", async () => {
  await resizeViewport(390);
  const cleanup = await mount("/");
  try {
    const toggle = document.querySelector(".mobile-menu-button");
    const mobile = document.getElementById("mobile-navigation");
    assert.equal(mobile.hidden, true);
    await click(toggle);
    assert.equal(mobile.hidden, false);
    assert.equal(document.documentElement.style.overflow, "hidden");
    const groups = [...mobile.querySelectorAll(".mobile-nav-group > button")];
    for (const [index, button] of groups.entries()) {
      await click(button);
      assert.equal(button.getAttribute("aria-expanded"), "true");
      assert.equal(document.getElementById("mobile-submenu-" + index).hidden, false);
      assert.equal(mobile.querySelectorAll(".mobile-submenu:not([hidden])").length, 1);
      await click(button);
      assert.equal(document.getElementById("mobile-submenu-" + index).hidden, true);
    }
    await click(groups[1]);
    await click(mobile.querySelector('a[href="/our-brands/#partner-brands"]'));
    assert.equal(window.location.pathname, "/our-brands/");
    assert.equal(hashCalls.at(-1), "partner-brands");
    assert.equal(mobile.hidden, true);
    assert.equal(document.documentElement.style.overflow, "");
    window.scrollTo({top: 1800}); await flushFrames();
    await click(toggle); await click(groups[4]);
    assert.equal(document.getElementById("mobile-submenu-4").hidden, false);
    await act(async () => document.dispatchEvent(new window.KeyboardEvent("keydown", {key: "Escape", bubbles: true})));
    assert.equal(mobile.hidden, true);
    assert.equal(document.activeElement, toggle);
    await click(toggle);
    await resizeViewport(1440);
    assert.equal(mobile.hidden, true);
    assert.equal(document.documentElement.style.overflow, "");
    for (const [index, button] of [...document.querySelectorAll(".desktop-nav > div > button")].entries()) {
      await click(button);
      assert.equal(document.getElementById("nav-menu-" + index).hidden, false);
      assert.equal(document.querySelectorAll(".mega-menu:not([hidden])").length, 1);
    }
    await act(async () => document.querySelector("main").dispatchEvent(new window.Event("pointerdown", {bubbles: true})));
    assert.equal(document.querySelectorAll(".mega-menu:not([hidden])").length, 0);
    await resizeViewport(1024); await click(toggle); await click(groups[2]);
    assert.equal(document.getElementById("mobile-submenu-2").hidden, false);
    await click(toggle);
    assert.equal(document.documentElement.style.overflow, "");
  } finally { await cleanup(); await resizeViewport(1440); }
});


test("About page presents all operation capabilities together in the approved order", async () => {
  const cleanup = await mount("/who-we-are/");
  try {
    const mission = document.getElementById("mission");
    assert.match(mission.textContent, /We Spread Joy/);
    assert.equal(mission.querySelectorAll("figure img").length, 4);
    assert.match(document.querySelector('#babco-story img').getAttribute('src'), /founders-bob-olivia/);
    assert.match(document.getElementById("babco-story").textContent, /underserved or unserved/);
    const operation = document.getElementById("operation");
    const cards = [...operation.querySelectorAll(".capability-card")];
    assert.deepEqual(cards.map(card => card.querySelector("h4").textContent), [
      "Import & Supply", "Sales & Distribution", "Build Brands & Products",
    ]);
    assert.equal(new Set(cards.map(card => card.querySelector("img").getAttribute("src"))).size, 3);
    assert.equal(operation.querySelectorAll("button, [aria-roledescription=carousel]").length, 0);
    cards.forEach((card, index) => {
      assert.equal(card.querySelector("p").textContent, aboutCapabilities[index].text);
      assert.equal(card.querySelector("img").alt, aboutCapabilities[index].image.alt);
    });
  } finally { await cleanup(); }
});

test("home banners support selection, wraparound, keyboard navigation and horizontal swipes", async () => {
  const cleanup = await mount("/");
  try {
    const banner = document.getElementById("home");
    const active = () => banner.querySelector('[data-active="true"]').getAttribute("aria-label");
    assert.match(active(), /1 of 4: Babco office/);
    assert.equal(banner.querySelectorAll('img').length, 4);
    assert.equal(new Set([...banner.querySelectorAll('img')].map(image => image.src)).size, 4);
    await click(banner.querySelector('[aria-label="Show Ullasam products banner"]'));
    assert.match(active(), /4 of 4: Ullasam products/);
    await click(banner.querySelector('[aria-label="Show Babco distribution banner"]'));
    assert.match(active(), /2 of 4: Babco distribution/);
    await click(banner.querySelector('[aria-label="Show Anand products banner"]'));
    assert.match(active(), /3 of 4: Anand products/);
    assert.equal(banner.querySelector('[aria-label="Show Anand products banner"]').getAttribute("aria-pressed"), "true");
    for (const [key, expected] of [["ArrowRight", "4 of 4"], ["ArrowLeft", "3 of 4"], ["Home", "1 of 4"], ["End", "4 of 4"]]) {
      await act(async () => banner.dispatchEvent(new window.KeyboardEvent("keydown", { key, bubbles: true })));
      assert.ok(active().startsWith(expected));
    }
    async function touch(type, x, y) {
      const event = new window.Event(type, { bubbles: true });
      Object.defineProperty(event, type === "touchend" ? "changedTouches" : "touches", { value: [{ clientX: x, clientY: y }] });
      await act(async () => banner.querySelector("img").dispatchEvent(event));
    }
    await touch("touchstart", 220, 100); await touch("touchend", 100, 110);
    assert.match(active(), /1 of 4/, "A left swipe advances and wraps");
    await touch("touchstart", 100, 100); await touch("touchend", 220, 110);
    assert.match(active(), /4 of 4/, "A right swipe returns to the previous banner");
    await touch("touchstart", 100, 100); await touch("touchend", 110, 240);
    assert.match(active(), /4 of 4/, "Vertical scrolling leaves the banner unchanged");
    await touch("touchstart", 220, 100);
    await act(async () => banner.dispatchEvent(new window.Event("touchcancel", { bubbles: true })));
    await touch("touchend", 100, 100);
    assert.match(active(), /4 of 4/, "Cancelled gestures leave the banner unchanged");
    assert.equal(banner.querySelector('.home-banner-play'), null, "Reduced motion disables autoplay");
  } finally { await cleanup(); }
});

test("home banner autoplay advances and cancels its timer for pause, focus, hidden tabs and unmount", async () => {
  const originalObserver = globalThis.IntersectionObserver;
  const originalTimeout = window.setTimeout;
  const originalClear = window.clearTimeout;
  const visibilityDescriptor = Object.getOwnPropertyDescriptor(document, "visibilityState");
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.matches = false;
  let visibility = "visible";
  Object.defineProperty(document, "visibilityState", { configurable: true, get: () => visibility });
  const timers = new Map();
  let timerId = 100000;
  window.setTimeout = (callback, delay, ...args) => {
    if (delay !== 5000) return originalTimeout(callback, delay, ...args);
    timers.set(++timerId, callback); return timerId;
  };
  window.clearTimeout = id => { if (!timers.delete(id)) originalClear(id); };
  window.IntersectionObserver = globalThis.IntersectionObserver = class {
    constructor(callback) { this.callback = callback; }
    observe() { this.callback([{ isIntersecting: true }]); }
    disconnect() {}
  };
  const root = createRoot(document.getElementById("root"));
  try {
    await act(async () => root.render(<StrictMode><HomeBanner /></StrictMode>));
    const banner = document.getElementById("home");
    const active = () => banner.querySelector('[data-active="true"]').getAttribute("aria-label");
    assert.equal(timers.size, 1);
    await act(async () => { const [id, callback] = [...timers][0]; timers.delete(id); callback(); });
    assert.match(active(), /2 of 4/);
    await act(async () => { visibility = "hidden"; document.dispatchEvent(new window.Event("visibilitychange")); });
    assert.equal(timers.size, 0);
    await act(async () => { visibility = "visible"; document.dispatchEvent(new window.Event("visibilitychange")); });
    assert.equal(timers.size, 1);
    await act(async () => banner.querySelector('.home-banner-dot').focus());
    assert.equal(timers.size, 0, "Entering the carousel with keyboard focus stops rotation");
    await act(async () => root.unmount());
    assert.equal(timers.size, 0);
  } finally {
    await act(async () => root.unmount());
    window.IntersectionObserver = globalThis.IntersectionObserver = originalObserver;
    window.setTimeout = originalTimeout; window.clearTimeout = originalClear;
    preference.matches = true;
    if (visibilityDescriptor) Object.defineProperty(document, "visibilityState", visibilityDescriptor);
    else delete document.visibilityState;
  }
});

test("Rich headlines each show four matching unique images during selection and automatic rotation", async () => {
  const originalObserver = globalThis.IntersectionObserver;
  const originalTimeout = window.setTimeout;
  const originalClear = window.clearTimeout;
  const visibilityDescriptor = Object.getOwnPropertyDescriptor(document, "visibilityState");
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.matches = false;
  let visibility = "visible";
  Object.defineProperty(document, "visibilityState", { configurable: true, get: () => visibility });
  const timers = new Map();
  let timerId = 200000;
  window.setTimeout = (callback, delay, ...args) => {
    if (delay !== 4000) return originalTimeout(callback, delay, ...args);
    timers.set(++timerId, callback); return timerId;
  };
  window.clearTimeout = id => { if (!timers.delete(id)) originalClear(id); };
  window.IntersectionObserver = globalThis.IntersectionObserver = class {
    constructor(callback) { this.callback = callback; }
    observe() { this.callback([{ isIntersecting: true }]); }
    disconnect() {}
  };
  const root = createRoot(document.getElementById("root"));
  try {
    await act(async () => root.render(<StrictMode><RichScenes /></StrictMode>));
    const section = document.getElementById("about");
    const active = () => section.querySelector('[data-rich-scene][data-active="true"]');
    const seen = new Set();
    for (const title of ["RICH", "AUTHENTIC", "FRESH", "DELICIOUS", "HOMESTYLE"]) {
      await click(section.querySelector(`button[aria-label="Show ${title} scene"]`));
      assert.equal(active().querySelector("h2").textContent, title);
      assert.equal(active().getAttribute("aria-hidden"), "false");
      const images = [...active().querySelectorAll("img")];
      assert.equal(images.length, 4);
      for (const image of images) {
        const src = image.getAttribute("src");
        assert.ok(src.startsWith(`/images/rich-scenes/${title}_`) || (title === "AUTHENTIC" && src.includes("/AUTHNTIC_")), src);
        assert.ok(!seen.has(src), "Every image belongs to only one headline");
        seen.add(src);
        assert.ok(existsSync(resolve("public", src.slice(1))), src);
        assert.ok(image.alt && image.width > 0 && image.height > 0);
      }
      assert.equal(section.querySelectorAll('[data-rich-scene][data-active="true"]').length, 1);
    }
    assert.equal(seen.size, 20);
    assert.equal(timers.size, 1);
    await act(async () => { const [id, callback] = [...timers][0]; timers.delete(id); callback(); });
    assert.equal(active().querySelector("h2").textContent, "RICH", "Autoplay wraps with the Rich image set");
    await act(async () => { visibility = "hidden"; document.dispatchEvent(new window.Event("visibilitychange")); });
    assert.equal(timers.size, 0, "Hidden tabs pause rotation");
    await act(async () => { visibility = "visible"; document.dispatchEvent(new window.Event("visibilitychange")); });
    assert.equal(timers.size, 1);
    await act(async () => { preference.matches = true; for (const listener of preference.listeners) listener(); });
    assert.equal(timers.size, 0, "Reduced motion pauses rotation");
    await act(async () => root.unmount());
    assert.equal(timers.size, 0);
  } finally {
    await act(async () => root.unmount());
    window.IntersectionObserver = globalThis.IntersectionObserver = originalObserver;
    window.setTimeout = originalTimeout; window.clearTimeout = originalClear;
    preference.matches = true;
    if (visibilityDescriptor) Object.defineProperty(document, "visibilityState", visibilityDescriptor);
    else delete document.visibilityState;
  }
});

test("Who We Are uses the uploaded distribution video with manual playback and an image fallback", async () => {
  const cleanup = await mount("/who-we-are/");
  try {
    const banner = document.getElementById("who-we-are");
    const video = banner.querySelector("video");
    assert.equal(video.getAttribute("src"), "/videos/who-we-are-distribution.mp4");
    assert.equal(video.getAttribute("poster"), "/images/who-we-are/distribution-video-poster.webp");
    assert.equal(video.loop, true);
    assert.equal(video.muted, true);
    assert.equal(video.hasAttribute("playsinline"), true);
    assert.equal(video.preload, "metadata");
    let paused = true;
    Object.defineProperty(video, "paused", { get: () => paused });
    video.play = async () => { paused = false; video.dispatchEvent(new window.Event("play")); };
    video.pause = () => { paused = true; video.dispatchEvent(new window.Event("pause")); };
    await click(banner.querySelector('[aria-label="Play banner video"]'));
    assert.equal(paused, false, "Visitors can explicitly play even with reduced motion");
    await click(banner.querySelector('[aria-label="Pause banner video"]'));
    assert.equal(paused, true);
    await act(async () => video.dispatchEvent(new window.Event("error")));
    assert.equal(banner.querySelector("video"), null);
    assert.equal(banner.querySelector("img").getAttribute("src"), "/images/who-we-are/distribution-video-poster.webp");
    assert.equal(banner.querySelector("button"), null, "A failed video leaves the poster and no broken control");
    assert.equal(banner.querySelector("h1").textContent, "Who We Are");
  } finally { await cleanup(); }
});

test("Babco Story shares the Who We Are video and location paragraph counters use inline sizing", async () => {
  let cleanup = await mount("/babco-story/");
  try {
    const banner = document.getElementById("babco-story");
    assert.equal(banner.querySelector("video").getAttribute("src"), "/videos/who-we-are-distribution.mp4");
    assert.equal(banner.querySelector("video").getAttribute("poster"), "/images/who-we-are/distribution-video-poster.webp");
    assert.equal(banner.querySelector("h1").textContent.trim(), "Babco Story");
    assert.ok(banner.querySelector('button[aria-controls="story-banner-video"]'));
  } finally { await cleanup(); }
  cleanup = await mount("/");
  try {
    assert.deepEqual([...document.querySelectorAll("#locations .count-up-inline")].map(n => n.dataset.countValue), ["46", "50", "5"]);
    assert.equal(document.querySelectorAll("#distribution .count-up-inline").length, 0);
  } finally { await cleanup(); }
});

test("updated Brands page has three photographic banners and each brand link selects its home catalogue", async () => {
  const cleanup = await mount("/our-brands/");
  try {
    const hero = document.getElementById("our-brands");
    assert.equal(hero.querySelector("img").getAttribute("src"), "/images/our-brands/hero-products.webp");
    assert.equal(hero.querySelector('[aria-roledescription="slide"]'), null);
    assert.equal(hero.querySelector("h1").textContent, "Our Brands");
    const section = document.getElementById("inhouse-brands");
    assert.equal(section.querySelectorAll('nav[aria-label="Explore our inhouse brands"] a').length, 4);
    const banners = [...section.querySelectorAll("[data-product-banner]")];
    assert.deepEqual(banners.map(banner => banner.dataset.productBanner), ["anand", "adarsh", "ullasam"]);
    assert.equal(new Set(banners.map(banner => banner.querySelector("img").getAttribute("src"))).size, 3);
    assert.ok(banners.every(banner => banner.querySelector("img").alt.length > 10));
    assert.doesNotMatch(section.textContent, /product banner|Explore the brands that power/i);
    assert.equal(document.querySelectorAll("#partner-brands article").length, 25);
    for (const removed of ["aashirvaad", "dhampur-green", "iyengar-hot-hot", "maggi"]) {
      assert.equal(document.getElementById(`brand-${removed}`), null);
    }
    assert.deepEqual([...document.querySelectorAll("#partner-brands article h3")].map(name => name.textContent), [
      "Abhiruchi", "Adarsh", "Anand", "Anil", "Annapoorna", "Ariya", "Bedekar", "BON", "Brahmin’s",
      "Double Horse", "Gullon", "ITC Limited", "Janaki’s", "Kwality", "Laxminarayan", "Maliban", "Mayil",
      "McVitie’s", "Meenu", "Nana Shetty Masala", "Nirapara", "Pavizham", "Priyagold", "Sakthi", "Ustad Banne Nawab’s",
    ]);
    for (const [slug, brand, index] of [["anand", "Anand", 0], ["adarsh", "Adarsh", 1], ["ullasam", "Ullasam", 3]]) {
      await click(document.querySelector(`[data-product-banner="${slug}"]`));
      assert.equal(window.location.pathname, "/");
      assert.equal(window.location.search, `?brand=${index}`);
      assert.equal(window.location.hash, "#brands");
      assert.equal(selectedBrand(), brand);
      await historyMove(-1);
      assert.equal(window.location.pathname, "/our-brands/");
    }
  } finally { await cleanup(); }
});

test("Our People shows all four leaders, the next-generation statement and six family values", async () => {
  const cleanup = await mount("/our-people/");
  try {
    const profiles = [...document.querySelectorAll('.people-page article.leader-profile')];
    assert.equal(profiles.length, 4);
    for (const person of [...founders, ...leadership]) {
      const profile = document.getElementById(person.id);
      assert.equal(profile.querySelector('h3').textContent, person.name);
      assert.equal(profile.querySelector('.leader-profile-role').textContent, person.role);
      assert.match(profile.querySelector('figure img').alt, new RegExp(person.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
      for (const lines of person.paragraphs) for (const line of lines) assert.ok(profile.textContent.includes(line));
    }
    assert.match(document.getElementById('next-generation').textContent, /Raised across cultures/);
    const familyProfiles = [...document.querySelectorAll('.family-leadership article')];
    assert.deepEqual(familyProfiles.map(profile => profile.querySelector('h3').textContent), [...founders, ...leadership].map(person => person.name));
    const bobPhoto = document.querySelector('#robert-bob-vaz figure img').getAttribute('src');
    assert.equal(bobPhoto, '/images/our-people/bob-profile-design.jpg');
    assert.equal(familyProfiles[0].querySelector('img').getAttribute('src'), '/images/our-people/bob-profile-updated.jpg');
    assert.equal(document.querySelectorAll('#robert-bob-vaz figure img').length, 1);
    const oliviaCopy = [...document.querySelectorAll('#olivia-vaz .leader-profile-biography p')].map(p => p.textContent).join('\n');
    assert.equal(oliviaCopy, "Olivia manages the company's finances, budgets, policies, and credit control, bringing with her 25 years of international commercial banking experience in her role as Vice President of Corporate Credit at international and US national banks.\nShe is the Co-Founder of Babco Foods and has been intimately involved in every aspect of Babco Foods since its inception.\nHer, enthusiasm, high energy, planning, and hard work have been the driving force behind the success of Babco Foods.");
    const footerBrands = [...document.querySelectorAll('footer nav[aria-label="Our brands"] a')];
    assert.deepEqual(footerBrands.map(a => [a.textContent.trim(), a.getAttribute('href')]), [['Anand', 'https://anandusa.com/'], ['Meenu', 'https://meenuseafood.com/'], ['Ullasam', 'https://ullasam.com/']]);
    assert.ok(footerBrands.every(a => a.target === '_blank' && a.rel.includes('noopener')));
    const values = [...document.querySelectorAll('.people-values-grid article')];
    assert.equal(values.length, 6);
    for (const [index, value] of familyValues.entries()) {
      assert.equal(values[index].querySelector('h3').textContent.trim(), value.title.join(' '));
      assert.equal(values[index].querySelector('p').textContent.trim(), value.copy.join(' '));
    }
    await click(document.querySelectorAll('.desktop-nav > div > button')[4]);
    await click(document.querySelector('#nav-menu-4 a[href="/our-people/#family-values"]'));
    assert.equal(window.location.hash, '#family-values');
    assert.equal(document.querySelector('#nav-menu-4').hidden, true);
  } finally { await cleanup(); }
});

test("contact form validates required fields and prepares an encoded email draft without claiming delivery", async () => {
  assert.deepEqual(Object.keys(validateContact(emptyContact)), ["fullName", "email", "phone", "message"]);
  const valid = { fullName: "Sample Customer", email: "sample+customer@example.test", phone: "+1 (212) 555-0100", message: "Please share product details & availability.\nReference #123." };
  assert.deepEqual(validateContact(valid), {});
  assert.ok(validateContact({ ...valid, email: "invalid" }).email);
  assert.ok(validateContact({ ...valid, phone: "not a phone" }).phone);
  assert.ok(validateContact({ ...valid, fullName: "Name\nCc: other@example.test" }).fullName);
  const cleanup = await mount("/contact-us/");
  const clipboardDescriptor = Object.getOwnPropertyDescriptor(window.navigator, "clipboard");
  let copied = "";
  Object.defineProperty(window.navigator, "clipboard", { configurable: true, value: { writeText: async text => { copied = text; } } });
  try {
    const form = document.querySelector('form[aria-label="Contact Babco Foods"]');
    await act(async () => form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true })));
    assert.equal(form.querySelectorAll('[aria-invalid="true"]').length, 4);
    assert.equal(document.activeElement.name, "fullName");
    assert.ok(form.querySelector('[role="alert"]'));
    for (const [name, value] of Object.entries(valid)) await fillControl(form.elements.namedItem(name), value);
    await act(async () => form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true })));
    assert.equal(document.querySelector('.contact-draft'), null, "Missing CAPTCHA blocks the review step");
    assert.match(document.getElementById('contact-captcha').textContent, /Please complete the CAPTCHA/);
    assert.equal(document.activeElement.id, "contact-captcha");
    const captcha = captchaWidgets.at(-1);
    assert.equal(captcha.sitekey, recaptchaSiteKey);
    assert.equal(recaptchaSiteKey, recaptchaTestSiteKey);
    assert.match(document.getElementById('contact-captcha-note').textContent, /test mode/);
    await act(async () => captcha.callback("unit-test-token"));
    await act(async () => captcha["expired-callback"]());
    await act(async () => form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true })));
    assert.equal(document.querySelector('.contact-draft'), null, "An expired token cannot proceed");
    await act(async () => captcha["error-callback"]());
    assert.match(document.getElementById('contact-captcha-status').textContent, /unavailable/);
    await click(document.querySelector('.contact-captcha-retry'));
    const freshCaptcha = captchaWidgets.at(-1);
    assert.notEqual(freshCaptcha, captcha);
    await act(async () => freshCaptcha.callback("new-unit-test-token"));
    await act(async () => form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true })));
    await flushFrames();
    const draftLink = document.querySelector('.contact-draft a.contact-primary-button');
    assert.ok(draftLink, "Valid input reaches a review step");
    const url = new URL(draftLink.href);
    assert.equal(url.protocol, "mailto:");
    assert.equal(url.pathname, contactEmail);
    assert.equal(url.searchParams.get("body"), buildContactDraft(valid).body);
    assert.equal(url.searchParams.get("cc"), null);
    assert.match(document.querySelector('.contact-draft').textContent, /Review it and press send there/);
    assert.doesNotMatch(document.querySelector('.contact-draft').textContent, /message (was )?sent/i);
    await click([...document.querySelectorAll('.contact-draft button')].find(b => b.textContent.includes("Copy message")));
    assert.equal(copied, buildContactDraft(valid).body);
    assert.match(document.querySelector('[role="status"]').textContent, /Message copied/);
    await click([...document.querySelectorAll('.contact-draft button')].find(b => b.textContent.includes("Edit message")));
    assert.equal(document.querySelector('[name="message"]').value, valid.message);
    assert.equal(document.activeElement.name, "fullName");
    assert.equal(document.getElementById('contact-captcha-status').textContent, "");
    await act(async () => form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true })));
    assert.equal(document.querySelector('.contact-draft'), null, "Editing requires a fresh CAPTCHA");
    assert.ok(captchaResets.length > 0, "Unmounted widgets are reset");
  } finally {
    await cleanup();
    if (clipboardDescriptor) Object.defineProperty(window.navigator, "clipboard", clipboardDescriptor);
    else delete window.navigator.clipboard;
  }
});

test("Contact Us is linked in navigation and all five office selectors show their correct maps and phone numbers", async () => {
  const cleanup = await mount("/");
  try {
    await click(document.querySelectorAll('.desktop-nav > div > button')[6]);
    await click(document.querySelector('#nav-menu-6 a[href="/contact-us/"]'));
    assert.equal(window.location.pathname, "/contact-us/");
    assert.equal(document.querySelector('#nav-menu-6').hidden, true);
    const buttons = [...document.querySelectorAll('.contact-office-picker button')];
    assert.equal(buttons.length, 5);
    for (const [index, office] of contactOffices.entries()) {
      await click(buttons[index]);
      const panel = document.getElementById('contact-office-panel');
      assert.match(panel.textContent, new RegExp(office.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
      assert.ok(panel.textContent.includes(office.address));
      assert.ok(panel.textContent.includes(office.phone));
      const map = panel.querySelector('.contact-map img');
      assert.equal(panel.querySelectorAll('.contact-interactive-map iframe').length, 1);
      assert.equal(panel.querySelector('.contact-interactive-map iframe').getAttribute('src'), office.map);
      assert.equal(panel.querySelectorAll('.contact-map img').length, 1);
      const previewSrc = office.image?.src ?? office.mapImage;
      assert.equal(map.getAttribute('src'), previewSrc);
      assert.ok(map.alt.includes(office.address));
      assert.ok(existsSync(resolve('public', previewSrc.slice(1))));
      assert.equal(panel.querySelector('.contact-map-credit'), null);
      assert.equal(panel.querySelector('.contact-map > a').href, panel.querySelector('.contact-directions').href);
      assert.equal(buttons[index].getAttribute('aria-pressed'), "true");
      assert.equal(document.querySelectorAll('.contact-office-picker [aria-pressed="true"]').length, 1);
      const directions = new URL(panel.querySelector('.contact-directions').href);
      assert.ok(directions.searchParams.get('query').includes(office.address));
    }
  } finally { await cleanup(); }
});

test("counter values stay exact before visibility, during entrance and after cleanup", async () => {
  const { connectCounter } = await import('../src/components/counterAnimation.js');
  for (const value of ["10,000+", "500+", "46"]) {
    const element = document.createElement("span");
    element.innerHTML = `<span data-count-current>${value}</span>`;
    let observe, animations = 0, cancelled = 0;
    element.firstElementChild.animate = () => {
      animations++;
      assert.equal(element.textContent, value);
      return { cancel() { cancelled++; } };
    };
    const viewport = {
      matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
      IntersectionObserver: class { constructor(callback) { observe = callback; } observe() {} disconnect() {} },
      requestAnimationFrame() { throw new Error("Counter text must not depend on animation frames"); },
    };
    const cleanup = connectCounter(element, value, viewport);
    assert.equal(element.textContent, value);
    observe([{ isIntersecting: true }]);
    observe([{ isIntersecting: true }]);
    assert.equal(animations, 1);
    assert.equal(element.textContent, value, "No reset to zero, wider intermediate text or fallback glyphs");
    cleanup();
    assert.equal(cancelled, 1);
    assert.equal(element.textContent, value);
  }
});


test("distribution map reveals all five photos, supports touch selection, outside clicks and Escape, and cleans up on unmount", async () => {
  const host = document.createElement("div"); document.body.append(host);
  const root = createRoot(host);
  await act(async () => root.render(<StrictMode><InteractiveDistributionMap /></StrictMode>));
  const map = host.querySelector(".babco-network");
  assert.equal(map.querySelector(".place-info, #place-detail"), null, "Map caption is removed");
  for (const button of host.querySelectorAll(".city-button")) {
    const event = new window.MouseEvent("click", { bubbles: true });
    Object.defineProperty(event, "pointerType", { value: "touch" });
    button.dispatchEvent(event);
    assert.equal(map.dataset.activeRegion, button.dataset.region);
    assert.equal(button.getAttribute("aria-pressed"), "true");
    assert.ok(host.querySelector(`#photo-${button.dataset.region}`).classList.contains("is-active"));
    assert.ok(Number(host.querySelector(`#sweep-${button.dataset.region}`).getAttribute("r")) > 0);
    assert.ok(host.querySelector(`#hide-annotations-${button.dataset.region}`).classList.contains("is-active"));
  }
  document.dispatchEvent(new window.KeyboardEvent("keydown", { key: "Escape" }));
  assert.equal(map.dataset.activeRegion, "");
  const button = host.querySelector(".city-button");
  button.dispatchEvent(new window.Event("pointerenter"));
  assert.equal(map.dataset.activeRegion, "san-francisco");
  assert.equal(host.querySelector(".reset"), null, "The reset button is removed");
  document.body.dispatchEvent(new window.Event("pointerdown", { bubbles: true }));
  assert.equal(map.dataset.activeRegion, "");
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  const before = query.listeners.size;
  await act(async () => root.unmount());
  assert.equal(query.listeners.size, before - 1);
  host.remove();
});
