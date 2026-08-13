import Image from "next/image";
import Link from "next/link";

function SiteFooter() {
  return (
    <footer className="border-t border-cream/14 bg-ink py-10 pb-[54px] text-cream/60">
      <div className="mx-auto flex max-w-[1140px] flex-wrap items-center justify-between gap-6 px-8">
        <Link href="/">
          <Image
            src="/brand/currents-logo-cream.png"
            alt="Currents"
            width={377}
            height={61}
            className="h-5 w-auto"
          />
        </Link>
        <div className="font-space text-[11px] tracking-[0.14em] uppercase">
          Rising tides lift all boats · Gold Coast, AU
        </div>
      </div>
    </footer>
  );
}

export { SiteFooter };
