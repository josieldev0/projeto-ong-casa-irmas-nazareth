"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let scrollTriggerReady = false;

type MorphConfig = {
  start: string;
  end: string;
  scrub: number;
  centerText: boolean;
  textFrom: gsap.TweenVars;
  mediaFrom: gsap.TweenVars;
  mediaAt: number;
};

const defaultConfig: MorphConfig = {
  start: "top 82%",
  end: "top 16%",
  scrub: 1.35,
  centerText: true,
  textFrom: { y: 14, rotate: 0.25, filter: "blur(2px)" },
  mediaFrom: {
    x: 120,
    y: 12,
    scale: 0.94,
    rotate: -0.45,
    clipPath: "inset(8% 0% 8% 18% round 1.5rem)",
    filter: "blur(8px)",
  },
  mediaAt: 0.08,
};

const configBySectionId: Record<string, Partial<MorphConfig>> = {
  // Reuse donation motion style for the requested sections.
  documentos: {
    start: "top 90%",
    end: "top 48%",
    scrub: 0.72,
    centerText: false,
    textFrom: { x: -10, y: 22, scale: 0.97, rotate: 0.35, filter: "blur(3px)" },
    mediaFrom: {
      x: 0,
      y: 38,
      scale: 0.9,
      rotate: -0.8,
      clipPath: "inset(10% 10% 10% 10% round 1.2rem)",
      filter: "blur(8px)",
    },
    mediaAt: 0.02,
  },
  biblioteca: {
    start: "top 90%",
    end: "top 48%",
    scrub: 0.72,
    centerText: false,
    textFrom: { x: -10, y: 22, scale: 0.97, rotate: 0.35, filter: "blur(3px)" },
    mediaFrom: {
      x: 0,
      y: 38,
      scale: 0.9,
      rotate: -0.8,
      clipPath: "inset(10% 10% 10% 10% round 1.2rem)",
      filter: "blur(8px)",
    },
    mediaAt: 0.02,
  },
  contato: {
    start: "top 78%",
    end: "top 16%",
    scrub: 1.55,
    centerText: false,
    textFrom: { x: -18, y: 34, scale: 0.95, rotate: 0.55, filter: "blur(4.5px)" },
    mediaFrom: {
      x: 0,
      y: 62,
      scale: 0.82,
      rotate: -1.4,
      clipPath: "inset(18% 14% 18% 14% round 2rem)",
      filter: "blur(13px)",
    },
    mediaAt: 0.24,
  },
  doacao: {
    start: "top 90%",
    end: "top 48%",
    scrub: 0.72,
    centerText: false,
    textFrom: { x: -10, y: 22, scale: 0.97, rotate: 0.35, filter: "blur(3px)" },
    mediaFrom: {
      x: 0,
      y: 38,
      scale: 0.9,
      rotate: -0.8,
      clipPath: "inset(10% 10% 10% 10% round 1.2rem)",
      filter: "blur(8px)",
    },
    mediaAt: 0.02,
  },
};

export function SectionMorphIntro() {
  useEffect(() => {
    if (!scrollTriggerReady) {
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerReady = true;
    }

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-morph-section]")
    );
    if (!sections.length) return;

    const mm = gsap.matchMedia();

    mm.add("all", () => {
      const isMobileOrTablet = window.matchMedia("(max-width: 1023px)").matches;
      const cleanups: Array<() => void> = [];
      const skipMorphIds = isMobileOrTablet
        ? new Set<string>()
        : new Set(["cestas", "leite"]);

      sections.forEach((section) => {
        if (skipMorphIds.has(section.id)) return;
        const text = section.querySelector<HTMLElement>("[data-morph-text]");
        const media = section.querySelector<HTMLElement>("[data-morph-media]");
        if (!text || !media) return;
        const sectionConfig = configBySectionId[section.id] ?? {};
        const config: MorphConfig = {
          ...defaultConfig,
          ...sectionConfig,
          textFrom: {
            ...defaultConfig.textFrom,
            ...(sectionConfig.textFrom ?? {}),
          },
          mediaFrom: {
            ...defaultConfig.mediaFrom,
            ...(sectionConfig.mediaFrom ?? {}),
          },
        };
        if (isMobileOrTablet) {
          config.start = "top 90%";
          config.end = "top 40%";
          config.scrub = Math.min(config.scrub, 0.85);
        }
        const isFullBleedMedia = media.hasAttribute("data-morph-media-full");

        const alignTargets = Array.from(
          text.querySelectorAll<HTMLElement>(":scope > p, :scope > h2, :scope > h3, :scope > div")
        );

        const getCenteredDelta = () => {
          const sectionRect = section.getBoundingClientRect();
          const textRect = text.getBoundingClientRect();
          return (
            sectionRect.left +
            sectionRect.width / 2 -
            (textRect.left + textRect.width / 2)
          );
        };

        const getInnerCenterMargin = (target: HTMLElement) => {
          const textRect = text.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          return Math.max(0, (textRect.width - targetRect.width) / 2);
        };

        const textFrom = { ...config.textFrom };
        if (config.centerText && textFrom.x === undefined) {
          textFrom.x = getCenteredDelta();
        }

        gsap.set(text, textFrom);
        if (config.centerText) {
          alignTargets.forEach((target) => {
            gsap.set(target, {
              marginLeft: getInnerCenterMargin(target),
              marginRight: getInnerCenterMargin(target),
            });
          });
        } else {
          alignTargets.forEach((target) => {
            gsap.set(target, { marginLeft: 0, marginRight: 0 });
          });
        }
        if (isFullBleedMedia) {
          // Full-bleed media already moves with ScrollSmoother effects.
          // Keep it stable here to avoid transform conflicts/jumps.
          gsap.set(media, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            clipPath: "inset(0% 0% 0% 0% round 0rem)",
            filter: "blur(0px)",
          });
        } else {
          gsap.set(media, {
            autoAlpha: 0,
            ...config.mediaFrom,
          });
        }

        const tl = gsap
          .timeline({ defaults: { ease: "sine.inOut" } })
          .to(
            text,
            { x: 0, y: 0, scale: 1, rotate: 0, filter: "blur(0px)", duration: 1.08 },
            0
          );

        if (config.centerText) {
          tl.to(
            alignTargets,
            { marginLeft: 0, marginRight: 0, duration: 1.02, ease: "sine.inOut" },
            0
          );
        }

        if (!isFullBleedMedia) {
          tl.to(
            media,
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotate: 0,
              clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
              filter: "blur(0px)",
              duration: 1.18,
            },
            config.mediaAt
          );
        }

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: config.start,
          end: config.end,
          scrub: config.scrub,
          invalidateOnRefresh: true,
          animation: tl,
        });

        cleanups.push(() => {
          trigger.kill();
          gsap.set([text, media, ...alignTargets], { clearProps: "all" });
        });
      });

      ScrollTrigger.refresh();
      return () => cleanups.forEach((cleanup) => cleanup());
    });

    return () => mm.revert();
  }, []);

  return null;
}
