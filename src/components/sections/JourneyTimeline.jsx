"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CheckCircle } from "@phosphor-icons/react";
import { JOURNEY_CHAPTERS } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function JourneyTimeline() {
  const sectionRef = useRef(null);
  const timelineWrapRef = useRef(null);
  const progressLineRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".journey-header-reveal", {
          y: 22,
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

        gsap.fromTo(
          progressLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineWrapRef.current,
              start: "top 70%",
              end: "bottom 75%",
              scrub: true
            }
          }
        );

        const chapters = gsap.utils.toArray(".journey-chapter-item");
        chapters.forEach((chapterEl) => {
          const dotEl = chapterEl.querySelector(".journey-dot");

          gsap.from(chapterEl, {
            x: -16,
            opacity: 0,
            duration: 0.65,
            ease: "power3.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: chapterEl,
              start: "top 82%",
              once: true
            }
          });

          if (dotEl) {
            gsap.fromTo(
              dotEl,
              { scale: 0.75, backgroundColor: "#060B19" },
              {
                scale: 1.15,
                backgroundColor: "#38BDF8",
                duration: 0.35,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: chapterEl,
                  start: "top 72%",
                  toggleActions: "play none none reverse"
                }
              }
            );
          }
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="border-b border-[#1E293B] bg-[#060B19]/65 py-14 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="journey-header-reveal font-display-h2 font-extrabold text-[#F8FAFC]">
            Perjalanan Belajar
          </h2>
          <p className="journey-header-reveal mt-3 max-w-[60ch] text-sm text-[#CBD5E1] sm:text-base">
            Tahapan pembelajaran dan eksplorasi proyek selama di SMK jurusan
            PPLG.
          </p>
        </div>

        <div ref={timelineWrapRef} className="relative mt-10 pl-6 sm:mt-12 sm:pl-10">
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-2 w-[2px] bg-[#1E293B] sm:left-3"
          >
            <div
              ref={progressLineRef}
              className="h-full w-full origin-top bg-[#2563EB]"
            />
          </div>

          <ol className="space-y-8 sm:space-y-10">
            {JOURNEY_CHAPTERS.map((chapter) => (
              <li
                key={chapter.id}
                className="journey-chapter-item relative border-b border-[#1E293B] pb-8 last:border-b-0 last:pb-0 sm:pb-10"
              >
                <span
                  aria-hidden="true"
                  className="journey-dot absolute top-1.5 -left-[23px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#38BDF8] bg-[#060B19] shadow-[0_0_12px_rgba(56,189,248,0.4)] sm:-left-[35px]"
                />

                <article>
                  <p className="font-mono text-xs font-medium text-[#94A3B8]">
                    {chapter.period}
                  </p>
                  <h3 className="font-display-h3 mt-1 font-extrabold text-[#F8FAFC]">
                    {chapter.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-[#38BDF8]">
                    {chapter.focus}
                  </p>
                  <p className="mt-2.5 max-w-[65ch] text-sm leading-relaxed text-[#CBD5E1] sm:text-base">
                    {chapter.description}
                  </p>

                  {chapter.deliverables?.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {chapter.deliverables.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-sm text-[#CBD5E1]"
                        >
                          <CheckCircle
                            size={16}
                            weight="fill"
                            className="mt-0.5 shrink-0 text-[#38BDF8]"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
