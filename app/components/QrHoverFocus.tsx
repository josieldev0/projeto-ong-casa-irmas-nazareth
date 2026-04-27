"use client";

import { useEffect } from "react";

export function QrHoverFocus() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(".qr-focus-trigger")
    );
    if (!targets.length) return;

    const onEnter = () => document.body.classList.add("qr-focus-active");
    const onLeave = () => document.body.classList.remove("qr-focus-active");

    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      el.addEventListener("focusin", onEnter);
      el.addEventListener("focusout", onLeave);
    });

    return () => {
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.removeEventListener("focusin", onEnter);
        el.removeEventListener("focusout", onLeave);
      });
      document.body.classList.remove("qr-focus-active");
    };
  }, []);

  return null;
}
