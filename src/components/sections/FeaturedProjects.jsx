"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowUpRight,
  GithubLogo,
  Globe,
  DeviceMobile
} from "@phosphor-icons/react";
import { FEATURED_PROJECTS } from "@/data/projectsData";
import ProjectVisualStage from "@/components/sections/ProjectVisualStage";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProjects() {
  const sectionRef = useRef(null);
  const pinWrapRef = useRef(null);
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeSlide, setActiveSlide] = useState(0);

  const jumpToSlide = (idx) => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const st = scrollTriggerRef.current;

    if (
      window.innerWidth >= 1024 &&
      st &&
      typeof st.start === "number" &&
      typeof st.end === "number"
    ) {
      const targetScroll =
        st.start +
        ((st.end - st.start) * idx) /
          Math.max(1, FEATURED_PROJECTS.length - 1);
      window.scrollTo({
        top: targetScroll,
        behavior: reducedMotion ? "auto" : "smooth"
      });
    } else {
      const cardEl = cardRefs.current[idx];
      if (cardEl) {
        const y = cardEl.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
          top: Math.max(0, y),
          behavior: reducedMotion ? "auto" : "smooth"
        });
      }
    }

    setActiveSlide(idx);
  };

  const handleCardFocus = (idx) => {
    if (window.innerWidth < 1024 || idx === activeSlide) return;
    const st = scrollTriggerRef.current;
    if (!st || typeof st.start !== "number" || typeof st.end !== "number") {
      return;
    }

    const targetScroll =
      st.start +
      ((st.end - st.start) * idx) / Math.max(1, FEATURED_PROJECTS.length - 1);
    window.scrollTo({
      top: targetScroll,
      behavior: "auto"
    });
    setActiveSlide(idx);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".projects-header-reveal", {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true
          }
        });
      });

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = trackRef.current;
          const pinWrap = pinWrapRef.current;
          if (!track || !pinWrap) return;

          const getScrollAmount = () => {
            const trackWidth = track.scrollWidth;
            const viewportWidth = pinWrap.clientWidth;
            return Math.max(0, trackWidth - viewportWidth);
          };

          const tween = gsap.to(track, {
            x: () => -getScrollAmount(),
            ease: "none",
            scrollTrigger: {
              trigger: pinWrap,
              start: "top top",
              end: () => `+=${getScrollAmount()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (progressBarRef.current) {
                  progressBarRef.current.style.transform = `scaleX(${self.progress})`;
                }
                const idx = Math.min(
                  FEATURED_PROJECTS.length - 1,
                  Math.max(
                    0,
                    Math.round(self.progress * (FEATURED_PROJECTS.length - 1))
                  )
                );
                setActiveSlide((prev) => (prev === idx ? prev : idx));
              }
            }
          });

          scrollTriggerRef.current = tween.scrollTrigger;

          return () => {
            scrollTriggerRef.current = null;
            tween.kill();
          };
        }
      );

      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          if (trackRef.current && progressBarRef.current) {
            ScrollTrigger.create({
              trigger: trackRef.current,
              start: "top 68%",
              end: "bottom 42%",
              scrub: 0.3,
              onUpdate: (self) => {
                if (progressBarRef.current) {
                  progressBarRef.current.style.transform = `scaleX(${self.progress})`;
                }
              }
            });
          }

          const cards = gsap.utils.toArray(".featured-project-card");
          cards.forEach((card, idx) => {
            gsap.set(card, { transformPerspective: 1100 });

            // Mobile 3D Depth Card Scrub Entry
            gsap.fromTo(
              card,
              { rotationX: 11, scale: 0.93, y: 38, opacity: 0.35 },
              {
                rotationX: 0,
                scale: 1,
                y: 0,
                opacity: 1,
                ease: "none",
                clearProps: "transform,opacity",
                scrollTrigger: {
                  trigger: card,
                  start: "top 95%",
                  end: "center 65%",
                  scrub: 0.5
                }
              }
            );

            // Subtle Counter-Parallax Inside Visual Mockup Stage
            const stage = card.querySelector(".featured-project-stage");
            if (stage) {
              gsap.fromTo(
                stage,
                { y: 14 },
                {
                  y: -12,
                  ease: "none",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    end: "bottom 20%",
                    scrub: 0.6
                  }
                }
              );
            }

            // Bidirectional Slide Index Sync on Mobile Scroll
            ScrollTrigger.create({
              trigger: card,
              start: "top 58%",
              end: "bottom 42%",
              onEnter: () => setActiveSlide((prev) => (prev === idx ? prev : idx)),
              onEnterBack: () => setActiveSlide((prev) => (prev === idx ? prev : idx))
            });
          });
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="border-b border-[#1E293B] bg-[#060B19]/65"
    >
      <div
        ref={pinWrapRef}
        className="mx-auto flex min-h-0 max-w-7xl flex-col justify-center px-4 py-14 sm:px-6 sm:py-20 lg:min-h-[100dvh] lg:overflow-hidden lg:px-8 lg:pt-24 lg:pb-12"
      >
        <div className="projects-header-reveal flex flex-col justify-between gap-4 border-b border-[#1E293B] pb-5 lg:flex-row lg:items-end lg:pb-6">
          <div>
            <h2 className="font-display-h2 font-extrabold text-[#F8FAFC]">
              Karya Pilihan
            </h2>
            <p className="mt-2 max-w-[58ch] text-sm text-[#CBD5E1] sm:text-base">
              Empat proyek aplikasi web dan mobile yang saya bangun.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 lg:items-end">
            <div
              role="group"
              aria-label="Lompat ke karya unggulan"
              className="flex flex-wrap items-center gap-2"
            >
              {FEATURED_PROJECTS.map((project, idx) => {
                const isActive = activeSlide === idx;
                const labelNum = String(idx + 1).padStart(2, "0");
                return (
                  <button
                    key={project.id}
                    type="button"
                    aria-pressed={isActive}
                    aria-label={`Lompat ke karya ${labelNum}: ${project.title}`}
                    onClick={() => jumpToSlide(idx)}
                    className={`min-h-[44px] min-w-[44px] rounded-md border px-3 text-xs font-bold tabular-nums transition-colors ${
                      isActive
                        ? "border-[#38BDF8] bg-[#131F38] text-[#38BDF8]"
                        : "border-[#1E293B] bg-[#0F172A] text-[#CBD5E1] hover:border-[#64748B] hover:text-[#F8FAFC]"
                    }`}
                  >
                    {labelNum}
                  </button>
                );
              })}
            </div>

            <div
              aria-hidden="true"
              className="mt-1 h-[2px] w-full overflow-hidden rounded-full bg-[#1E293B]"
            >
              <div
                ref={progressBarRef}
                className="h-full w-full origin-left scale-x-0 bg-[#38BDF8]"
              />
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:gap-8 lg:flex lg:w-max lg:flex-row lg:gap-10"
        >
          {FEATURED_PROJECTS.map((project, idx) => {
            const isCurrent = activeSlide === idx;
            return (
              <article
                key={project.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                onFocusCapture={() => handleCardFocus(idx)}
                className={`featured-project-card flex flex-col justify-between rounded-lg border border-[#1E293B] bg-[#0F172A]/90 p-4 transition-colors duration-300 sm:p-6 lg:w-[840px] lg:shrink-0 ${
                  isCurrent ? "border-[#38BDF8]/55 lg:border-[#38BDF8]/65" : ""
                }`}
              >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-7">
                <div className="featured-project-stage lg:col-span-6">
                  <ProjectVisualStage projectId={project.id} />
                </div>

                <div className="flex flex-col justify-between lg:col-span-6">
                  <div>
                    <p className="font-mono text-xs font-medium text-[#38BDF8]">
                      {project.index} · {project.category} · {project.year}
                    </p>
                    <h3 className="font-display-h3 mt-1 font-extrabold text-[#F8FAFC]">
                      {project.title}
                    </h3>
                    <p className="mt-0.5 text-xs font-medium text-[#94A3B8]">
                      {project.role}
                    </p>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#CBD5E1]">
                      {project.summary}
                    </p>

                    {project.highlights?.length > 0 && (
                      <ul className="mt-3 space-y-1.5 border-l-2 border-[#1E293B] pl-3">
                        {project.highlights.slice(0, 2).map((item) => (
                          <li
                            key={item}
                            className="text-xs leading-relaxed text-[#94A3B8]"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mt-5 border-t border-[#1E293B] pt-4">
                    <p className="text-xs text-[#94A3B8]">
                      {project.stack.join(" · ")}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2.5">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#2563EB] px-4 py-2 text-xs font-semibold text-[#F8FAFC] transition-colors hover:bg-[#1D4ED8]"
                        >
                          <Globe size={16} weight="duotone" aria-hidden="true" />
                          <span>Live Demo</span>
                          <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                        </a>
                      )}

                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[#64748B] bg-[#060B19] px-4 py-2 text-xs font-medium text-[#F8FAFC] transition-colors hover:border-[#38BDF8] hover:bg-[#131F38]"
                      >
                        <GithubLogo size={16} weight="duotone" aria-hidden="true" />
                        <span>GitHub</span>
                        <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                      </a>

                      {project.secondaryRepoUrl && (
                        <a
                          href={project.secondaryRepoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[#64748B] bg-[#060B19] px-4 py-2 text-xs font-medium text-[#F8FAFC] transition-colors hover:border-[#38BDF8] hover:bg-[#131F38]"
                        >
                          <DeviceMobile
                            size={16}
                            weight="duotone"
                            aria-hidden="true"
                          />
                          <span>{project.secondaryRepoLabel}</span>
                          <ArrowUpRight
                            size={14}
                            weight="bold"
                            aria-hidden="true"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
