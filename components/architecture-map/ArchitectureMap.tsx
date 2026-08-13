"use client";

import { useEffect, useRef } from "react";

import "./architecture-map.css";
import { archivo, ibmPlexMono, interTight } from "./fonts";

export default function ArchitectureMap() {
  const rootRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLElement>(null);
  const curRef = useRef<HTMLElement>(null);
  const totRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const rail = railRef.current;
    const cur = curRef.current;
    const tot = totRef.current;
    if (!root || !rail || !cur || !tot) return;

    const panels = Array.from(root.querySelectorAll<HTMLElement>(".panel"));
    tot.textContent = String(panels.length).padStart(2, "0");

    const dots: HTMLElement[] = panels.map((p, i) => {
      const b = document.createElement("b");
      b.setAttribute("role", "button");
      b.setAttribute("tabindex", "0");
      b.setAttribute("aria-label", p.dataset.label || `Section ${i + 1}`);
      const go = () => p.scrollIntoView();
      b.addEventListener("click", go);
      b.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          go();
        }
      });
      rail.appendChild(b);
      return b;
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            const i = panels.indexOf(entry.target as HTMLElement);
            if (entry.intersectionRatio > 0.5) {
              cur.textContent = String(i + 1).padStart(2, "0");
              dots.forEach((d, j) => d.classList.toggle("on", j === i));
            }
          }
        });
      },
      { threshold: [0.25, 0.55] },
    );
    panels.forEach((p) => io.observe(p));

    let idx = 0;
    const onKeydown = (e: KeyboardEvent) => {
      const k = e.key;
      if (k === "ArrowDown" || k === "ArrowRight" || k === "PageDown") {
        e.preventDefault();
        idx = Math.min(panels.length - 1, idx + 1);
        panels[idx].scrollIntoView();
      }
      if (k === "ArrowUp" || k === "ArrowLeft" || k === "PageUp") {
        e.preventDefault();
        idx = Math.max(0, idx - 1);
        panels[idx].scrollIntoView();
      }
      if (k === "Home") {
        e.preventDefault();
        idx = 0;
        panels[0].scrollIntoView();
      }
      if (k === "End") {
        e.preventDefault();
        idx = panels.length - 1;
        panels[idx].scrollIntoView();
      }
    };
    document.addEventListener("keydown", onKeydown);

    const deck = root.querySelector<HTMLElement>(".deck");
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      panels.forEach((p, i) => {
        const r = p.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) idx = i;
      });
    };
    deck?.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      document.removeEventListener("keydown", onKeydown);
      deck?.removeEventListener("scroll", onScroll);
      dots.forEach((d) => d.remove());
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`curr-map ${archivo.variable} ${ibmPlexMono.variable} ${interTight.variable}`}
    >
      <nav
        className="rail"
        id="rail"
        aria-label="Section navigation"
        ref={railRef}
      ></nav>
      <div className="counter">
        <i id="cur" ref={curRef}>
          01
        </i>{" "}
        /{" "}
        <span id="tot" ref={totRef}>
          09
        </span>
      </div>

      <main className="deck" id="deck">
        {/* 01 COVER */}
        <section className="panel cover" data-label="Cover">
          <div className="frame">
            <div className="eyebrow">Currents · Gold Coast, Australia</div>
            <h1>
              Product
              <br />
              architecture
              <br />
              <span className="lime">map.</span>
            </h1>
            <p className="lead mt">
              What we build, in what order, and why — with relationships as the
              product and everything else supporting them.
            </p>
            <div className="meta">
              <div>
                Document
                <span>Architecture · v0.2</span>
              </div>
              <div>
                Status
                <span>Working draft · assumptions marked</span>
              </div>
              <div>
                Audience
                <span>Founders, dev, partners</span>
              </div>
              <div>
                Reads with
                <span>Identity document</span>
              </div>
            </div>
            <div className="hint">
              Arrow keys or scroll to move · 9 sections
            </div>
          </div>
          <svg
            className="tide"
            viewBox="0 0 1600 120"
            preserveAspectRatio="none"
          >
            <path d="M0,74 C200,44 340,104 540,78 C740,52 880,106 1080,80 C1280,54 1420,98 1600,72" />
            <path
              className="b"
              d="M0,92 C220,66 360,120 560,96 C760,72 900,122 1100,98 C1300,74 1440,114 1600,90"
            />
          </svg>
        </section>

        {/* 02 ORGANISING PRINCIPLE */}
        <section className="panel" data-label="Organising principle">
          <div className="frame">
            <div className="eyebrow">01 · The organising principle</div>
            <h2>
              Relationships are the product.{" "}
              <span className="lime">Everything else supports them.</span>
            </h2>
            <div className="split mt">
              <div>
                <p>
                  Currents is an in-real-life business. Value is made between
                  people who are physically present. That single fact decides
                  the whole stack: no system in this map is the product, and
                  none of them are allowed to compete with the room for
                  attention or budget.
                </p>
                <p>
                  So the architecture isn&apos;t a feature list. It&apos;s the
                  arc a person travels around a gathering — and every tool hangs
                  off the point in that arc where it actually does work.
                </p>
              </div>
              <div className="rulebox l">
                <div className="tag l">The test</div>
                <p className="quote mts">
                  Does it make the next room better, or the last one travel
                  further?
                </p>
                <p className="mts">
                  If neither, it doesn&apos;t get built this year — however good
                  it looks in a deck. Most ideas die honestly against this
                  question, which is the point of having it.
                </p>
              </div>
            </div>
          </div>
          <svg
            className="tide"
            viewBox="0 0 1600 120"
            preserveAspectRatio="none"
          >
            <path d="M0,80 C240,50 380,108 580,84 C780,58 920,110 1120,86 C1320,60 1460,100 1600,78" />
          </svg>
        </section>

        {/* 03 THE SPINE */}
        <section className="panel" data-label="The spine">
          <div className="frame">
            <div className="eyebrow">
              02 · The spine — eight moments around a gathering
            </div>
            <h2 className="wide">
              Every system exists to serve one of these eight moments.
            </h2>
            <div className="spine">
              <svg
                className="spinewave"
                viewBox="0 0 1600 64"
                preserveAspectRatio="none"
              >
                <path d="M0,32 C100,10 200,54 300,32 C400,10 500,54 600,32 C700,10 800,54 900,32 C1000,10 1100,54 1200,32 C1300,10 1400,54 1500,32 C1550,21 1580,27 1600,32" />
              </svg>
              <div className="stations">
                <div className="st">
                  <div className="no">S/01</div>
                  <div className="name">Find out it exists</div>
                  <div className="dot"></div>
                  <ul className="sys">
                    <li>Website</li>
                    <li>Social &amp; content</li>
                    <li>Member word of mouth</li>
                    <li>Partner cross-posting</li>
                  </ul>
                  <div className="ph">Phase 1</div>
                </div>
                <div className="st">
                  <div className="no">S/02</div>
                  <div className="name">Decide to come</div>
                  <div className="dot"></div>
                  <ul className="sys">
                    <li>Public calendar</li>
                    <li>Event pages</li>
                    <li>Ticketing &amp; RSVP</li>
                    <li>Member vs guest pricing</li>
                  </ul>
                  <div className="ph">Phase 1</div>
                </div>
                <div className="st">
                  <div className="no">S/03</div>
                  <div className="name">Turn up and be known</div>
                  <div className="dot"></div>
                  <ul className="sys">
                    <li>Join flow (the door)</li>
                    <li>Member profile</li>
                    <li>Check-in</li>
                    <li>Name badges</li>
                  </ul>
                  <div className="ph">Phase 1</div>
                </div>
                <div className="st">
                  <div className="no">S/04</div>
                  <div className="name">
                    Meet the right person, not a random one
                  </div>
                  <div className="dot"></div>
                  <ul className="sys">
                    <li>Member map</li>
                    <li>Host intro brief</li>
                    <li>Format &amp; seating design</li>
                    <li>Ask / offer field</li>
                  </ul>
                  <div className="ph">Phase 1</div>
                </div>
                <div className="st">
                  <div className="no">S/05</div>
                  <div className="name">Have the encounter captured</div>
                  <div className="dot"></div>
                  <ul className="sys">
                    <li>Capture kit &amp; run sheet</li>
                    <li>On-site interviews</li>
                    <li>Photo &amp; audio</li>
                    <li>Consent at capture</li>
                  </ul>
                  <div className="ph">Phase 1</div>
                </div>
                <div className="st p2">
                  <div className="no">S/06</div>
                  <div className="name">
                    Get followed up while it&apos;s warm
                  </div>
                  <div className="dot"></div>
                  <ul className="sys">
                    <li>Post-event sequence</li>
                    <li>Their clip, sent to them</li>
                    <li>Intro requests</li>
                    <li>48-hour turnaround SOP</li>
                  </ul>
                  <div className="ph">Phase 2</div>
                </div>
                <div className="st p2">
                  <div className="no">S/07</div>
                  <div className="name">Stay connected until the next one</div>
                  <div className="dot"></div>
                  <ul className="sys">
                    <li>WhatsApp community</li>
                    <li>Newsletter</li>
                    <li>Webinars</li>
                    <li>Resource hub</li>
                  </ul>
                  <div className="ph">Phase 2</div>
                </div>
                <div className="st p2">
                  <div className="no">S/08</div>
                  <div className="name">Come back and bring someone</div>
                  <div className="dot"></div>
                  <ul className="sys">
                    <li>Invite mechanism</li>
                    <li>Vetting SOP</li>
                    <li>Member-hosted nodes</li>
                    <li>Recognition loop</li>
                  </ul>
                  <div className="ph">Phase 2</div>
                </div>
              </div>
              <div className="spinelabel">
                <span>← Get them to the room</span>
                <span>Make the room better</span>
                <span>Carry the room outward</span>
                <span>Bring them back →</span>
              </div>
            </div>
          </div>
        </section>

        {/* 04 FOUR LAYERS */}
        <section className="panel" data-label="Four layers">
          <div className="frame">
            <div className="eyebrow">03 · The layers</div>
            <h2 className="wide">
              Four layers, and one boundary that matters.
            </h2>
            <div className="bands">
              <div className="band core">
                <div className="lbl">Gather</div>
                <p>
                  <strong>Moments 1–4. The core product.</strong> Everything
                  that gets the right people into a room together and makes sure
                  they meet someone worth meeting. If this layer is weak,
                  nothing downstream has anything to work with. Most of the
                  budget belongs here — and most of it is human time, not
                  software.
                </p>
              </div>
              <div className="band mid">
                <div className="lbl">Capture</div>
                <p>
                  <strong>Moment 5.</strong> Turning a night into an asset:
                  interviews, footage, photos, the notes and the consent that go
                  with them. This is the branding and marketing arm doing its
                  highest-value work — for the member first, for Currents
                  second.
                </p>
              </div>
              <div className="band mid">
                <div className="lbl">Extend</div>
                <p>
                  <strong>Moments 6–8.</strong> The membrane between rooms.
                  Follow-up, chat, newsletter, webinars, the resource hub, the
                  invite loop. Its job is to keep the relationship alive at low
                  cost — not to become a destination in its own right.
                </p>
              </div>
              <div className="boundary">
                Trust boundary — nothing crosses without consent
              </div>
              <div className="band down">
                <div className="lbl">Insight</div>
                <p>
                  <strong>Downstream of everything.</strong> Aggregate ecosystem
                  intelligence, built from what the community chose to share.
                  Real revenue with real limits — a by-product we sell
                  carefully, never an input the other layers are shaped around.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 05 INVENTORY */}
        <section className="panel" data-label="Inventory">
          <div className="frame">
            <div className="eyebrow">04 · System inventory</div>
            <h2 className="wide">
              What each thing is, and whether we buy it or build it.
            </h2>
            <table className="tbl">
              <thead>
                <tr>
                  <th>System</th>
                  <th>What it does</th>
                  <th>Moment</th>
                  <th>Buy / build</th>
                  <th>Phase</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="n">Website</td>
                  <td>
                    The shopfront and the argument. Identity, manifesto, model,
                    the way in.
                  </td>
                  <td className="m">S1</td>
                  <td className="m">Built — static, hosted</td>
                  <td className="m p1">1 · live</td>
                </tr>
                <tr>
                  <td className="n">The door</td>
                  <td>
                    Join flow that actually captures someone and hands them the
                    next two steps.
                  </td>
                  <td className="m">S3</td>
                  <td className="m">Buy — form service</td>
                  <td className="m p1">1 · urgent</td>
                </tr>
                <tr>
                  <td className="n">Calendar</td>
                  <td>
                    One public place showing everything on, with RSVP and guest
                    ticketing.
                  </td>
                  <td className="m">S2</td>
                  <td className="m">Buy — events platform</td>
                  <td className="m p1">1 · urgent</td>
                </tr>
                <tr>
                  <td className="n">Member record</td>
                  <td>
                    Who they are, what they do, what they&apos;re asking for,
                    what they can offer.
                  </td>
                  <td className="m">S3–4</td>
                  <td className="m">Buy — database tool</td>
                  <td className="m p1">1</td>
                </tr>
                <tr>
                  <td className="n">Member map</td>
                  <td>
                    The internal view that lets a host make the right
                    introduction on the night.
                  </td>
                  <td className="m">S4</td>
                  <td className="m">Buy — view on the above</td>
                  <td className="m p1">1</td>
                </tr>
                <tr>
                  <td className="n">Capture kit &amp; SOP</td>
                  <td>
                    Run sheet, gear list, interview format, consent — so any
                    node captures to the same standard.
                  </td>
                  <td className="m">S5</td>
                  <td className="m">Write — document</td>
                  <td className="m p1">1</td>
                </tr>
                <tr>
                  <td className="n">Chat community</td>
                  <td>
                    The between-rooms membrane. Already live and already the
                    most used surface.
                  </td>
                  <td className="m">S7</td>
                  <td className="m">Buy — in place</td>
                  <td className="m p1">1 · live</td>
                </tr>
                <tr>
                  <td className="n">Follow-up sequence</td>
                  <td>
                    Their clip and their intros, back to them inside 48 hours,
                    while it&apos;s warm.
                  </td>
                  <td className="m">S6</td>
                  <td className="m">Buy + SOP</td>
                  <td className="m p2">2</td>
                </tr>
                <tr>
                  <td className="n">Newsletter</td>
                  <td>
                    Rhythm, recognition, what&apos;s on next. One send, one job.
                  </td>
                  <td className="m">S7</td>
                  <td className="m">Buy — email tool</td>
                  <td className="m p2">2</td>
                </tr>
                <tr>
                  <td className="n">Resource hub</td>
                  <td>
                    Member-taught material and the give-first library.
                    Long-tail, searchable, useful when nothing&apos;s on.
                  </td>
                  <td className="m">S7</td>
                  <td className="m">Buy — wiki / site pages</td>
                  <td className="m p2">2</td>
                </tr>
                <tr>
                  <td className="n">Survey loop</td>
                  <td>
                    Recurring, short, opt-in. Feeds programming decisions and,
                    later, the insight product.
                  </td>
                  <td className="m">S7</td>
                  <td className="m">Buy — form service</td>
                  <td className="m p2">2</td>
                </tr>
                <tr>
                  <td className="n">Node pack</td>
                  <td>
                    Manifesto, constitution, conflict SOP, event SOP, funding
                    split, brand kit. The actual rails.
                  </td>
                  <td className="m">All</td>
                  <td className="m">Write — document</td>
                  <td className="m p2">2</td>
                </tr>
                <tr>
                  <td className="n">Insight product</td>
                  <td>
                    Aggregate ecosystem reporting. Real revenue, sold carefully,
                    never the headline.
                  </td>
                  <td className="m">—</td>
                  <td className="m">Build — later</td>
                  <td className="m p3">3</td>
                </tr>
                <tr>
                  <td className="n">Public directory</td>
                  <td>
                    Outward-facing view of the ecosystem for investors and
                    partners.
                  </td>
                  <td className="m">—</td>
                  <td className="m">Build — later</td>
                  <td className="m p3">3</td>
                </tr>
              </tbody>
            </table>
            <p className="mts">
              <strong>Note the pattern:</strong> almost nothing in phase 1 is a
              build. For an in-real-life business the correct default is to
              assemble off-the-shelf tools and spend the saved money on the
              rooms. Custom software is a later conversation, and only if a
              bought tool has visibly failed us first.
            </p>
          </div>
        </section>

        {/* 06 PHASES */}
        <section className="panel" data-label="Phasing">
          <div className="frame">
            <div className="eyebrow">05 · Sequencing</div>
            <h2 className="wide">
              Get the room working, extend it, then monetise what it produces.
            </h2>
            <div className="split3 mt">
              <div>
                <div className="tag l">Phase one · the room works</div>
                <ul className="plain mts">
                  <li>
                    <b>Connect the door.</b> The join form captures nothing
                    right now — nobody can actually join. The single
                    highest-value fix on this page.
                  </li>
                  <li>
                    <b>Two links behind it.</b> The chat and the calendar.
                    That&apos;s the whole onboarding for now.
                  </li>
                  <li>
                    <b>One public calendar.</b> Everything on, bookable, member
                    vs guest pricing.
                  </li>
                  <li>
                    <b>A member record worth having.</b> Four fields beats
                    forty.
                  </li>
                  <li>
                    <b>The capture SOP.</b> Written once, used at every event.
                  </li>
                </ul>
              </div>
              <div>
                <div className="tag t">Phase two · the membrane</div>
                <ul className="plain t mts">
                  <li>
                    <b>Follow-up engine.</b> Automated where it can be, human
                    where it counts.
                  </li>
                  <li>
                    <b>Newsletter with a job.</b> Rhythm and recognition.
                  </li>
                  <li>
                    <b>Webinars as low-cost nodes.</b> With a give-first bar on
                    every host.
                  </li>
                  <li>
                    <b>Resource hub.</b> Member-taught, long-tail, searchable.
                  </li>
                  <li>
                    <b>Survey loop.</b> Stops us programming from our own echo
                    chamber.
                  </li>
                  <li>
                    <b>Node pack.</b> The bundle a chapter partner receives.
                  </li>
                </ul>
              </div>
              <div>
                <div className="tag f">
                  Phase three · only after the above is real
                </div>
                <ul className="plain f mts">
                  <li>
                    <b>The insight product.</b> Aggregate reporting, sold
                    carefully.
                  </li>
                  <li>
                    <b>The public directory.</b> The outward-facing view of the
                    ecosystem.
                  </li>
                  <li>
                    <b>Chapters.</b> Already beginning — backed by someone
                    already in that room, running the node pack.
                  </li>
                </ul>
              </div>
            </div>
            <div className="rulebox f mt">
              <p>
                <strong>Sequencing is the whole argument.</strong> Every
                phase-three item depends on a community that&apos;s already
                generous with its data. That generosity is earned in phases one
                and two, and it can&apos;t be skipped.
              </p>
            </div>
          </div>
          <svg
            className="tide"
            viewBox="0 0 1600 120"
            preserveAspectRatio="none"
          >
            <path d="M0,76 C200,106 340,52 540,80 C740,108 880,54 1080,82 C1280,110 1420,66 1600,88" />
          </svg>
        </section>

        {/* 07 DATA & TRUST */}
        <section className="panel" data-label="Data & trust">
          <div className="frame">
            <div className="eyebrow">06 · The trust boundary</div>
            <h2 className="wide">
              Data is a by-product. Architect it that way.
            </h2>
            <div className="split3 mt">
              <div className="card">
                <span className="num">D/01</span>
                <h3>Collected at the edges</h3>
                <p>
                  Join form, event RSVPs, surveys, and what people tell us in
                  the room. All of it opt-in, all of it useful to the member
                  before it&apos;s useful to us.
                </p>
              </div>
              <div className="card t">
                <span className="num">D/02</span>
                <h3>Used inside first</h3>
                <p>
                  The primary use is making better introductions and better
                  programming. If a field doesn&apos;t improve a room, we
                  shouldn&apos;t be asking for it.
                </p>
              </div>
              <div className="card f">
                <span className="num">D/03</span>
                <h3>Sold only in aggregate</h3>
                <p>
                  Nothing identifiable leaves without explicit, specific
                  permission. Members who contribute more get something back —
                  access, tickets, services, exposure.
                </p>
              </div>
            </div>
            <div className="rulebox f mt">
              <div className="tag f">Internal only — sell it carefully</div>
              <p className="mts">
                The insight product is real revenue but it never leads the
                story, and we don&apos;t front-face &quot;we make money off your
                data.&quot; Keep it quiet, keep it aggregate, keep it clearly in
                service of the community.{" "}
                <strong>
                  Before the first report is sold, get a straight answer on
                  privacy obligations
                </strong>{" "}
                — selling analysis built on identifiable business information is
                a different legal question to running a mailing list.
              </p>
            </div>
          </div>
          <svg
            className="tide"
            viewBox="0 0 1600 120"
            preserveAspectRatio="none"
          >
            <path d="M0,74 C230,104 370,50 570,78 C770,106 910,52 1110,80 C1310,108 1450,64 1600,86" />
          </svg>
        </section>

        {/* 08 OPEN DECISIONS */}
        <section className="panel" data-label="Open decisions">
          <div className="frame">
            <div className="eyebrow">07 · Open decisions</div>
            <h2 className="wide">What the meeting has to settle.</h2>
            <div className="split mt">
              <div>
                <div className="tag l">Needed before anyone builds</div>
                <ul className="plain mts">
                  <li>
                    <b>Who builds and maintains this?</b> Staff, contractor, or
                    us with no-code tools. Every other answer on this page
                    changes depending on it.
                  </li>
                  <li>
                    <b>What&apos;s the budget and the horizon?</b> What must be
                    live for the next event versus what&apos;s a twelve-month
                    build.
                  </li>
                  <li>
                    <b>What tools are already paid for?</b> Including the
                    partner&apos;s event software — we should look at it before
                    choosing anything else.
                  </li>
                  <li>
                    <b>Membership pricing.</b> No numbers have been run. Phase 1
                    can&apos;t be scoped without knowing what baseline ops cost
                    per month.
                  </li>
                </ul>
              </div>
              <div>
                <div className="tag f">Assumptions in this map</div>
                <ul className="plain f mts">
                  <li>
                    That off-the-shelf tools are acceptable, rather than an
                    owned platform being a goal in itself.
                  </li>
                  <li>
                    That members will fill in a member record honestly if the
                    return is better introductions.
                  </li>
                  <li>
                    That the insight product has a buyer at a price worth the
                    work — untested.
                  </li>
                  <li>
                    That the media arm has capacity to capture every event —
                    depends on what&apos;s paid for.
                  </li>
                  <li>
                    That chat stays the primary between-rooms surface rather
                    than something owned.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <svg
            className="tide"
            viewBox="0 0 1600 120"
            preserveAspectRatio="none"
          >
            <path d="M0,84 C220,114 360,60 560,88 C760,116 900,62 1100,90 C1300,118 1440,72 1600,94" />
          </svg>
        </section>

        {/* 09 THE WHOLE PIE */}
        <section className="panel" data-label="The whole pie">
          <div className="frame">
            <div className="eyebrow">08 · In one line</div>
            <h2 className="wide">
              The whole pie, and where any one slice sits.
            </h2>
            <div className="mt">
              <p className="lead">
                Currents makes its money from relationships formed in rooms.
                Everything in this map either fills a room, improves a room,
                records a room, or carries a room somewhere it couldn&apos;t
                otherwise reach. The data business is what&apos;s left over once
                all four are working — valuable, real, and last in the queue.
              </p>
            </div>
            <div className="split3 mt">
              <div className="card">
                <span className="num">If you&apos;re building</span>
                <h3>Start at the door</h3>
                <p>
                  Nobody can join. Fix that before anything else on this page,
                  and the rest can be sequenced calmly.
                </p>
              </div>
              <div className="card t">
                <span className="num">If you&apos;re deciding</span>
                <h3>Use the test</h3>
                <p>
                  Next room better, or last room further. Anything that does
                  neither goes to the parking lot, not the backlog.
                </p>
              </div>
              <div className="card f">
                <span className="num">If you&apos;re reviewing</span>
                <h3>Argue with the flags</h3>
                <p>
                  Every orange block on this deck is an assumption or a risk,
                  not a decision. Tell us where it&apos;s wrong.
                </p>
              </div>
            </div>
          </div>
          <svg
            className="tide"
            viewBox="0 0 1600 120"
            preserveAspectRatio="none"
          >
            <path d="M0,78 C240,48 380,102 580,78 C780,54 920,106 1120,82 C1320,58 1460,98 1600,74" />
            <path
              className="b"
              d="M0,96 C240,66 380,120 580,96 C780,72 920,124 1120,100 C1320,76 1460,116 1600,92"
            />
          </svg>
        </section>
      </main>
    </div>
  );
}
