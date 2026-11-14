"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const canHover = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    ).matches;

    if (!canHover) return undefined;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return undefined;

    const ringX = gsap.quickTo(ring, "x", { duration: 0.32, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.32, ease: "power3.out" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });

    let isVisible = false;

    const handleMouseMove = (e) => {
      if (!isVisible) {
        isVisible = true;
        gsap.to([ring, dot], { opacity: 1, duration: 0.25 });
      }
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    };

    const handleMouseOver = (e) => {
      const interactive = e.target.closest(
        "a, button, input, [data-cursor-hover]"
      );
      if (interactive) {
        gsap.to(ring, {
          scale: 1.95,
          borderColor: "#38BDF8",
          backgroundColor: "rgba(56, 189, 248, 0.10)",
          duration: 0.28,
          ease: "power2.out"
        });
        gsap.to(dot, {
          scale: 0.5,
          backgroundColor: "#F8FAFC",
          duration: 0.2
        });
      } else {
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(56, 189, 248, 0.55)",
          backgroundColor: "rgba(37, 99, 235, 0.04)",
          duration: 0.28,
          ease: "power2.out"
        });
        gsap.to(dot, {
          scale: 1,
          backgroundColor: "#38BDF8",
          duration: 0.2
        });
      }
    };

    const handleMouseLeaveWindow = () => {
      isVisible = false;
      gsap.to([ring, dot], { opacity: 0, duration: 0.2 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[90] hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#38BDF8]/55 bg-[#2563EB]/[0.04] opacity-0 shadow-[0_0_24px_rgba(56,189,248,0.22)] lg:block"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[91] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#38BDF8] opacity-0 shadow-[0_0_12px_#38BDF8] lg:block"
      />
    </>
  );
}
