"use client";

import { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowsClockwise,
  ArrowUpRight,
  Atom,
  BracketsCurly,
  CloudArrowUp,
  Code,
  CodeBlock,
  Coffee,
  Cpu,
  Cube,
  DeviceMobile,
  FigmaLogo,
  FileJs,
  GitBranch,
  GithubLogo,
  Hexagon,
  PaperPlaneTilt,
  Polygon,
  Sparkle,
  Triangle,
  Wind
} from "@phosphor-icons/react";
import { PROFILE_DATA } from "@/data/profileData";
import { SKILL_GROUPS } from "@/data/techData";
import { useGithubProfile } from "@/hooks/useGithubProfile";

gsap.registerPlugin(ScrollTrigger);

const SKILL_ICONS = {
  FileJs,
  Atom,
  Triangle,
  Polygon,
  Wind,
  Sparkle,
  BracketsCurly,
  Cube,
  Hexagon,
  DeviceMobile,
  Coffee,
  Cpu,
  GitBranch,
  GithubLogo,
  CodeBlock,
  FigmaLogo,
  PaperPlaneTilt,
  CloudArrowUp
};

export default function AboutSection() {
  const sectionRef = useRef(null);
  const portraitCardRef = useRef(null);
  const portraitImageWrapRef = useRef(null);
  const portraitGlareRef = useRef(null);
  const statsRowRef = useRef(null);
  const repoCountRef = useRef(null);
  const followerCountRef = useRef(null);
  const followingCountRef = useRef(null);
  const hasEnteredStatsRef = useRef(false);

  const { githubState, stats, refreshGithubProfile } = useGithubProfile();
  const latestStatsRef = useRef(stats);

  const animateCounters = useCallback((targetStats, fromZero = false) => {
    const entries = [
      { el: repoCountRef.current, val: targetStats.public_repos },
      { el: followerCountRef.current, val: targetStats.followers },
      { el: followingCountRef.current, val: targetStats.following }
    ];

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    entries.forEach(({ el, val }) => {
      if (!el) return;
      if (reducedMotion) {
        el.textContent = String(val);
        return;
      }
      const startVal = fromZero ? 0 : Number(el.textContent) || 0;
      const obj = { count: startVal };
      gsap.to(obj, {
        count: val,
        duration: fromZero ? 1.2 : 0.65,
        ease: "power3.out",
        overwrite: "auto",
        onUpdate: () => {
          el.textContent = Math.round(obj.count).toString();
        }
      });
    });
  }, []);

  useEffect(() => {
    latestStatsRef.current = stats;
    if (hasEnteredStatsRef.current) {
      animateCounters(stats, false);
    }
  }, [stats, animateCounters]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".about-header-word", {
          yPercent: 110,
          duration: 0.8,
          stagger: 0.08,
          ease: "power4.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true
          }
        });

        gsap.from(".about-reveal", {
          y: 30,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true
          }
        });

        gsap.from(".about-skill-divider", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: ".about-skills-list",
            start: "top 84%",
            once: true
          }
        });

        gsap.from(".about-skill-item", {
          y: 16,
          scale: 0.94,
          opacity: 0,
          duration: 0.5,
          stagger: { each: 0.035, from: "start" },
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: ".about-skills-list",
            start: "top 84%",
            once: true
          }
        });

        // Dramatic Full Curtain Clip-Path & Scale-Down Reveal on Portrait Photo
        if (portraitImageWrapRef.current) {
          gsap.fromTo(
            portraitImageWrapRef.current,
            { clipPath: "inset(100% 0% 0% 0% round 8px)", scale: 1.24 },
            {
              clipPath: "inset(0% 0% 0% 0% round 8px)",
              scale: 1,
              duration: 1.25,
              ease: "expo.out",
              clearProps: "clipPath,transform",
              scrollTrigger: {
                trigger: portraitCardRef.current,
                start: "top 82%",
                once: true
              }
            }
          );
        }

        if (statsRowRef.current) {
          ScrollTrigger.create({
            trigger: statsRowRef.current,
            start: "top 88%",
            once: true,
            onEnter: () => {
              hasEnteredStatsRef.current = true;
              animateCounters(latestStatsRef.current, true);
            }
          });
        }
      });

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const card = portraitCardRef.current;
          const glare = portraitGlareRef.current;
          if (!card) return undefined;

          const rotX = gsap.quickTo(card, "rotationX", {
            duration: 0.35,
            ease: "power3.out"
          });
          const rotY = gsap.quickTo(card, "rotationY", {
            duration: 0.35,
            ease: "power3.out"
          });

          const handleMove = (e) => {
            const rect = card.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;
            rotX(-py * 15);
            rotY(px * 16);

            if (glare) {
              const gx = Math.round(((e.clientX - rect.left) / rect.width) * 100);
              const gy = Math.round(((e.clientY - rect.top) / rect.height) * 100);
              glare.style.background = `radial-gradient(380px circle at ${gx}% ${gy}%, rgba(56, 189, 248, 0.24), transparent 72%)`;
              glare.style.opacity = "1";
            }
          };

          const handleLeave = () => {
            rotX(0);
            rotY(0);
            if (glare) {
              glare.style.opacity = "0";
            }
          };

          card.addEventListener("mousemove", handleMove);
          card.addEventListener("mouseleave", handleLeave);

          return () => {
            card.removeEventListener("mousemove", handleMove);
            card.removeEventListener("mouseleave", handleLeave);
          };
        }
      );

      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          const card = portraitCardRef.current;
          const glare = portraitGlareRef.current;
          if (!card) return undefined;

          gsap.fromTo(
            card,
            { rotationX: 7, y: 18 },
            {
              rotationX: -3,
              y: -10,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                end: "bottom 20%",
                scrub: 0.65,
                onUpdate: (self) => {
                  if (!glare) return;
                  const gy = Math.round(15 + self.progress * 70);
                  glare.style.background = `radial-gradient(320px circle at 52% ${gy}%, rgba(56, 189, 248, 0.2), transparent 72%)`;
                  glare.style.opacity =
                    self.progress > 0.05 && self.progress < 0.95 ? "1" : "0";
                }
              }
            }
          );

          return undefined;
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="border-b border-[#1E293B] bg-[#060B19]/65 py-14 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="font-display-h2 flex flex-wrap gap-x-3 font-extrabold text-[#F8FAFC]">
            {["Tentang", "Saya"].map((word) => (
              <span key={word} className="inline-block overflow-hidden pb-1">
                <span className="about-header-word inline-block">{word}</span>
              </span>
            ))}
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 md:grid-cols-12 md:items-start md:gap-8 lg:gap-12">
          {/* Left 7 Columns: Clean Story & Plain-Text Skills */}
          <div className="order-2 flex flex-col gap-8 md:order-1 md:col-span-7 md:gap-10">
            <div className="about-reveal space-y-4 text-sm leading-relaxed text-[#CBD5E1] sm:text-base">
              {PROFILE_DATA.aboutStory.map((paragraph, idx) => (
                <p key={idx} className="max-w-[65ch]">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Icon Grid Skill Showcase */}
            <div className="about-reveal border-t border-[#1E293B] pt-7 sm:pt-8">
              <h3 className="font-display text-lg font-bold text-[#F8FAFC] sm:text-xl">
                Keahlian &amp; Teknologi
              </h3>

              <div className="about-skills-list mt-4 space-y-5 sm:mt-5">
                {SKILL_GROUPS.map((group, idx) => (
                  <div key={group.id} className="about-skill-group">
                    {idx > 0 && (
                      <div
                        aria-hidden="true"
                        className="about-skill-divider mb-5 h-px w-full bg-[#1E293B]"
                      />
                    )}
                    <h4 className="font-display text-sm font-bold tracking-wide text-[#F8FAFC] sm:text-base">
                      {group.title}
                    </h4>

                    <ul className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-6 md:grid-cols-3 lg:grid-cols-6 lg:gap-2.5">
                      {group.items.map((item) => {
                        const skill =
                          typeof item === "string"
                            ? { id: item, label: item, fullLabel: item, icon: "Code" }
                            : item;
                        const IconComponent = SKILL_ICONS[skill.icon] || Code;

                        return (
                          <li
                            key={skill.id}
                            title={
                              skill.fullLabel && skill.fullLabel !== skill.label
                                ? skill.fullLabel
                                : undefined
                            }
                            className="about-skill-item group flex min-h-[78px] flex-col items-center justify-center gap-2 rounded-lg border border-[#1E293B] bg-[#0F172A]/80 px-1.5 py-3 text-center transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#38BDF8] hover:bg-[#0F172A]"
                          >
                            <IconComponent
                              size={24}
                              weight="duotone"
                              aria-hidden="true"
                              className="shrink-0 text-[#38BDF8] transition-transform duration-200 group-hover:scale-110"
                            />
                            <span className="text-[11px] font-medium leading-tight text-[#CBD5E1] transition-colors duration-200 group-hover:text-[#F8FAFC] sm:text-xs">
                              {skill.label}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* GitHub Summary Row with Animated Counters */}
            <div className="about-reveal border-t border-[#1E293B] pt-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={PROFILE_DATA.avatarUrl}
                    alt={`Foto profil GitHub ${PROFILE_DATA.name}`}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-md border border-[#1E293B] object-cover"
                  />
                  <div>
                    <h3 className="font-display text-base font-bold text-[#F8FAFC]">
                      GitHub @{stats.login}
                    </h3>
                    <p className="text-xs text-[#94A3B8]">{stats.bio}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={refreshGithubProfile}
                    disabled={githubState.status === "loading"}
                    aria-label="Segarkan data GitHub"
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-[#64748B] bg-[#0F172A] px-3 py-2 text-xs font-medium text-[#F8FAFC] transition-colors hover:border-[#38BDF8] disabled:opacity-60"
                  >
                    <ArrowsClockwise
                      size={15}
                      weight="bold"
                      className={
                        githubState.status === "loading" ? "animate-spin" : ""
                      }
                      aria-hidden="true"
                    />
                    <span>Segarkan</span>
                  </button>

                  <a
                    href={stats.html_url || PROFILE_DATA.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-[#64748B] bg-[#0F172A] px-3.5 py-2 text-xs font-medium text-[#F8FAFC] transition-colors hover:border-[#38BDF8]"
                  >
                    <GithubLogo size={16} weight="duotone" aria-hidden="true" />
                    <span>Buka GitHub</span>
                    <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div
                role="status"
                aria-live="polite"
                className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-md border border-[#1E293B] bg-[#0F172A]/80 px-3.5 py-2.5 text-xs"
              >
                {githubState.status === "loading" && (
                  <span className="text-[#CBD5E1]">
                    Memuat data live dari GitHub API...
                  </span>
                )}

                {githubState.status === "success" && (
                  <span className="text-[#CBD5E1]">
                    Data live GitHub terhubung
                    {githubState.updatedAt
                      ? ` · diperbarui ${githubState.updatedAt}`
                      : ""}
                  </span>
                )}

                {githubState.status === "error" && (
                  <>
                    <span className="text-[#CBD5E1]">
                      Menampilkan data cadangan terverifikasi ({githubState.error}).
                    </span>
                    <button
                      type="button"
                      onClick={refreshGithubProfile}
                      className="inline-flex min-h-[44px] items-center rounded border border-[#64748B] bg-[#060B19] px-3 py-1.5 font-medium text-[#38BDF8] transition-colors hover:border-[#38BDF8]"
                    >
                      Coba Lagi
                    </button>
                  </>
                )}
              </div>

              <dl
                ref={statsRowRef}
                className="mt-5 grid grid-cols-3 divide-x divide-[#1E293B]"
              >
                <div className="pr-2 sm:pr-4">
                  <dt className="text-[11px] text-[#94A3B8] sm:text-xs">Repositori</dt>
                  <dd
                    ref={repoCountRef}
                    className="mt-1 font-display text-2xl font-extrabold text-[#F8FAFC] tabular-nums sm:text-3xl"
                  >
                    {stats.public_repos}
                  </dd>
                </div>
                <div className="px-2 sm:px-4">
                  <dt className="text-[11px] text-[#94A3B8] sm:text-xs">Pengikut</dt>
                  <dd
                    ref={followerCountRef}
                    className="mt-1 font-display text-2xl font-extrabold text-[#F8FAFC] tabular-nums sm:text-3xl"
                  >
                    {stats.followers}
                  </dd>
                </div>
                <div className="pl-2 sm:pl-4">
                  <dt className="text-[11px] text-[#94A3B8] sm:text-xs">Mengikuti</dt>
                  <dd
                    ref={followingCountRef}
                    className="mt-1 font-display text-2xl font-extrabold text-[#F8FAFC] tabular-nums sm:text-3xl"
                  >
                    {stats.following}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right 5 Columns: 4:5 Portrait Frame with Curtain Reveal & 3D Tilt */}
          <div className="order-1 mx-auto w-full max-w-sm md:sticky md:top-24 md:order-2 md:col-span-5 md:max-w-none [perspective:1100px]">
            <figure
              ref={portraitCardRef}
              className="relative overflow-hidden rounded-lg border border-[#1E293B] bg-[#0F172A]/90 p-4 shadow-[0_20px_50px_rgba(6,11,25,0.65)] transition-colors hover:border-[#38BDF8] [transform-style:preserve-3d]"
            >
              <div
                ref={portraitGlareRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300"
              />

              <div
                ref={portraitImageWrapRef}
                className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-[#060B19] will-change-transform"
              >
                <Image
                  src={PROFILE_DATA.photoUrl}
                  alt={PROFILE_DATA.photoCaption}
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              <figcaption className="mt-3 flex items-center justify-between pt-1">
                <span className="font-display text-sm font-bold text-[#F8FAFC]">
                  {PROFILE_DATA.name}
                </span>
                <span className="text-xs text-[#38BDF8]">SMK PPLG</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
