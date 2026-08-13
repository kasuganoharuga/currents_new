import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-2xl flex-col justify-center gap-6 px-6 py-16">
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Currents</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Next.js full-stack starter
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          App Router, PostgreSQL (Docker), SQL migrations, and shadcn/ui. Run{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            pnpm docker:up
          </code>{" "}
          then{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            pnpm dev
          </code>
          .
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/api/health">Check database health</Link>
        </Button>
        <Button asChild variant="outline">
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js docs
          </a>
        </Button>
      </div>
    </main>
  );
}
