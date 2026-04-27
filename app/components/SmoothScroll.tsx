"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

let pluginsReady = false;

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!pluginsReady) {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
      pluginsReady = true;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const existing = ScrollSmoother.get();
    const smoother =
      existing ??
      ScrollSmoother.create({
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
      });

    ScrollTrigger.refresh();

    return () => {
      if (!existing) {
        smoother.kill();
      }
    };
  }, []);

  return null;
}
