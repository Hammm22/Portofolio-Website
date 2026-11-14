"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WORKFLOW_STEPS } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function WorkflowSection() {
  const sectionRef = useRef(null);
  const beamRef = useRef(null);
  const [litStepIdx, setLitStepIdx] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".workflow-header-reveal", {
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

        if (beamRef.current) {
          gsap.fromTo(
            beamRef.current,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 68%",
                end: "bottom 75%",
                scrub: 0.4,
                onUpdate: (self) => {
                  const idx = Math.min(
                    WORKFLOW_STEPS.length - 1,
                    Math.floor(self.progress * WORKFLOW_STEPS.length)
                  );
                  setLitStepIdx((prev) => (prev === idx ? prev : idx));
                }
              }
            }
          );
        }

        gsap.from(".workflow-step-card", {
          y: 28,
          opacity: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: ".workflow-grid",
            start: "top 85%",
            once: true
          }
        });
      });

      mm.add(
        "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = sectionRef.current?.querySelectorAll(".workflow-step-card");
          if (!cards || cards.length === 0) return undefined;

          const cleanups = [];
          cards.forEach((card) => {
            gsap.set(card, { transformPerspective: 900 });
            const rotX = gsap.quickTo(card, "rotationX", {
              duration: 0.3,
              ease: "power3.out"
            });
            const rotY = gsap.quickTo(card, "rotationY", {
              duration: 0.3,
              ease: "power3.out"
            });
            const yTo = gsap.quickTo(card, "y", {
              duration: 0.3,
              ease: "power3.out"
            });

            const handleMove = (e) => {
              const rect = card.getBoundingClientRect();
              const px = (e.clientX - rect.left) / rect.width - 0.5;
              const py = (e.clientY - rect.top) / rect.height - 0.5;
              rotX(-py * 10);
              rotY(px * 12);
              yTo(-4);
            };

            const handleLeave = () => {
              rotX(0);
              rotY(0);
              yTo(0);
            };

            card.addEventListener("mousemove", handleMove);
            card.addEventListener("mouseleave", handleLeave);
            cleanups.push(() => {
              card.removeEventListener("mousemove", handleMove);
              card.removeEventListener("mouseleave", handleLeave);
            });
          });

          return () => cleanups.forEach((fn) => fn());
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="workflow"
      ref={sectionRef}
      className="border-b border-[#1E293B] bg-[#060B19]/65 py-14 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="workflow-header-reveal font-display-h2 font-extrabold text-[#F8FAFC]">
            Alur Pengerjaan Proyek
          </h2>
          <p className="workflow-header-reveal mt-3 text-sm text-[#CBD5E1] sm:text-lg">
            Tahapan terstruktur yang saya terapkan saat mengubah ide menjadi
            aplikasi web dan mobile yang siap digunakan.
          </p>
        </div>

        {/* Desktop Scroll-Scrubbed Progress Beam */}
        <div
          aria-hidden="true"
          className="relative mt-10 hidden h-[3px] w-full overflow-hidden rounded-full bg-[#1E293B] lg:block"
        >
          <div
            ref={beamRef}
            className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[#2563EB] via-[#38BDF8] to-[#F8FAFC] shadow-[0_0_20px_#38BDF8]"
          />
        </div>

        <ol className="workflow-grid mt-8 grid grid-cols-1 gap-4 [perspective:1100px] sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {WORKFLOW_STEPS.map((item, idx) => {
            const isReached = idx <= litStepIdx;
            return (
              <li
                key={item.id}
                data-cursor-hover
                className={`workflow-step-card flex flex-col justify-between rounded-lg border border-[#1E293B] bg-[#0F172A]/90 p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#38BDF8] hover:shadow-[0_14px_38px_rgba(37,99,235,0.2)] sm:p-6 ${
                  isReached ? "lg:border-[#38BDF8]/55" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl font-extrabold text-[#38BDF8] tabular-nums sm:text-3xl">
                      {item.step}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                        isReached
                          ? "bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]"
                          : "bg-[#1E293B]"
                      }`}
                    />
                  </div>
                  <h3 className="mt-3 font-display text-base font-bold text-[#F8FAFC] sm:mt-4 sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#CBD5E1]">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
