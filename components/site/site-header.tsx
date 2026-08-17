"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/calendar", label: "Calendar" },
  { href: "/about", label: "About" },
  { href: "/manifesto", label: "Manifesto" },
  { href: "/sponsors", label: "Sponsors" },
];

function SiteHeader({ cta }: { cta?: ReactNode }) {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const close = () => setNavOpen(false);

  return (
    <header className="sticky top-0 z-[60] border-b border-ink/12 bg-cream/82 backdrop-blur-[10px]">
      <div className="mx-auto flex h-[66px] max-w-[1140px] items-center justify-between gap-4 px-8">
        <Link href="/" aria-label="Currents home">
          <Image
            src="/brand/currents-logo.png"
            alt="Currents"
            width={377}
            height={61}
            className="h-[22px] w-auto"
            priority
          />
        </Link>
        <nav
          id="site-nav-links"
          className={cn(
            "flex gap-7 font-space text-xs tracking-[0.14em] uppercase",
            "max-[820px]:fixed max-[820px]:top-[66px] max-[820px]:right-0 max-[820px]:left-0 max-[820px]:z-[55] max-[820px]:flex-col max-[820px]:items-start max-[820px]:gap-0 max-[820px]:border-b max-[820px]:border-ink/12 max-[820px]:bg-cream max-[820px]:px-8 max-[820px]:pt-2 max-[820px]:pb-5 max-[820px]:transition-transform max-[820px]:duration-350 max-[820px]:ease-in-out",
            navOpen
              ? "max-[820px]:translate-y-0"
              : "max-[820px]:-translate-y-[140%]",
          )}
        >
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={close}
                className={cn(
                  "max-[820px]:w-full max-[820px]:border-b max-[820px]:border-ink/12 max-[820px]:py-4 max-[820px]:text-sm",
                  active
                    ? "border-b-2 border-lime pb-[3px] text-ink"
                    : "text-ink/60 transition-colors hover:text-ink",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-5">
          {cta}
          <button
            className="flex size-10 flex-col items-center justify-center gap-1.5 p-2 min-[820px]:hidden"
            aria-label="Menu"
            aria-expanded={navOpen}
            aria-controls="site-nav-links"
            onClick={() => setNavOpen((v) => !v)}
          >
            <span
              className={cn(
                "block h-0.5 w-full bg-ink transition-transform duration-300",
                navOpen && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-full bg-ink transition-opacity duration-200",
                navOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-full bg-ink transition-transform duration-300",
                navOpen && "-translate-y-2 -rotate-45",
              )}
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export { SiteHeader };
