"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const progressBarRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let lenisInstance = null;

    const updateProgress = () => {
      if (!progressBarRef.current) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      progressBarRef.current.style.transform = `scaleX(${progress})`;
    };

    if (!prefersReducedMotion) {
      lenisInstance = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false
      });

      lenisInstance.on("scroll", () => {
        ScrollTrigger.update();
        updateProgress();
      });

      const onTick = (time) => {
        lenisInstance.raf(time * 1000);
      };

      const handleAnchorClick = (event) => {
        const anchor = event.target.closest?.('a[href^="#"]');
        if (!anchor) return;
        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;
        const targetEl = document.getElementById(href.slice(1));
        if (!targetEl) return;

        event.preventDefault();
        const offset = href === "#hero" || href === "#main-content" ? 0 : -80;
        lenisInstance.scrollTo(targetEl, { offset });
      };

      const handleLock = (event) => {
        if (event.detail?.locked) {
          lenisInstance.stop();
        } else {
          lenisInstance.start();
        }
      };

      let isMounted = true;
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => {
          if (isMounted) ScrollTrigger.refresh();
        });
      }

      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
      document.addEventListener("click", handleAnchorClick);
      window.addEventListener("lenis:lock", handleLock);

      updateProgress();

      return () => {
        isMounted = false;
        gsap.ticker.remove(onTick);
        document.removeEventListener("click", handleAnchorClick);
        window.removeEventListener("lenis:lock", handleLock);
        lenisInstance.destroy();
      };
    } else {
      window.addEventListener("scroll", updateProgress, { passive: true });
      updateProgress();
      return () => {
        window.removeEventListener("scroll", updateProgress);
      };
    }
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 right-0 left-0 z-[70] h-[2px] bg-[#1E293B]"
      >
        <div
          ref={progressBarRef}
          className="h-full w-full origin-left scale-x-0 bg-[#38BDF8] transition-transform duration-75 ease-out"
        />
      </div>
      {children}
    </>
  );
}
