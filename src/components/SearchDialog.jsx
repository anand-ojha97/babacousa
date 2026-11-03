import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Search, X } from "lucide-react";
import { searchItems, navigationHref } from "../data/navigation.js";
import { iconButton } from "../styles.js";

export default function SearchDialog({ onClose, onNavigate }) {
  const [query, setQuery] = useState("");
  const searchInput = useRef(null);
  const searchDialog = useRef(null);
  const closeDialog = useRef(onClose);
  closeDialog.current = onClose;

  // Keep keyboard focus inside the search dialog and restore it on close.
  useEffect(() => {
    const previousFocus = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    searchInput.current?.focus();
    function handleKeyDown(event) {
      if (event.key === "Escape") closeDialog.current();
      if (event.key !== "Tab") return;
      const focusable = searchDialog.current?.querySelectorAll(
        "button, input, a[href]",
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previousFocus?.focus();
    };
  }, []);

  const results = searchItems.filter((item) =>
    (item.title + " " + item.detail)
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  // A portal places the dialog above the entire page instead of inside the header.
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-[15vh] backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={searchDialog}
        className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-title"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2
            id="search-title"
            className="text-xl font-semibold text-babco-red"
          >
            Search Babco Foods
          </h2>
          <button
            className={iconButton}
            aria-label="Close search"
            onClick={() => onClose()}
          >
            <X />
          </button>
        </div>
        <label className="flex items-center gap-3 rounded-xl border border-[#ddd] px-4 py-3">
          <Search size={18} className="text-[#888]" />
          <span className="sr-only">
            Search brands, distribution, and locations
          </span>
          <input
            ref={searchInput}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search brands, locations, and more…"
            className="min-w-0 w-full border-none bg-transparent text-sm outline-none"
          />
        </label>
        <div className="mt-4 max-h-[45vh] overflow-y-auto">
          {results.map((item) => (
            <Link
              key={item.title}
              to={navigationHref(item)}
              onClick={() => onNavigate()}
              className="flex items-center justify-between rounded-lg px-3 py-3 hover:bg-orange-50"
            >
              <div>
                <strong className="block text-sm text-[#333]">
                  {item.title}
                </strong>
                <span className="text-xs text-[#777]">{item.detail}</span>
              </div>
              <ArrowUpRight size={17} className="shrink-0 text-babco-orange" />
            </Link>
          ))}
          {results.length === 0 && (
            <p className="py-6 text-center text-sm text-[#666]">
              No matching results. Try a brand name or “distribution”.
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
