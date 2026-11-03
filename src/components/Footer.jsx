import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { navigation, footerBrands } from "../data/navigation.js";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative px-[3.35cqw] pb-[1.6cqw] pt-[3cqw] text-babco-red font-paragraph font-semibold tracking-normal [font-synthesis:none] min-[1001px]:min-h-[26.5625cqw] max-[640px]:px-6 max-[640px]:pb-6 max-[640px]:pt-[30px]"
    >
      <div className="flex justify-between pr-[18.5%] min-[1001px]:grid min-[1001px]:grid-cols-[53.5%_18%_28.5%] min-[1001px]:pr-0 max-[640px]:grid max-[640px]:grid-cols-2 max-[640px]:gap-[25px] max-[640px]:pr-0">
        <Link
          to="/#home"
          className="relative h-fit w-[20cqw] min-[1001px]:-left-[0.61cqw] min-[1001px]:w-[21.04cqw] min-[1001px]:-translate-y-[0.53cqw] max-[640px]:col-span-2 max-[640px]:w-[175px]"
          aria-label="Babco Foods home"
        >
          <img
            src="/images/babco-logo.png"
            alt="BABCO Foods"
            width="964"
            height="336"
            loading="lazy"
            className="h-auto w-full"
          />
        </Link>
        <nav
          className="ml-auto mr-[7.5%] text-[1.65cqw] leading-[1.6] min-[1001px]:m-0 min-[1001px]:-translate-y-[0.55cqw] font-semibold min-[1001px]:text-[1.5625cqw] min-[1001px]:leading-[2.60417cqw] max-[640px]:m-0 max-[640px]:text-[15px] max-[640px]:leading-[1.9]"
          aria-label="Footer navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="block hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <nav
          className="text-[1.65cqw] leading-[1.6] min-[1001px]:w-[10cqw] min-[1001px]:-translate-y-[0.3cqw] font-semibold min-[1001px]:text-[1.5625cqw] min-[1001px]:leading-[2.60417cqw] max-[640px]:max-w-[135px] max-[640px]:text-[15px] max-[640px]:leading-[1.9]"
          aria-label="Our brands"
        >
          {footerBrands.map(({ name, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              key={name}
              className="flex items-center justify-between gap-3 whitespace-nowrap hover:underline [&_svg]:shrink-0"
            >
              {name}
              <ArrowUpRight
                size={22}
                className="size-[1.4cqw] max-[640px]:size-[18px]"
              />
            </a>
          ))}
        </nav>
      </div>
      <div className="mt-[3.6cqw] flex items-end justify-between min-[1001px]:absolute min-[1001px]:inset-x-[3.3854%] min-[1001px]:top-[21.25cqw] min-[1001px]:m-0 max-[640px]:mt-8 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-[25px]">
        <address className="text-[1.5625cqw] leading-[1.4] font-semibold not-italic max-[640px]:text-sm max-[640px]:leading-[1.4]">
          <a
            href="https://www.google.com/maps/search/?api=1&query=238+Saint+Nicholas+Ave+South+Plainfield+New+Jersey+07080"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            238 Saint Nicholas Ave, South Plainfield
            <br />
            New Jersey 07080, USA
          </a>
        </address>
        <div
          className="flex items-center gap-[2cqw] [&_svg]:size-[1.65cqw] min-[1001px]:gap-[2.05cqw] min-[1001px]:[&_svg]:size-[1.6667cqw] max-[640px]:gap-[22px] max-[640px]:[&_svg]:size-[18px]"
          aria-label="Social media icons from the supplied design"
        >
          <span title="YouTube" aria-label="YouTube">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M23 7s-.2-1.7-.9-2.4c-.9-.9-1.9-.9-2.4-1C16.4 3.4 12 3.4 12 3.4s-4.4 0-7.7.2c-.5.1-1.5.1-2.4 1C1.2 5.3 1 7 1 7s-.2 2-.2 4v1.9c0 2 .2 4 .2 4s.2 1.7.9 2.4c.9.9 2.1.9 2.6 1 1.9.2 7.5.2 7.5.2s4.4 0 7.7-.2c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.4.9-2.4s.2-2 .2-4V11C23.2 9 23 7 23 7ZM9.5 15.3V8.5l6.7 3.4-6.7 3.4Z" />
            </svg>
          </span>
          <span title="Instagram" aria-label="Instagram">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
            </svg>
          </span>
          <span
            title="X"
            aria-label="X"
            className="text-[1.55cqw] max-[640px]:text-xl"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.966 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
            </svg>
          </span>
          <span
            title="Facebook"
            aria-label="Facebook"
            className="text-[1.55cqw] font-bold max-[640px]:text-xl"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.6 1.6-1.6h1.7V3.1C16.5 3 15.5 3 14.4 3c-2.4 0-4 1.5-4 4.2v2.4H7.6v3.2h2.8V21z" /></svg>
          </span>
        </div>
      </div>
    </footer>
  );
}
