"use client";

import { useEffect, useRef, useState } from "react";

/** Base transition classes for the reveal-on-scroll effect; combine with revealState(visible). */
export const REVEAL =
  "transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none";

export function revealState(visible: boolean) {
  return visible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-[22px] motion-reduce:opacity-100 motion-reduce:translate-y-0";
}

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      const t = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, visible] as const;
}
