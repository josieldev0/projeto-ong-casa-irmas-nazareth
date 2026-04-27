"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal-section]")
    );
    if (!sections.length) return;

    const prepareWords = (element: HTMLElement, baseDelay: number) => {
      if (element.dataset.wordsReady === "true") return;
      if (element.children.length > 0) return;

      const rawText = element.textContent?.trim();
      if (!rawText) return;

      element.dataset.wordsReady = "true";
      element.textContent = "";

      rawText.split(/\s+/).forEach((word, index) => {
        const span = document.createElement("span");
        span.className = "reveal-word";
        span.style.transitionDelay = `${baseDelay + index * 45}ms`;
        span.textContent = word;
        element.appendChild(span);
      });
    };

    const allObjects: HTMLElement[] = [];

    sections.forEach((section) => {
      let objects = Array.from(
        section.querySelectorAll<HTMLElement>("[data-reveal-object]")
      );

      // Mobile/tablet fallback: when no explicit reveal objects are set,
      // use key visual blocks from each section.
      if (!objects.length && section.id !== "inicio") {
        objects = Array.from(
          section.querySelectorAll<HTMLElement>(
            "[data-morph-text], [data-morph-media]:not([data-morph-media-full]), .left-copy, .pix-copy, .pix-visual"
          )
        );
      }

      objects
        .filter((object) => {
          // Ignore nested duplicates so animations stay clean.
          return !objects.some(
            (candidate) => candidate !== object && candidate.contains(object)
          );
        })
        .sort((a, b) => {
        const aRect = a.getBoundingClientRect();
        const bRect = b.getBoundingClientRect();
        const rowDelta = Math.abs(aRect.top - bRect.top);
        if (rowDelta > 36) return aRect.top - bRect.top;
        return aRect.left - bRect.left;
      })
        .forEach((object, index) => {
        const fastSection =
          section.id === "documentos" || section.id === "biblioteca" || section.id === "doacao";
        const objectDelay = fastSection ? index * 45 : index * 90;
        object.setAttribute("data-reveal-object", "");
        object.style.setProperty("--object-reveal-delay", `${objectDelay}ms`);
        object
          .querySelectorAll<HTMLElement>("h1, h2")
          .forEach((target) => prepareWords(target, objectDelay + (fastSection ? 40 : 70)));

        allObjects.push(object);
        });
    });

    if (!allObjects.length) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const object = entry.target as HTMLElement;
          object.classList.add("reveal-visible");
          object
            .querySelectorAll<HTMLElement>("h1, h2")
            .forEach((target) => target.classList.add("words-visible"));
          revealObserver.unobserve(object);
        });
      },
      {
        rootMargin: "0px 0px -2% 0px",
        threshold: 0.08,
      }
    );

    allObjects.forEach((object) => revealObserver.observe(object));
    return () => revealObserver.disconnect();
  }, []);

  return null;
}
