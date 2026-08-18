"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/calendar", label: "Calendar" },
  { href: "/about", label: "About" },
  { href: "/manifesto", label: "Manifesto" },
  { href: "/sponsors", label: "Sponsors" },
];

function SiteHeader({ cta }: { cta?: ReactNode }) {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setNavOpen(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-[60] border-b border-ink/12 bg-cream/88 backdrop-blur-[12px] transition-shadow duration-300",
        scrolled && "shadow-sm",
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-[72px] max-w-[1220px] items-center justify-between gap-4 px-6 transition-[height] duration-300 sm:px-8",
          scrolled && "h-[62px]",
        )}
      >
        <Link href="/" aria-label="Currents home">
          <Image
            src="/brand/currents-logo.png"
            alt="Currents"
            width={377}
            height={61}
            className="h-[22px] w-auto max-[480px]:h-[17px]"
            priority
          />
        </Link>
        <nav
          id="site-nav-links"
          className={cn(
            "flex gap-6 font-space text-[11px] tracking-[0.13em] uppercase",
            "max-[820px]:fixed max-[820px]:top-[72px] max-[820px]:right-0 max-[820px]:left-0 max-[820px]:z-[55] max-[820px]:flex-col max-[820px]:items-start max-[820px]:gap-0 max-[820px]:border-b max-[820px]:border-ink/12 max-[820px]:bg-cream max-[820px]:px-8 max-[820px]:pt-2 max-[820px]:pb-5 max-[820px]:transition-[transform,top] max-[820px]:duration-350 max-[820px]:ease-in-out",
            scrolled && "max-[820px]:top-[62px]",
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
        <div className="flex items-center gap-2 min-[560px]:gap-5">
          <div className="[perspective:420px]">
            <div
              className={cn(
                "transition-transform duration-700 ease-out [transform-style:preserve-3d] motion-reduce:transition-none",
                scrolled
                  ? "[transform:rotateX(360deg)]"
                  : "[transform:rotateX(0deg)]",
              )}
            >
              {cta}
            </div>
          </div>
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
