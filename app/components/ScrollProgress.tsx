"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const ratio = Math.max(0, Math.min(1, window.scrollY / max));
      progressRef.current?.style.setProperty("--scroll-progress-ratio", ratio.toString());
      raf = window.requestAnimationFrame(update);
    };

    update();

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={progressRef}
      aria-hidden
      className="scroll-progress-indicator pointer-events-none fixed left-3 top-[22svh] z-50 hidden h-[56svh] w-4 lg:block"
      style={{ "--scroll-progress-ratio": "0" } as CSSProperties}
    >
      <span className="scroll-progress-fill" />
    </div>
  );
}
