"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const ORBIT_PATH_D =
  "M -60,220 C 320,100 840,210 885,430 C 930,650 180,580 125,770 C 70,920 620,940 1060,810";

export default function ScrollRocket() {
  const wrapRef = useRef(null);
  const pathRef = useRef(null);
  const litPathRef = useRef(null);
  const rocketRef = useRef(null);
  const spriteRef = useRef(null);
  const flameRef = useRef(null);
  const plumeGlowRef = useRef(null);
  const [resizeTick, setResizeTick] = useState(0);

  useEffect(() => {
    let lastWidth = window.innerWidth;
    let timerId = null;

    const handleResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      if (timerId) window.clearTimeout(timerId);
      timerId = window.setTimeout(() => {
        setResizeTick((prev) => prev + 1);
      }, 180);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      if (timerId) window.clearTimeout(timerId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
      prefersReducedMotion ||
      !pathRef.current ||
      !rocketRef.current ||
      !spriteRef.current
    ) {
      return undefined;
    }

    const rocket = rocketRef.current;
    const sprite = spriteRef.current;
    const flame = flameRef.current;
    const plumeGlow = plumeGlowRef.current;
    const pathEl = pathRef.current;
    const litPathEl = litPathRef.current;

    const ctx = gsap.context(() => {
      gsap.set(rocket, { opacity: 0, scale: 0.85 });
      if (litPathEl) {
        litPathEl.style.strokeDashoffset = "1000";
        litPathEl.style.opacity = "0";
      }
      if (flame) {
        gsap.set(flame, {
          transformOrigin: "100% 50%",
          scaleX: 0.7,
          opacity: 0.45
        });
      }
      if (plumeGlow) {
        gsap.set(plumeGlow, {
          transformOrigin: "100% 50%",
          scaleX: 0.7,
          opacity: 0.25
        });
      }

      gsap.to(rocket, {
        ease: "none",
        motionPath: {
          path: pathEl,
          align: pathEl,
          alignOrigin: [0.5, 0.5],
          autoRotate: true
        },
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.45,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const visibleAlpha =
              p < 0.015 || p > 0.99
                ? 0
                : p < 0.05
                  ? (p - 0.015) / 0.035
                  : p > 0.95
                    ? (0.99 - p) / 0.04
                    : 1;

            const clampedAlpha = Math.max(0, Math.min(1, visibleAlpha));
            gsap.set(rocket, {
              opacity: clampedAlpha,
              scale: 0.9 + clampedAlpha * 0.1
            });

            if (litPathEl) {
              litPathEl.style.strokeDashoffset = String(
                (1000 * (1 - p)).toFixed(2)
              );
              litPathEl.style.opacity = String(
                (clampedAlpha * 0.48).toFixed(3)
              );
            }

            gsap.to(sprite, {
              scaleX: self.direction === -1 ? -1 : 1,
              duration: 0.18,
              overwrite: "auto"
            });

            if (flame || plumeGlow) {
              const speed = Math.min(Math.abs(self.getVelocity()) / 1800, 1);
              if (flame) {
                gsap.to(flame, {
                  scaleX: 0.65 + speed * 1.45,
                  opacity: 0.35 + speed * 0.65,
                  duration: 0.14,
                  overwrite: "auto"
                });
              }
              if (plumeGlow) {
                gsap.to(plumeGlow, {
                  scaleX: 0.65 + speed * 1.6,
                  opacity: 0.2 + speed * 0.55,
                  duration: 0.16,
                  overwrite: "auto"
                });
              }
            }
          }
        }
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [resizeTick]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        fill="none"
        className="h-full w-full"
      >
        <path
          ref={pathRef}
          d={ORBIT_PATH_D}
          stroke="#38BDF8"
          strokeOpacity="0.12"
          strokeWidth="1.4"
          strokeDasharray="6 12"
          vectorEffect="non-scaling-stroke"
        />
        <path
          ref={litPathRef}
          d={ORBIT_PATH_D}
          pathLength="1000"
          stroke="#38BDF8"
          strokeWidth="2"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ opacity: 0 }}
        />
      </svg>

      {/* Undistorted 1:1 Shuttle Sprite aligned to flight curve */}
      <div
        ref={rocketRef}
        className="absolute top-0 left-0 h-9 w-9 opacity-0 will-change-transform sm:h-12 sm:w-12"
      >
        <div ref={spriteRef} className="h-full w-full will-change-transform">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            className="h-full w-full drop-shadow-[0_0_12px_rgba(56,189,248,0.45)]"
          >
            {/* Dynamic Exhaust Thruster Plume & Core */}
            <ellipse
              ref={plumeGlowRef}
              cx="11"
              cy="24"
              rx="7.5"
              ry="4.2"
              fill="#38BDF8"
              fillOpacity="0.35"
            />
            <g ref={flameRef}>
              <path
                d="M15 20.5 L2 24 L15 27.5 Z"
                fill="#38BDF8"
                fillOpacity="0.82"
              />
              <path d="M15 22 L7 24 L15 26 Z" fill="#F8FAFC" />
            </g>

            {/* Stabilizer Fins */}
            <path d="M16 18 L12 12 L23 18 Z" fill="#2563EB" />
            <path d="M16 30 L12 36 L23 30 Z" fill="#2563EB" />

            {/* Tail Collar */}
            <rect x="14" y="20" width="3" height="8" rx="1" fill="#64748B" />

            {/* Shuttle Body & Nose Cone */}
            <path
              d="M16 18.5 C24 18 33 19.2 41 24 C33 28.8 24 30 16 29.5 Z"
              fill="#F8FAFC"
            />

            {/* Cobalt Spine Detail */}
            <path
              d="M18 23.2 H31"
              stroke="#2563EB"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Cyan Observatory Canopy */}
            <circle cx="29.5" cy="24" r="2.6" fill="#38BDF8" />
            <circle cx="30.2" cy="23.4" r="0.9" fill="#F8FAFC" />
          </svg>
        </div>
      </div>
    </div>
  );
}
