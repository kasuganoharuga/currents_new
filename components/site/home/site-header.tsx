"use client";

import Image from "next/image";
import Link from "next/link";

import { BrandButton } from "@/components/site/brand-button";

function SiteHeader({ onOpenManifesto }: { onOpenManifesto: () => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/12 bg-cream/82 backdrop-blur-[10px]">
      <div className="mx-auto flex h-[66px] max-w-[1140px] items-center justify-between px-8">
        <Image
          src="/brand/currents-logo.png"
          alt="Currents"
          width={377}
          height={61}
          className="h-[22px] w-auto"
          priority
        />
        <nav className="hidden gap-[30px] font-space text-xs tracking-[0.14em] uppercase min-[760px]:flex">
          <a
            href="#bet"
            className="text-ink/60 transition-colors hover:text-ink"
          >
            The bet
          </a>
          <Link
            href="/model"
            className="text-ink/60 transition-colors hover:text-ink"
          >
            The Model
          </Link>
          <a
            href="#constitution"
            className="text-ink/60 transition-colors hover:text-ink"
          >
            Constitution
          </a>
          <button
            className="uppercase text-ink/60 transition-colors hover:text-ink"
            onClick={onOpenManifesto}
          >
            Manifesto
          </button>
        </nav>
        <BrandButton asChild variant="dark" size="sm">
          <a href="#invite">Come in</a>
        </BrandButton>
      </div>
    </header>
  );
}

export { SiteHeader };
