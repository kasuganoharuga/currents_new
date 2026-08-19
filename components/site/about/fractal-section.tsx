"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/site/eyebrow";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";

const SVGNS = "http://www.w3.org/2000/svg";
const XLINKNS = "http://www.w3.org/1999/xlink";

function svgEl<K extends keyof SVGElementTagNameMap>(
  tag: K,
): SVGElementTagNameMap[K] {
  return document.createElementNS(SVGNS, tag) as SVGElementTagNameMap[K];
}

const CAPTIONS: Record<number, { n: string; t: string }> = {
  1: { n: "01", t: "An individual. One node, doing the work." },
  2: {
    n: "02",
    t: "A community. Nodes bound by relationships. That connective tissue is the moat.",
  },
  3: {
    n: "03",
    t: "Chapters. Whole communities become nodes, connected to other communities.",
  },
};
const STAGE_TAGS: Record<number, string> = {
  1: "Individual",
  2: "Community",
  3: "Chapters",
};

/** Builds the rotating-ring fractal SVG imperatively (procedural geometry, not a UI-primitive concern). */
function useFractalSvg() {
  const svgRef = useRef<SVGSVGElement>(null);
  const layerElsRef = useRef<Record<number, SVGGElement | null>>({});

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const defs = svgEl("defs");
    svg.appendChild(defs);
    let uid = 0;
    const WORDS = " CREATE · PAVE THE WAY · INNOVATE · LEAD ·";
    const fitRings: Array<() => void> = [];

    function spinNode(
      parent: SVGGElement,
      cx: number,
      cy: number,
      r: number,
      opts: { dur?: number; big?: boolean; rev?: boolean; sat?: number } = {},
    ) {
      const g = svgEl("g");
      g.setAttribute("class", "fnode");
      const pid = "cp" + uid++;
      const path = svgEl("path");
      path.setAttribute("id", pid);
      path.setAttribute(
        "d",
        `M ${cx - r} ${cy} a ${r} ${r} 0 1 1 ${2 * r} 0 a ${r} ${r} 0 1 1 ${-2 * r} 0`,
      );
      path.setAttribute("fill", "none");
      defs.appendChild(path);

      const oc = svgEl("circle");
      oc.setAttribute("class", "fill-none stroke-lime opacity-[0.26]");
      oc.setAttribute("cx", String(cx));
      oc.setAttribute("cy", String(cy));
      oc.setAttribute("r", String(r));
      oc.setAttribute("stroke-width", opts.big ? "1.4" : "1");
      g.appendChild(oc);

      if (opts.sat) {
        for (let s = 0; s < opts.sat; s++) {
          const a = (s / opts.sat) * Math.PI * 2 - Math.PI / 2;
          const sx = cx + Math.cos(a) * (r * 1.5);
          const sy = cy + Math.sin(a) * (r * 1.5);
          const sl = svgEl("line");
          sl.setAttribute("class", "stroke-lime opacity-[0.28]");
          sl.setAttribute("stroke-width", "1");
          sl.setAttribute("x1", String(cx));
          sl.setAttribute("y1", String(cy));
          sl.setAttribute("x2", String(sx));
          sl.setAttribute("y2", String(sy));
          g.appendChild(sl);
          const sd = svgEl("circle");
          sd.setAttribute("class", "fill-lime opacity-75");
          sd.setAttribute("cx", String(sx));
          sd.setAttribute("cy", String(sy));
          sd.setAttribute("r", String(Math.max(2, r * 0.07)));
          g.appendChild(sd);
        }
      }

      const fs = Math.max(9, Math.round(r * 0.16));
      const txt = svgEl("text");
      txt.setAttribute(
        "class",
        "fill-lime font-space font-bold tracking-[0.1em] uppercase",
      );
      txt.setAttribute("font-size", String(fs));
      const tp = svgEl("textPath");
      tp.setAttributeNS(null, "href", "#" + pid);
      tp.setAttributeNS(XLINKNS, "href", "#" + pid);
      tp.textContent = WORDS;
      txt.appendChild(tp);
      g.appendChild(txt);

      fitRings.push(() => {
        const C = 2 * Math.PI * r;
        tp.removeAttribute("textLength");
        tp.removeAttribute("lengthAdjust");
        tp.textContent = WORDS;
        txt.setAttribute("font-size", String(fs));
        let one = 0;
        try {
          one = txt.getComputedTextLength();
        } catch {
          // ignore
        }
        if (one > 0) {
          const reps = Math.max(1, Math.round(C / one));
          const fs2 = Math.max(7, fs * (C / (reps * one)));
          txt.setAttribute("font-size", String(fs2));
          tp.textContent = Array(reps + 1).join(WORDS);
          tp.setAttribute("textLength", String(C));
          tp.setAttribute("lengthAdjust", "spacing");
        }
      });

      const cd = svgEl("circle");
      cd.setAttribute("class", "fill-lime");
      cd.setAttribute("cx", String(cx));
      cd.setAttribute("cy", String(cy));
      cd.setAttribute("r", String(Math.max(3, r * 0.06)));
      g.appendChild(cd);

      if (!reduce) {
        const at = svgEl("animateTransform");
        at.setAttribute("attributeName", "transform");
        at.setAttribute("type", "rotate");
        const d0 = opts.rev ? 360 : 0;
        const d1 = opts.rev ? 0 : 360;
        at.setAttribute("from", `${d0} ${cx} ${cy}`);
        at.setAttribute("to", `${d1} ${cx} ${cy}`);
        at.setAttribute("dur", `${opts.dur || 24}s`);
        at.setAttribute("repeatCount", "indefinite");
        g.appendChild(at);
      }
      parent.appendChild(g);
      return g;
    }

    function conn(
      parent: SVGGElement,
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      label?: boolean,
    ) {
      const l = svgEl("line");
      l.setAttribute(
        "class",
        "stroke-lime opacity-30 [stroke-dasharray:5_7] motion-safe:animate-[dashflow_1.5s_linear_infinite]",
      );
      l.setAttribute("stroke-width", "1.5");
      l.setAttribute("x1", String(x1));
      l.setAttribute("y1", String(y1));
      l.setAttribute("x2", String(x2));
      l.setAttribute("y2", String(y2));
      parent.appendChild(l);
      if (label) {
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        let ang = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
        if (ang > 90) ang -= 180;
        if (ang < -90) ang += 180;
        const t = svgEl("text");
        t.setAttribute(
          "class",
          "fill-lime font-space text-[8.5px] tracking-[0.06em] uppercase opacity-75",
        );
        t.setAttribute("x", String(mx));
        t.setAttribute("y", String(my - 4));
        t.setAttribute("text-anchor", "middle");
        t.setAttribute("transform", `rotate(${ang.toFixed(2)} ${mx} ${my})`);
        t.textContent = "STRONG RELATIONSHIPS";
        parent.appendChild(t);
      }
    }

    function layerG(id: number) {
      const g = svgEl("g");
      g.setAttribute(
        "class",
        cn(
          "[transform-box:view-box] [transform-origin:400px_300px] transition-[opacity,transform] duration-600 ease-in-out",
          id === 1
            ? "opacity-100"
            : "pointer-events-none scale-[1.15] opacity-0",
        ),
      );
      g.setAttribute("id", "L" + id);
      svg!.appendChild(g);
      return g;
    }

    const CX = 400;
    const CY = 300;

    const L1 = layerG(1);
    spinNode(L1, CX, CY, 150, { dur: 28, big: true });

    const L2 = layerG(2);
    const l2: [number, number, number][] = [[CX, CY, 60]];
    const R2 = 180;
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + i * ((2 * Math.PI) / 5);
      l2.push([CX + Math.cos(a) * R2, CY + Math.sin(a) * R2, 48]);
    }
    for (let i = 1; i < l2.length; i++)
      conn(L2, l2[0][0], l2[0][1], l2[i][0], l2[i][1], true);
    for (let i = 1; i < l2.length; i++) {
      const n = (i % 5) + 1;
      conn(L2, l2[i][0], l2[i][1], l2[n][0], l2[n][1]);
    }
    l2.forEach((p, idx) =>
      spinNode(L2, p[0], p[1], p[2], { dur: 18 + idx * 3, rev: idx % 2 === 0 }),
    );

    const L3 = layerG(3);
    const l3: [number, number, number][] = [
      [CX, CY, 52],
      [210, 170, 44],
      [590, 170, 44],
      [230, 440, 44],
      [590, 440, 44],
    ];
    for (let i = 1; i < l3.length; i++)
      conn(L3, l3[0][0], l3[0][1], l3[i][0], l3[i][1], true);
    conn(L3, l3[1][0], l3[1][1], l3[2][0], l3[2][1]);
    conn(L3, l3[2][0], l3[2][1], l3[4][0], l3[4][1]);
    conn(L3, l3[4][0], l3[4][1], l3[3][0], l3[3][1]);
    conn(L3, l3[3][0], l3[3][1], l3[1][0], l3[1][1]);
    l3.forEach((p, idx) =>
      spinNode(L3, p[0], p[1], p[2], {
        dur: 20 + idx * 2,
        rev: idx % 2 === 1,
        sat: 5,
      }),
    );

    layerElsRef.current = {
      1: svg.querySelector<SVGGElement>("#L1"),
      2: svg.querySelector<SVGGElement>("#L2"),
      3: svg.querySelector<SVGGElement>("#L3"),
    };

    function runFits() {
      fitRings.forEach((f) => f());
    }
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(runFits);
    } else {
      setTimeout(runFits, 300);
    }
    const t = setTimeout(runFits, 800);
    return () => clearTimeout(t);
  }, []);

  return { svgRef, layerElsRef };
}

function FractalSection() {
  const { svgRef, layerElsRef } = useFractalSvg();
  const [layer, setLayer] = useState(1);

  useEffect(() => {
    for (let k = 1; k <= 3; k++) {
      const el = layerElsRef.current[k];
      if (!el) continue;
      if (k < layer) {
        el.className.baseVal =
          "[transform-box:view-box] [transform-origin:400px_300px] transition-[opacity,transform] duration-600 ease-in-out pointer-events-none scale-[0.32] opacity-0";
      } else if (k === layer) {
        el.className.baseVal =
          "[transform-box:view-box] [transform-origin:400px_300px] transition-[opacity,transform] duration-600 ease-in-out opacity-100";
      } else {
        el.className.baseVal =
          "[transform-box:view-box] [transform-origin:400px_300px] transition-[opacity,transform] duration-600 ease-in-out pointer-events-none scale-[1.15] opacity-0";
      }
    }
  }, [layer, layerElsRef]);

  function advance() {
    setLayer((cur) => (cur < 3 ? cur + 1 : 1));
  }

  const [sectionHeadRef, sectionHeadVisible] = useReveal<HTMLDivElement>();
  const [h2Ref, h2Visible] = useReveal<HTMLHeadingElement>();
  const [stageRef, stageVisible] = useReveal<HTMLDivElement>();
  const [uiRef, uiVisible] = useReveal<HTMLDivElement>();
  const [moatRef, moatVisible] = useReveal<HTMLDivElement>();
  const [sameRef, sameVisible] = useReveal<HTMLParagraphElement>();

  return (
    <section
      id="the-model"
      className="bg-ink py-[clamp(72px,11vw,132px)] text-cream"
    >
      <div className="mx-auto max-w-[1140px] px-8">
        <div
          ref={sectionHeadRef}
          className={cn("mb-[26px]", REVEAL, revealState(sectionHeadVisible))}
        >
          <Eyebrow>The current</Eyebrow>
        </div>
        <h2
          ref={h2Ref}
          className={cn(
            "max-w-[14ch] font-display text-[clamp(34px,5.6vw,72px)] font-black uppercase leading-[0.98] tracking-[-0.02em]",
            REVEAL,
            revealState(h2Visible),
          )}
        >
          The
          <br />
          Model.
        </h2>

        <div
          ref={stageRef}
          className={cn(
            "relative mt-[clamp(30px,5vw,52px)] overflow-hidden rounded-[10px] border border-cream/14 p-2 [background:radial-gradient(120%_120%_at_50%_45%,rgba(228,252,84,.06),transparent_62%)]",
            REVEAL,
            revealState(stageVisible),
          )}
        >
          <div
            key={layer}
            className="pointer-events-none absolute top-[18px] left-5 z-[4] flex items-baseline gap-2.5 motion-safe:animate-[tagin_0.4s_ease]"
          >
            <span className="font-space text-[11px] tracking-[0.16em] text-lime">
              {CAPTIONS[layer].n}
            </span>
            <span className="font-display text-[clamp(18px,2.2vw,26px)] font-black leading-none uppercase text-cream">
              {STAGE_TAGS[layer]}
            </span>
          </div>
          <svg
            ref={svgRef}
            id="fractal"
            viewBox="0 0 800 600"
            role="img"
            aria-label="Interactive fractal: individual, community, and chapters"
            className="block h-auto w-full cursor-zoom-out"
            onClick={advance}
          ></svg>
        </div>
        <div
          ref={uiRef}
          className={cn(
            "mt-[22px] flex flex-wrap items-center justify-between gap-[18px]",
            REVEAL,
            revealState(uiVisible),
          )}
        >
          <div className="max-w-[46ch] font-space text-[13px] leading-[1.5] tracking-[0.03em] text-cream">
            <span className="text-lime">{CAPTIONS[layer].n}</span> &nbsp;
            <span>{CAPTIONS[layer].t}</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex gap-2.5">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={cn(
                    "size-2.5 rounded-full border-[1.5px] border-cream/40 transition-colors",
                    layer === n && "border-lime bg-lime",
                  )}
                  aria-label={STAGE_TAGS[n]}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLayer(n);
                  }}
                ></button>
              ))}
            </div>
            <button
              className="rounded-full bg-lime px-5 py-[11px] font-space text-xs font-bold tracking-[0.1em] whitespace-nowrap text-ink uppercase transition-transform hover:-translate-y-px"
              onClick={(e) => {
                e.stopPropagation();
                advance();
              }}
            >
              {layer < 3 ? <>Zoom out ↗</> : <>Start over ↵</>}
            </button>
          </div>
        </div>

        <div
          id="relationships"
          ref={moatRef}
          className={cn(
            "mt-[clamp(48px,7vw,82px)] grid grid-cols-[0.72fr_1.28fr] items-center gap-[clamp(36px,7vw,88px)] max-[820px]:grid-cols-1",
            REVEAL,
            revealState(moatVisible),
          )}
        >
          <div>
            <div className="max-w-[15ch] text-[clamp(30px,3.5vw,46px)] font-black leading-[1.05] tracking-[-0.02em]">
              The strength of our{" "}
              <span className="text-lime">relationships</span> is our moat.
            </div>
            <p
              ref={sameRef}
              className={cn(
                "mt-7 max-w-[38ch] font-space text-[13px] leading-[1.7] tracking-[0.02em] text-cream/60",
                REVEAL,
                revealState(sameVisible),
              )}
            >
              We&apos;re all part of the same current, one that amplifies you
              and pressure-tests you. Never an echo chamber.
            </p>
          </div>

          <div className="grid h-[460px] grid-cols-2 grid-rows-[1.2fr_0.8fr] gap-3 min-[821px]:h-[clamp(360px,39vw,500px)] min-[821px]:grid-cols-12 min-[821px]:grid-rows-2">
            <div className="relative col-span-2 overflow-hidden rounded-[6px] min-[821px]:col-span-7 min-[821px]:row-span-2">
              <Image
                src="/about-assets/kenji-reserve/mondrian-114.webp"
                alt="Currents members exchanging ideas at a community gathering"
                fill
                sizes="(max-width: 820px) 100vw, 36vw"
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-[6px] min-[821px]:col-span-5">
              <Image
                src="/about-assets/kenji-reserve/mondrian-108.webp"
                alt="Currents members gathered together at an event"
                fill
                sizes="(max-width: 820px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-[6px] min-[821px]:col-span-5">
              <Image
                src="/about-assets/kenji-reserve/mondrian-101.webp"
                alt="Three Currents members at a community event"
                fill
                sizes="(max-width: 820px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { FractalSection };
