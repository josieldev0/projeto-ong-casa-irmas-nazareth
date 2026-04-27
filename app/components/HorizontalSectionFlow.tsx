"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let horizontalPluginsReady = false;

export function HorizontalSectionFlow() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (!horizontalPluginsReady) {
      gsap.registerPlugin(ScrollTrigger);
      horizontalPluginsReady = true;
    }

    const wrapper = document.querySelector<HTMLElement>("#housing-horizontal-flow");
    const track = document.querySelector<HTMLElement>("#housing-horizontal-track");
    if (!wrapper || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const panels = Array.from(
        track.querySelectorAll<HTMLElement>(".horizontal-panel")
      );
      const textTweens: gsap.core.Tween[] = [];
      gsap.set(track, { xPercent: 0, willChange: "transform" });
      const scrollStretch = 1.45;

      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () =>
            `+=${Math.max(0, (track.scrollWidth - window.innerWidth) * scrollStretch)}`,
          scrub: 1.85,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel) => {
        if (panel.id !== "cestas" && panel.id !== "leite") return;

        const text = panel.querySelector<HTMLElement>("[data-morph-text]");
        if (!text) return;

        const alignTargets = Array.from(
          text.querySelectorAll<HTMLElement>(":scope > p, :scope > h2, :scope > h3, :scope > div")
        );

        const panelRect = panel.getBoundingClientRect();
        const textRect = text.getBoundingClientRect();
        const centeredDelta =
          panelRect.left + panelRect.width / 2 - (textRect.left + textRect.width / 2);

        gsap.set(text, {
          x: centeredDelta,
          y: 14,
          scale: 0.99,
          rotate: 0.2,
          filter: "blur(2px)",
          willChange: "transform,filter",
        });

        alignTargets.forEach((target) => {
          const targetRect = target.getBoundingClientRect();
          const centeredMargin = Math.max(0, (textRect.width - targetRect.width) / 2);
          gsap.set(target, {
            marginLeft: centeredMargin,
            marginRight: centeredMargin,
            willChange: "margin",
          });
        });

        textTweens.push(
          gsap.to(text, {
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left 86%",
              end: "left 42%",
              scrub: 1.1,
              invalidateOnRefresh: true,
            },
          })
        );

        textTweens.push(
          gsap.to(alignTargets, {
            marginLeft: 0,
            marginRight: 0,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left 86%",
              end: "left 42%",
              scrub: 1.1,
              invalidateOnRefresh: true,
            },
          })
        );
      });

      ScrollTrigger.refresh();
      return () => {
        textTweens.forEach((item) => {
          item.scrollTrigger?.kill();
          item.kill();
        });
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { clearProps: "transform,x,willChange" });
        gsap.set(panels, { clearProps: "willChange" });
      };
    });

    return () => mm.revert();
  }, []);

  return null;
}
