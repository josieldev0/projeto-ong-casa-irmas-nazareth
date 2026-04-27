"use client";

import { useEffect } from "react";

export function NavHeroTheme() {
  useEffect(() => {
    const header = document.getElementById("site-header");
    const hero = document.getElementById("inicio");
    if (!header) return;
    header.classList.add("nav-ready");

    let raf = 0;
    let isHidden = false;

    const updateTheme = () => {
      const currentY = window.scrollY;
      const heroHeight = hero?.offsetHeight ?? window.innerHeight;
      // Keep hero contrast while we're still in section 1.
      const shouldUseLightTheme = currentY > Math.max(220, heroHeight - 140);
      header.classList.toggle("nav-scrolled", shouldUseLightTheme);
      // Keep navbar visible for a while; hide only after deeper scrolling.
      const shouldHide = currentY > 180;
      if (shouldHide !== isHidden) {
        isHidden = shouldHide;
        if (shouldHide) {
          header.classList.remove("nav-showing");
          header.classList.add("nav-hiding");
          header.classList.add("nav-hidden");
        } else {
          header.classList.remove("nav-hiding");
          header.classList.remove("nav-hidden");
          header.classList.add("nav-showing");
        }
      }
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(updateTheme);
    };

    updateTheme();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
      header.classList.remove("nav-ready");
    };
  }, []);

  return null;
}
