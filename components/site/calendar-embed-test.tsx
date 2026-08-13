"use client";

const CAL_ID = "cal-97DAgWBFfaaIiye";

function LumaEmbed({ theme }: { theme: "light" | "dark" }) {
  return (
    <iframe
      src={`https://luma.com/embed/calendar/${CAL_ID}/events?lt=${theme}`}
      width="100%"
      height="450"
      loading="lazy"
      allowFullScreen
      aria-hidden="false"
      style={{
        border:
          theme === "dark"
            ? "1px solid rgba(251,244,232,0.3)"
            : "1px solid #bfcbda88",
        borderRadius: 4,
      }}
    />
  );
}

function CalendarEmbedTest() {
  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-16 p-8">
      <div>
        <h2 className="mb-4 font-sans text-xl font-bold">
          Light section (cream bg)
        </h2>
        <div className="flex flex-wrap gap-8 bg-[#FBF4E8] p-8">
          <div className="w-full max-w-[600px]">
            <p className="mb-2 text-sm text-black/60">lt=light</p>
            <LumaEmbed theme="light" />
          </div>
          <div className="w-full max-w-[600px]">
            <p className="mb-2 text-sm text-black/60">lt=dark</p>
            <LumaEmbed theme="dark" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 font-sans text-xl font-bold">
          Dark section (ink bg)
        </h2>
        <div className="flex flex-wrap gap-8 bg-[#0B0B0B] p-8">
          <div className="w-full max-w-[600px]">
            <p className="mb-2 text-sm text-white/60">lt=light</p>
            <LumaEmbed theme="light" />
          </div>
          <div className="w-full max-w-[600px]">
            <p className="mb-2 text-sm text-white/60">lt=dark</p>
            <LumaEmbed theme="dark" />
          </div>
        </div>
      </div>
    </div>
  );
}

export { CalendarEmbedTest };
