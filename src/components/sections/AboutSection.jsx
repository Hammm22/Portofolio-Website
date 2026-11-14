"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowsClockwise,
  ArrowUpRight,
  GithubLogo
} from "@phosphor-icons/react";
import { PROFILE_DATA, SKILL_GROUPS } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

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
  const abortRef = useRef(null);

  const [githubState, setGithubState] = useState({
    status: "loading",
    updatedAt: null,
    error: null,
    data: PROFILE_DATA.fallbackGithubStats
  });

  const stats = githubState.data;
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

  const loadGithubStats = useCallback(async (signal) => {
    try {
      const response = await fetch(PROFILE_DATA.githubApiUrl, {
        headers: {
          Accept: "application/vnd.github.v3+json"
        },
        signal
      });

      if (!response.ok) {
        throw new Error(`Status HTTP ${response.status}`);
      }

      const json = await response.json();
      const updatedAt = new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date());

      return {
        status: "success",
        updatedAt,
        error: null,
        data: {
          public_repos:
            typeof json.public_repos === "number"
              ? json.public_repos
              : PROFILE_DATA.fallbackGithubStats.public_repos,
          followers:
            typeof json.followers === "number"
              ? json.followers
              : PROFILE_DATA.fallbackGithubStats.followers,
          following:
            typeof json.following === "number"
              ? json.following
              : PROFILE_DATA.fallbackGithubStats.following,
          login: json.login || PROFILE_DATA.handle,
          html_url: json.html_url || PROFILE_DATA.githubUrl,
          bio: json.bio || PROFILE_DATA.fallbackGithubStats.bio
        }
      };
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return null;
      }
      return {
        status: "error",
        updatedAt: null,
        error: err instanceof Error ? err.message : "Kendala jaringan",
        data: PROFILE_DATA.fallbackGithubStats
      };
    }
  }, []);

  const fetchGithubProfile = useCallback(async () => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    setGithubState((prev) => ({
      ...prev,
      status: "loading",
      error: null
    }));

    const nextState = await loadGithubStats(controller.signal);
    if (nextState && !controller.signal.aborted) {
      setGithubState(nextState);
    }
  }, [loadGithubStats]);

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;

    loadGithubStats(controller.signal).then((nextState) => {
      if (nextState && !controller.signal.aborted) {
        setGithubState(nextState);
      }
    });

    return () => {
      controller.abort();
    };
  }, [loadGithubStats]);

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
          x: -16,
          opacity: 0,
          duration: 0.55,
          stagger: 0.09,
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

            {/* Clean Hairline Skill List */}
            <div className="about-reveal border-t border-[#1E293B] pt-7 sm:pt-8">
              <h3 className="font-display text-lg font-bold text-[#F8FAFC] sm:text-xl">
                Keahlian &amp; Teknologi
              </h3>

              <div className="about-skills-list mt-4 space-y-0 sm:mt-5">
                {SKILL_GROUPS.map((group, idx) => (
                  <div
                    key={group.id}
                    className="about-skill-item py-4 first:pt-0 last:pb-0"
                  >
                    {idx > 0 && (
                      <div
                        aria-hidden="true"
                        className="about-skill-divider mb-4 h-px w-full bg-[#1E293B]"
                      />
                    )}
                    <h4 className="font-display text-base font-bold text-[#F8FAFC]">
                      {group.title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#CBD5E1]">
                      {group.items.join(" · ")}
                    </p>
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
                    onClick={fetchGithubProfile}
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
                      onClick={fetchGithubProfile}
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
              data-cursor-hover
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
