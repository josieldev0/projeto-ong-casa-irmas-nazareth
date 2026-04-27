"use client";

import { useEffect } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";

function getTargetByHash(hash: string): HTMLElement | null {
  if (!hash || hash === "#") return null;
  if (hash === "#projeto") {
    return document.getElementById("housing-horizontal-flow");
  }
  return document.querySelector<HTMLElement>(hash);
}

export function NavAnchorScroll() {
  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;

    const links = Array.from(
      header.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
    );
    if (!links.length) return;

    const onClick = (event: Event) => {
      const link = event.currentTarget as HTMLAnchorElement | null;
      const href = link?.getAttribute("href") ?? "";
      const target = getTargetByHash(href);
      if (!target) return;

      event.preventDefault();
      link?.classList.add("nav-link-clicked");
      const smoother = ScrollSmoother.get();
      if (smoother) {
        const baseSmooth = smoother.smooth();
        const boostedSmooth = Math.max(baseSmooth, 1.8);
        smoother.smooth(boostedSmooth);
        smoother.scrollTo(target, true, "top top");
        window.setTimeout(() => smoother.smooth(baseSmooth), 950);
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      window.setTimeout(() => link?.classList.remove("nav-link-clicked"), 280);
      if (window.history?.replaceState) {
        window.history.replaceState(null, "", href);
      }
    };

    links.forEach((link) => link.addEventListener("click", onClick));
    return () => {
      links.forEach((link) => link.removeEventListener("click", onClick));
    };
  }, []);

  return null;
}
