"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDownRight, FilePdf, ArrowDown } from "@phosphor-icons/react";
import { PROFILE_DATA } from "@/data/profileData";
import { SKILL_GROUPS } from "@/data/techData";
import TechStackIcon from "@/components/ui/TechStackIcon";

gsap.registerPlugin(ScrollTrigger);

const HERO_WORDS = PROFILE_DATA.heroHeadline.split(" ");
const CORE_STACK_IDS = ["react", "nextjs", "laravel", "flutter"];
const ALL_SKILLS = SKILL_GROUPS.flatMap((group) => group.items);
const HERO_CORE_STACK = CORE_STACK_IDS.map((id) =>
  ALL_SKILLS.find((skill) => skill.id === id)
).filter(Boolean);

const BASE_RA_SEC = 6 * 3600 + 45 * 60 + 8;
const BASE_DEC_ARCSEC = -(16 * 3600 + 42 * 60 + 58);

function formatCelestialCoords(raDeltaSec = 0, decDeltaArcsec = 0) {
  const totalRa = ((Math.round(BASE_RA_SEC + raDeltaSec) % 86400) + 86400) % 86400;
  const raH = Math.floor(totalRa / 3600);
  const raM = Math.floor((totalRa % 3600) / 60);
  const raS = totalRa % 60;

  const clampedDec = Math.max(-324000, Math.min(324000, Math.round(BASE_DEC_ARCSEC + decDeltaArcsec)));
  const sign = clampedDec < 0 ? "-" : "+";
  const absDec = Math.abs(clampedDec);
  const decD = Math.floor(absDec / 3600);
  const decM = Math.floor((absDec % 3600) / 60);
  const decS = absDec % 60;

  const pad = (val) => String(val).padStart(2, "0");
  return `RA ${pad(raH)}h ${pad(raM)}m ${pad(raS)}s · DEC ${sign}${pad(decD)}° ${pad(decM)}' ${pad(decS)}"`;
}

export default function Hero() {
  const sectionRef = useRef(null);
  const contentWrapRef = useRef(null);
  const primaryBtnRef = useRef(null);
  const secondaryBtnRef = useRef(null);
  const innerRingRef = useRef(null);
  const orbitRingRef = useRef(null);
  const outerRingRef = useRef(null);
  const parallaxStageRef = useRef(null);
  const scrollCueRef = useRef(null);
  const coordTextRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.from(".hero-name-reveal", {
          y: 24,
          opacity: 0,
          duration: 0.65,
          clearProps: "transform,opacity"
        })
          .from(
            ".hero-word-inner",
            {
              yPercent: 120,
              rotateZ: 3.5,
              duration: 0.85,
              stagger: 0.055,
              clearProps: "transform"
            },
            "-=0.42"
          )
          .from(
            ".hero-sub-reveal",
            {
              y: 26,
              opacity: 0,
              duration: 0.72,
              stagger: 0.09,
              clearProps: "transform,opacity"
            },
            "-=0.48"
          )
          .from(
            ".hero-constellation-line",
            {
              strokeDashoffset: 320,
              duration: 1.45,
              stagger: 0.14,
              ease: "power2.out"
            },
            "-=0.72"
          );

        if (innerRingRef.current) {
          gsap.to(innerRingRef.current, {
            rotation: 360,
            duration: 38,
            repeat: -1,
            ease: "none",
            svgOrigin: "600 350"
          });
        }

        if (orbitRingRef.current) {
          gsap.to(orbitRingRef.current, {
            rotation: -360,
            duration: 58,
            repeat: -1,
            ease: "none",
            svgOrigin: "600 350"
          });
        }

        if (outerRingRef.current) {
          gsap.to(outerRingRef.current, {
            rotation: 360,
            duration: 84,
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
            yPercent: -14,
            scale: 0.96,
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

      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          const cleanups = [];

          if (parallaxStageRef.current) {
            gsap.to(parallaxStageRef.current, {
              scale: 1.14,
              rotation: 10,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.55
              }
            });
          }

          const mobileButtons = [
            primaryBtnRef.current,
            secondaryBtnRef.current
          ].filter(Boolean);

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
        }
      );

      mm.add(
        "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const cleanups = [];
          const buttons = [
            primaryBtnRef.current,
            secondaryBtnRef.current
          ].filter(Boolean);

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
              xTo(relX * 0.28);
              yTo(relY * 0.28);
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
          const telemetryState = { pointerRa: 0, pointerDec: 0, scrollDec: 0 };

          const syncCoordsReadout = () => {
            if (!coordTextRef.current) return;
            coordTextRef.current.textContent = formatCelestialCoords(
              telemetryState.pointerRa,
              telemetryState.pointerDec + telemetryState.scrollDec
            );
          };

          if (sectionEl) {
            ScrollTrigger.create({
              trigger: sectionEl,
              start: "top top",
              end: "bottom top",
              onUpdate: (self) => {
                telemetryState.scrollDec = self.progress * 240;
                syncCoordsReadout();
              }
            });
          }

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
              stageX(nx * -24);
              stageY(ny * -18);
              telemetryState.pointerRa = nx * 180;
              telemetryState.pointerDec = ny * -120;
              syncCoordsReadout();
            };

            const handleStageLeave = () => {
              stageX(0);
              stageY(0);
              telemetryState.pointerRa = 0;
              telemetryState.pointerDec = 0;
              syncCoordsReadout();
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
      className="relative flex min-h-[calc(100dvh-4.5rem)] items-center justify-center overflow-hidden border-b border-[#1E293B] bg-[#060B19]/55 pt-10 pb-16 sm:pt-14 sm:pb-24"
    >
      {/* Centered Radial Observatory Nebula Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_62%_48%_at_50%_46%,rgba(37,99,235,0.2),rgba(56,189,248,0.06)_44%,transparent_75%)]"
      />

      {/* Centered Multi-Ring Astrolabe & Constellation SVG Stage */}
      <div
        ref={parallaxStageRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-28px]"
      >
        <svg
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          className="h-full w-full opacity-75"
        >
          {/* Subtle Observatory Crosshair Axes */}
          <g stroke="#1E293B" strokeOpacity="0.45" strokeWidth="1">
            <line x1="600" y1="30" x2="600" y2="670" strokeDasharray="3 10" />
            <line x1="120" y1="350" x2="1080" y2="350" strokeDasharray="3 10" />
          </g>

          {/* Inner Coordinate Ring */}
          <g ref={innerRingRef}>
            <circle
              cx="600"
              cy="350"
              r="195"
              stroke="#38BDF8"
              strokeOpacity="0.22"
              strokeWidth="1.2"
              strokeDasharray="5 11"
            />
            <circle cx="600" cy="155" r="3.5" fill="#38BDF8" />
            <circle cx="795" cy="350" r="2.5" fill="#F8FAFC" fillOpacity="0.85" />
          </g>

          {/* Middle Astrolabe Degree Ring */}
          <g ref={orbitRingRef}>
            <circle
              cx="600"
              cy="350"
              r="305"
              stroke="#64748B"
              strokeOpacity="0.34"
              strokeWidth="1"
              strokeDasharray="1 18"
            />
            <circle
              cx="600"
              cy="350"
              r="292"
              stroke="#1E293B"
              strokeOpacity="0.7"
              strokeWidth="1.2"
              strokeDasharray="10 14"
            />
            <circle cx="600" cy="45" r="4" fill="#38BDF8" />
            <circle cx="905" cy="350" r="3" fill="#2563EB" />
            <circle cx="295" cy="350" r="3.5" fill="#38BDF8" />
          </g>

          {/* Outer Horizon Orbit Ring */}
          <g ref={outerRingRef}>
            <circle
              cx="600"
              cy="350"
              r="425"
              stroke="#2563EB"
              strokeOpacity="0.28"
              strokeWidth="1.2"
              strokeDasharray="6 16"
            />
            <circle cx="600" cy="-75" r="3" fill="#38BDF8" />
            <circle cx="1025" cy="350" r="3.5" fill="#38BDF8" />
            <circle cx="175" cy="350" r="3" fill="#2563EB" />
          </g>

          {/* Symmetrical Constellation Traces (Visible on Desktop & Cropped Mobile) */}
          <g
            className="hero-constellation-line"
            stroke="#38BDF8"
            strokeOpacity="0.36"
            strokeWidth="1.2"
            strokeDasharray="320"
          >
            <line x1="125" y1="140" x2="270" y2="92" />
            <line x1="270" y1="92" x2="410" y2="155" />
            <line x1="410" y1="155" x2="465" y2="115" />
            <line x1="735" y1="115" x2="795" y2="155" />
            <line x1="795" y1="155" x2="935" y2="96" />
            <line x1="935" y1="96" x2="1075" y2="145" />
            <line x1="220" y1="545" x2="365" y2="590" />
            <line x1="835" y1="590" x2="980" y2="545" />
          </g>

          <g fill="#38BDF8" fillOpacity="0.8">
            <circle cx="125" cy="140" r="3" />
            <circle cx="270" cy="92" r="3.5" />
            <circle cx="410" cy="155" r="2.5" />
            <circle cx="465" cy="115" r="3" />
            <circle cx="735" cy="115" r="3" />
            <circle cx="795" cy="155" r="2.5" />
            <circle cx="935" cy="96" r="3.5" />
            <circle cx="1075" cy="145" r="3" />
            <circle cx="220" cy="545" r="2.5" />
            <circle cx="365" cy="590" r="3" />
            <circle cx="835" cy="590" r="3" />
            <circle cx="980" cy="545" r="2.5" />
          </g>
        </svg>
      </div>

      {/* Centered Single-Column Editorial Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div
          ref={contentWrapRef}
          className="mx-auto max-w-4xl text-center"
        >
          <h1>
            <span className="hero-name-reveal inline-block rounded-full border border-[#1E293B] bg-[#0F172A]/75 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#38BDF8] sm:px-4 sm:text-sm">
              {PROFILE_DATA.name} ({PROFILE_DATA.handle}) · Web &amp; Mobile Developer
            </span>

            {/* Split-Word Curtain Mask Headline */}
            <span className="font-display-hero mt-4 flex flex-wrap justify-center gap-x-[0.26em] gap-y-1 font-extrabold text-[#F8FAFC] sm:mt-5">
              {HERO_WORDS.map((word, idx) => {
                const isHighlight = word.toLowerCase().includes("interaktif");
                return (
                  <span
                    key={idx}
                    className="inline-block overflow-hidden pb-1.5 sm:pb-2"
                  >
                    <span
                      className={`hero-word-inner inline-block ${
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

          <p className="hero-sub-reveal mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#CBD5E1] sm:mt-5 sm:text-lg">
            {PROFILE_DATA.heroSummary}
          </p>

          <div className="hero-sub-reveal mx-auto mt-7 flex max-w-xs flex-col items-stretch justify-center gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:items-center sm:gap-4">
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

          {/* Core Stack Signature Strip */}
          {HERO_CORE_STACK.length > 0 && (
            <ul
              aria-label="Teknologi inti yang digunakan"
              className="hero-sub-reveal mx-auto mt-7 flex flex-wrap items-center justify-center gap-2 sm:mt-8 sm:gap-2.5"
            >
              {HERO_CORE_STACK.map((tech) => (
                <li
                  key={tech.id}
                  className="inline-flex items-center gap-2 rounded-full border border-[#1E293B] bg-[#0F172A]/85 px-3 py-1.5 text-xs font-medium text-[#CBD5E1]"
                >
                  <TechStackIcon name={tech.icon} className="h-4 w-4 shrink-0" />
                  <span>{tech.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Bottom Observatory Telemetry & Scroll Cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 mx-auto flex max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <p
          aria-hidden="true"
          className="hidden items-center gap-2 font-mono text-[11px] tracking-wide text-[#94A3B8] lg:absolute lg:top-1/2 lg:left-8 lg:inline-flex lg:-translate-y-1/2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />
          <span ref={coordTextRef}>{PROFILE_DATA.coordinates}</span>
        </p>

        <a
          href="#about"
          aria-label="Gulir ke bagian Tentang Saya"
          className="pointer-events-auto hidden min-h-[44px] items-center gap-1.5 rounded-full px-3 text-xs font-medium text-[#94A3B8] transition-colors hover:text-[#38BDF8] sm:inline-flex"
        >
          <span ref={scrollCueRef} className="inline-flex items-center gap-1.5">
            <ArrowDown size={14} weight="bold" aria-hidden="true" />
            <span>Gulir ke bawah</span>
          </span>
        </a>
      </div>
    </section>
  );
}
