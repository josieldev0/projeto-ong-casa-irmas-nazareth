"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

export function IntroEntryAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      tl.fromTo(
        ".intro-shell",
        { autoAlpha: 0, y: 36 },
        { autoAlpha: 1, y: 0, duration: 1.1 }
      )
        .fromTo(
          ".intro-thinking-line-static",
          { yPercent: 52, opacity: 0, scale: 0.96, rotate: 0.6, filter: "blur(10px)" },
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            filter: "blur(0px)",
            duration: 1.25,
            stagger: 0.16,
          },
          0.14
        )
        .fromTo(
          ".intro-thinking-line:not(.intro-thinking-line-static)",
          { yPercent: 62, opacity: 0, scale: 0.95, rotate: 0.8, filter: "blur(12px)" },
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            filter: "blur(0px)",
            duration: 1.35,
          },
          0.42
        )
        .fromTo(
          ".intro-title-line",
          { scaleX: 0, autoAlpha: 0, transformOrigin: "left center" },
          { scaleX: 1, autoAlpha: 1, duration: 1.05, ease: "expo.out" },
          0.72
        )
        .fromTo(
          ".intro-stats-label",
          { y: 24, autoAlpha: 0, scale: 0.96, filter: "blur(10px)" },
          { y: 0, autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 1 },
          0.92
        )
        .fromTo(
          ".intro-stats-value",
          { y: 24, scale: 0.86, autoAlpha: 0, filter: "blur(10px)" },
          { y: 0, scale: 1, autoAlpha: 1, filter: "blur(0px)", duration: 1.1, ease: "back.out(1.8)" },
          1.02
        )
        .fromTo(
          ".intro-hero-title",
          { y: 26, autoAlpha: 0, filter: "blur(10px)" },
          { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" },
          "+=0.1"
        )
        .fromTo(
          ".intro-hero-copy",
          { y: 22, autoAlpha: 0, filter: "blur(9px)" },
          { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" },
          "+=0.2"
        );
    });

    return () => ctx.revert();
  }, []);

  return null;
}
