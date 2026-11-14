"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Sparkle } from "@phosphor-icons/react";

const MARQUEE_ITEMS = [
  "WEB FRONTEND INTERAKTIF",
  "NEXT.JS & REACT",
  "ANIMASI GSAP",
  "FULLSTACK LARAVEL",
  "APLIKASI MOBILE FLUTTER",
  "ANDROID NATIVE JAVA"
];

export default function KineticMarquee() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const skewWrapRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !trackRef.current) return undefined;

    const track = trackRef.current;
    const skewWrap = skewWrapRef.current;
    const container = containerRef.current;

    let xPercent = 0;
    let direction = -1;
    let boost = 0;
    let speedMultiplier = 1;
    let targetMultiplier = 1;
    let lastScrollY = window.scrollY || 0;

    const skewTo = skewWrap
      ? gsap.quickTo(skewWrap, "skewX", { duration: 0.35, ease: "power3.out" })
      : null;

    const handleScroll = () => {
      const currentY = window.scrollY || 0;
      const delta = currentY - lastScrollY;
      lastScrollY = currentY;

      if (Math.abs(delta) > 0.5) {
        direction = delta > 0 ? -1 : 1;
        boost = Math.min(Math.abs(delta) * 0.045, 0.85);
        if (skewTo) {
          skewTo(Math.max(-8, Math.min(8, delta * -0.18)));
        }
      }
    };

    const handleEnter = () => {
      targetMultiplier = 0.25;
    };

    const handleLeave = () => {
      targetMultiplier = 1;
    };

    const onTick = () => {
      speedMultiplier += (targetMultiplier - speedMultiplier) * 0.08;
      const speed = (0.04 + boost) * speedMultiplier;
      xPercent += speed * direction;
      boost *= 0.92;

      if (boost < 0.01 && skewTo) {
        skewTo(0);
      }

      if (xPercent <= -100 / 3) {
        xPercent += 100 / 3;
      } else if (xPercent > 0) {
        xPercent -= 100 / 3;
      }

      gsap.set(track, { xPercent });
    };

    gsap.ticker.add(onTick);
    window.addEventListener("scroll", handleScroll, { passive: true });
    container?.addEventListener("mouseenter", handleEnter);
    container?.addEventListener("mouseleave", handleLeave);

    return () => {
      gsap.ticker.remove(onTick);
      window.removeEventListener("scroll", handleScroll);
      container?.removeEventListener("mouseenter", handleEnter);
      container?.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative overflow-hidden border-b border-[#1E293B] bg-[#0F172A]/75 py-3.5 backdrop-blur-sm sm:py-5"
    >
      <div ref={skewWrapRef} className="will-change-transform">
        <div ref={trackRef} className="flex w-max whitespace-nowrap">
          {[0, 1, 2].map((copyIdx) => (
            <div
              key={copyIdx}
              className="flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10"
            >
              {MARQUEE_ITEMS.map((item, idx) => (
                <div
                  key={`${copyIdx}-${idx}`}
                  className="flex items-center gap-6 sm:gap-10"
                >
                  <span className="font-display text-base font-extrabold tracking-tight text-[#F8FAFC] sm:text-2xl lg:text-3xl">
                    {item}
                  </span>
                  <Sparkle
                    size={16}
                    weight="fill"
                    className="text-[#38BDF8] sm:h-5 sm:w-5"
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
