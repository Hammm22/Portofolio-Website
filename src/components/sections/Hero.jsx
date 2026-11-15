"use client";

import { useRef, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDownRight, FilePdf, ArrowDown } from "@phosphor-icons/react";
import { PROFILE_DATA } from "@/data/profileData";

gsap.registerPlugin(ScrollTrigger);

const HeroObservatory3D = dynamic(() => import("./HeroObservatory3D"), {
  ssr: false
});

const DESKTOP_3D_QUERY =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

function subscribeDesktop3D(callback) {
  const mql = window.matchMedia(DESKTOP_3D_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getDesktop3DSnapshot() {
  return window.matchMedia(DESKTOP_3D_QUERY).matches;
}

function getDesktop3DServerSnapshot() {
  return false;
}

const HERO_WORDS = PROFILE_DATA.heroHeadline.split(" ");

export default function Hero() {
  const sectionRef = useRef(null);
  const contentWrapRef = useRef(null);
  const primaryBtnRef = useRef(null);
  const secondaryBtnRef = useRef(null);
  const orbitRingRef = useRef(null);
  const outerRingRef = useRef(null);
  const parallaxStageRef = useRef(null);
  const scrollCueRef = useRef(null);

  const showDesktop3D = useSyncExternalStore(
    subscribeDesktop3D,
    getDesktop3DSnapshot,
    getDesktop3DServerSnapshot
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.from(".hero-name-reveal", {
          y: 26,
          opacity: 0,
          duration: 0.7,
          clearProps: "transform,opacity"
        })
          .from(
            ".hero-word-inner",
            {
              yPercent: 120,
              rotateZ: 4,
              duration: 0.85,
              stagger: 0.055,
              clearProps: "transform"
            },
            "-=0.45"
          )
          .from(
            ".hero-sub-reveal",
            {
              y: 28,
              opacity: 0,
              duration: 0.75,
              stagger: 0.1,
              clearProps: "transform,opacity"
            },
            "-=0.5"
          )
          .from(
            ".hero-constellation-line",
            {
              strokeDashoffset: 320,
              duration: 1.4,
              stagger: 0.14,
              ease: "power2.out"
            },
            "-=0.75"
          );

        if (orbitRingRef.current) {
          gsap.to(orbitRingRef.current, {
            rotation: 360,
            duration: 52,
            repeat: -1,
            ease: "none",
            svgOrigin: "600 350"
          });
        }

        if (outerRingRef.current) {
          gsap.to(outerRingRef.current, {
            rotation: -360,
            duration: 74,
            repeat: -1,
            ease: "none",
            svgOrigin: "600 350"
          });
        }

        if (scrollCueRef.current) {
          gsap.to(scrollCueRef.current, {
            y: 6,
            duration: 1.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }

        if (contentWrapRef.current) {
          gsap.to(contentWrapRef.current, {
            yPercent: -16,
            scale: 0.95,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.6
            }
          });
        }
      });

      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        const cleanups = [];

        // Mobile Scroll-Scrubbed Orbital Depth Parallax
        if (parallaxStageRef.current) {
          gsap.to(parallaxStageRef.current, {
            scale: 1.16,
            rotation: 12,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.55
            }
          });
        }

        // Tactile Spring Tap Feedback on Mobile CTA Buttons
        const mobileButtons = [primaryBtnRef.current, secondaryBtnRef.current].filter(
          Boolean
        );
        mobileButtons.forEach((btn) => {
          const onPressDown = () => {
            gsap.to(btn, {
              scale: 0.94,
              duration: 0.12,
              ease: "power2.out",
              overwrite: "auto"
            });
          };
          const onPressUp = () => {
            gsap.to(btn, {
              scale: 1,
              duration: 0.45,
              ease: "elastic.out(1.1, 0.5)",
              overwrite: "auto"
            });
          };

          btn.addEventListener("pointerdown", onPressDown);
          btn.addEventListener("pointerup", onPressUp);
          btn.addEventListener("pointercancel", onPressUp);
          btn.addEventListener("pointerleave", onPressUp);
          cleanups.push(() => {
            btn.removeEventListener("pointerdown", onPressDown);
            btn.removeEventListener("pointerup", onPressUp);
            btn.removeEventListener("pointercancel", onPressUp);
            btn.removeEventListener("pointerleave", onPressUp);
          });
        });

        return () => cleanups.forEach((fn) => fn());
      });

      mm.add(
        "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const cleanups = [];
          const buttons = [primaryBtnRef.current, secondaryBtnRef.current].filter(
            Boolean
          );

          buttons.forEach((btn) => {
            const xTo = gsap.quickTo(btn, "x", {
              duration: 0.35,
              ease: "power3.out"
            });
            const yTo = gsap.quickTo(btn, "y", {
              duration: 0.35,
              ease: "power3.out"
            });

            const handleMove = (e) => {
              const rect = btn.getBoundingClientRect();
              const relX = e.clientX - (rect.left + rect.width / 2);
              const relY = e.clientY - (rect.top + rect.height / 2);
              xTo(relX * 0.32);
              yTo(relY * 0.32);
            };

            const handleReset = () => {
              xTo(0);
              yTo(0);
            };

            btn.addEventListener("mousemove", handleMove);
            btn.addEventListener("mouseleave", handleReset);
            window.addEventListener("scroll", handleReset, { passive: true });

            cleanups.push(() => {
              btn.removeEventListener("mousemove", handleMove);
              btn.removeEventListener("mouseleave", handleReset);
              window.removeEventListener("scroll", handleReset);
            });
          });

          const sectionEl = sectionRef.current;
          const stageEl = parallaxStageRef.current;
          if (sectionEl && stageEl) {
            const stageX = gsap.quickTo(stageEl, "x", {
              duration: 0.7,
              ease: "power3.out"
            });
            const stageY = gsap.quickTo(stageEl, "y", {
              duration: 0.7,
              ease: "power3.out"
            });

            const handleStageMove = (e) => {
              const rect = sectionEl.getBoundingClientRect();
              const nx = (e.clientX - rect.left) / rect.width - 0.5;
              const ny = (e.clientY - rect.top) / rect.height - 0.5;
              stageX(nx * -22);
              stageY(ny * -16);
            };

            const handleStageLeave = () => {
              stageX(0);
              stageY(0);
            };

            sectionEl.addEventListener("mousemove", handleStageMove);
            sectionEl.addEventListener("mouseleave", handleStageLeave);
            cleanups.push(() => {
              sectionEl.removeEventListener("mousemove", handleStageMove);
              sectionEl.removeEventListener("mouseleave", handleStageLeave);
            });
          }

          return () => cleanups.forEach((fn) => fn());
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[calc(100dvh-4.5rem)] items-center justify-center overflow-hidden border-b border-[#1E293B] bg-[#060B19]/55 py-12 sm:py-20"
    >
      {/* Orbital Rings & Constellation Backdrop */}
      <div
        ref={parallaxStageRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-24px]"
      >
        <svg
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          className="h-full w-full opacity-55"
        >
          <g ref={orbitRingRef}>
            <circle
              cx="600"
              cy="350"
              r="280"
              stroke="#1E293B"
              strokeWidth="1.2"
              strokeDasharray="8 12"
            />
            <circle cx="600" cy="70" r="4" fill="#38BDF8" />
            <circle cx="880" cy="350" r="3" fill="#2563EB" />
            <circle cx="320" cy="350" r="3.5" fill="#38BDF8" />
          </g>

          <g ref={outerRingRef}>
            <circle
              cx="600"
              cy="350"
              r="410"
              stroke="#2563EB"
              strokeOpacity="0.28"
              strokeWidth="1.2"
              strokeDasharray="4 14"
            />
            <circle cx="600" cy="-60" r="3" fill="#38BDF8" />
            <circle cx="1010" cy="350" r="3.5" fill="#38BDF8" />
          </g>

          <g
            className="hero-constellation-line"
            stroke="#38BDF8"
            strokeOpacity="0.34"
            strokeWidth="1.2"
            strokeDasharray="320"
          >
            <line x1="110" y1="130" x2="255" y2="82" />
            <line x1="255" y1="82" x2="385" y2="150" />
            <line x1="825" y1="110" x2="965" y2="165" />
            <line x1="965" y1="165" x2="1095" y2="92" />
          </g>

          <g fill="#38BDF8" fillOpacity="0.75">
            <circle cx="110" cy="130" r="3" />
            <circle cx="255" cy="82" r="3.5" />
            <circle cx="385" cy="150" r="2.5" />
            <circle cx="825" cy="110" r="3" />
            <circle cx="965" cy="165" r="3.5" />
            <circle cx="1095" cy="92" r="2.5" />
          </g>
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div
            ref={contentWrapRef}
            className="text-center will-change-transform lg:col-span-7 lg:text-left"
          >
            <h1>
              <span className="hero-name-reveal block text-xs font-semibold tracking-wide text-[#38BDF8] sm:text-base">
                {PROFILE_DATA.name} ({PROFILE_DATA.handle}) · Web &amp; Mobile Developer
              </span>

              {/* Split-Word Curtain Mask Headline */}
              <span className="font-display-hero mt-3 flex flex-wrap justify-center gap-x-[0.26em] gap-y-1 font-extrabold text-[#F8FAFC] sm:mt-4 lg:justify-start">
                {HERO_WORDS.map((word, idx) => {
                  const isHighlight = word.toLowerCase().includes("interaktif");
                  return (
                    <span
                      key={idx}
                      className="inline-block overflow-hidden pb-1.5 sm:pb-2"
                    >
                      <span
                        className={`hero-word-inner inline-block will-change-transform ${
                          isHighlight ? "text-[#38BDF8]" : ""
                        }`}
                      >
                        {word}
                      </span>
                    </span>
                  );
                })}
              </span>
            </h1>

            <p className="hero-sub-reveal mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#CBD5E1] sm:mt-5 sm:text-lg lg:mx-0">
              {PROFILE_DATA.heroSummary}
            </p>

            <div className="hero-sub-reveal mx-auto mt-7 flex max-w-xs flex-col items-stretch justify-center gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:items-center sm:gap-4 lg:mx-0 lg:justify-start">
              <a
                ref={primaryBtnRef}
                href="#projects"
                className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-md bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-[#F8FAFC] shadow-[0_10px_34px_rgba(37,99,235,0.42)] transition-colors hover:bg-[#1D4ED8] sm:px-7"
              >
                <span>Lihat Karya</span>
                <ArrowDownRight size={18} weight="bold" aria-hidden="true" />
              </a>

              <a
                ref={secondaryBtnRef}
                href={PROFILE_DATA.cvUrl}
                download="CV-Ilham-Dwi-Arsandy.pdf"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-[#64748B] bg-[#0F172A]/90 px-6 py-3.5 text-sm font-medium text-[#F8FAFC] transition-colors hover:border-[#38BDF8] hover:bg-[#131F38]"
              >
                <FilePdf
                  size={18}
                  weight="duotone"
                  className="text-[#38BDF8]"
                  aria-hidden="true"
                />
                <span>Unduh CV</span>
              </a>
            </div>
          </div>

          <div className="hidden lg:col-span-5 lg:flex lg:items-center lg:justify-center">
            {showDesktop3D ? (
              <HeroObservatory3D heroRef={sectionRef} />
            ) : (
              <div
                aria-hidden="true"
                className="flex h-[440px] w-full items-center justify-center xl:h-[500px]"
              >
                <div className="h-[310px] w-[310px] rounded-full border border-[#1E293B]/80 xl:h-[360px] xl:w-[360px]" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subtle Scroll Cue on Taller Viewports */}
      <a
        href="#about"
        aria-label="Gulir ke bagian Tentang Saya"
        className="absolute bottom-5 left-1/2 hidden min-h-[44px] -translate-x-1/2 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-[#94A3B8] transition-colors hover:text-[#38BDF8] sm:inline-flex"
      >
        <span ref={scrollCueRef} className="inline-flex items-center gap-1.5">
          <ArrowDown size={14} weight="bold" aria-hidden="true" />
          <span>Gulir ke bawah</span>
        </span>
      </a>
    </section>
  );
}
