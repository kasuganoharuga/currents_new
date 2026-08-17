"use client";

import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/site/eyebrow";
import { REVEAL, revealState, useReveal } from "@/components/site/use-reveal";

function RailNode({
  label,
  lineX1,
  lineY1,
  lineY2,
  rectX,
  rectY,
  rectW,
  labelX,
  labelY,
  arrowX,
  arrowY,
  dotCx,
}: {
  label: string;
  lineX1: number;
  lineY1: number;
  lineY2: number;
  rectX: number;
  rectY: number;
  rectW: number;
  labelX: number;
  labelY: number;
  arrowX: number;
  arrowY: number;
  dotCx: number;
}) {
  return (
    <a
      href="#"
      target="_blank"
      aria-label={label}
      className="group cursor-pointer"
    >
      <line
        x1={lineX1}
        y1={lineY1}
        x2={lineX1}
        y2={lineY2}
        stroke="#E4FC54"
        strokeWidth="1.4"
        opacity="0.6"
      />
      <rect
        x={rectX}
        y={rectY}
        width={rectW}
        height="34"
        rx="17"
        fill="none"
        stroke="#FBF4E8"
        strokeOpacity="0.25"
        className="transition-[stroke,stroke-opacity] duration-200 group-hover:stroke-lime group-hover:[stroke-opacity:1]"
      />
      <text
        x={labelX}
        y={labelY}
        textAnchor="middle"
        className="fill-cream font-space text-xs tracking-[0.02em] transition-colors duration-200 group-hover:fill-lime"
      >
        {label}
      </text>
      <text
        x={arrowX}
        y={arrowY}
        className="fill-lime font-space text-[13px] font-bold opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        &#8599;
      </text>
      <circle
        cx={dotCx}
        cy="180"
        r="6"
        fill="#E4FC54"
        className="transition-[r] duration-200 group-hover:[r:9px]"
      />
    </a>
  );
}

function RailsDiagram() {
  const [headRef, headVisible] = useReveal<HTMLDivElement>();
  const [diagramRef, diagramVisible] = useReveal<HTMLDivElement>();
  const [hintRef, hintVisible] = useReveal<HTMLDivElement>();
  const [legendRef, legendVisible] = useReveal<HTMLDivElement>();

  return (
    <section
      id="model"
      className="bg-ink py-[clamp(72px,11vw,132px)] text-cream"
    >
      <div className="mx-auto max-w-[1140px] px-8">
        <div
          ref={headRef}
          className={cn(
            "mb-12 grid grid-cols-[repeat(2,1fr)] items-end gap-10 max-[820px]:grid-cols-1 max-[820px]:gap-6",
            REVEAL,
            revealState(headVisible),
          )}
        >
          <div>
            <Eyebrow className="mb-[22px]">How it works</Eyebrow>
            <h2 className="font-display text-[clamp(34px,5.6vw,72px)] font-black uppercase leading-[0.98] tracking-[-0.02em]">
              One current.
              <br />
              Many nodes.
            </h2>
          </div>
          <p className="max-w-[52ch] text-[17px] leading-[1.6] text-cream/60">
            Currents is the rails. The brand, the values, the playbook.
            Everything else is built on top. An event, a podcast, a chapter in
            another city: each one is a node running on the same current.
            Independent to move, connected by what holds it.
          </p>
        </div>

        <div
          ref={diagramRef}
          className={cn(
            "rounded-md border border-cream/14 p-5 [background:linear-gradient(180deg,rgba(255,255,255,.02),transparent)]",
            REVEAL,
            revealState(diagramVisible),
          )}
        >
          <svg
            viewBox="0 0 1000 340"
            role="img"
            aria-label="Diagram: Currents as a shared current with clickable nodes branching from it"
            className="block h-auto w-full"
          >
            <path
              id="railPath"
              d="M40,180 C220,90 340,90 500,180 C660,270 780,270 960,180"
              fill="none"
              stroke="#E4FC54"
              strokeWidth="3"
            />
            <text
              x="40"
              y="150"
              className="fill-lime font-space text-[11px] tracking-[0.2em] uppercase"
            >
              THE CURRENT · SHARED RAILS
            </text>

            <circle cx="40" cy="180" r="9" fill="#E4FC54" />
            <circle cx="960" cy="180" r="9" fill="#E4FC54" />

            <circle r="5" fill="#E4FC54">
              <animateMotion
                dur="7s"
                repeatCount="indefinite"
                calcMode="linear"
              >
                <mpath xlinkHref="#railPath" href="#railPath" />
              </animateMotion>
            </circle>
            <circle r="5" fill="#E4FC54">
              <animateMotion
                dur="7s"
                begin="-3.5s"
                repeatCount="indefinite"
                calcMode="linear"
              >
                <mpath xlinkHref="#railPath" href="#railPath" />
              </animateMotion>
            </circle>

            <RailNode
              label="EVENTS"
              lineX1={180}
              lineY1={128}
              lineY2={68}
              rectX={120}
              rectY={34}
              rectW={120}
              labelX={180}
              labelY={55}
              arrowX={246}
              arrowY={56}
              dotCx={180}
            />
            <RailNode
              label="PODCAST"
              lineX1={400}
              lineY1={150}
              lineY2={290}
              rectX={336}
              rectY={292}
              rectW={128}
              labelX={400}
              labelY={313}
              arrowX={470}
              arrowY={314}
              dotCx={400}
            />
            <RailNode
              label="CHAPTERS"
              lineX1={600}
              lineY1={150}
              lineY2={68}
              rectX={530}
              rectY={34}
              rectW={140}
              labelX={600}
              labelY={55}
              arrowX={676}
              arrowY={56}
              dotCx={600}
            />
            <RailNode
              label="CREATORS"
              lineX1={820}
              lineY1={128}
              lineY2={290}
              rectX={748}
              rectY={292}
              rectW={144}
              labelX={820}
              labelY={313}
              arrowX={898}
              arrowY={314}
              dotCx={820}
            />
          </svg>
        </div>

        <div
          ref={hintRef}
          className={cn(
            "mt-4 flex items-center gap-2.5 font-space text-[11px] tracking-[0.16em] text-cream/60 uppercase",
            REVEAL,
            revealState(hintVisible),
          )}
        >
          <span className="size-1.5 rounded-full bg-lime" />
          Hover a node. Each one is a live link to its own space
        </div>

        <div
          ref={legendRef}
          className={cn(
            "mt-[26px] flex flex-wrap gap-7 font-space text-xs tracking-[0.04em] text-cream/60",
            REVEAL,
            revealState(legendVisible),
          )}
        >
          <span className="flex items-center gap-2.5">
            <span className="h-[3px] w-5 rounded-sm bg-lime" />
            <b className="font-bold text-cream">The current</b>&nbsp;· values,
            brand, SOPs
          </span>
          <span className="flex items-center gap-2.5">
            <span className="size-3 rounded-[3px] bg-lime" />
            <b className="font-bold text-cream">A node</b>&nbsp;· anyone who
            builds on top
          </span>
          <span>Independent to run · connected by what holds it</span>
        </div>
      </div>
    </section>
  );
}

export { RailsDiagram };
