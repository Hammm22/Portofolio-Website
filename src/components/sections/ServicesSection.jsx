"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Globe,
  Database,
  DeviceMobile,
  CheckCircle
} from "@phosphor-icons/react";
import { SERVICES_DATA } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_ICONS = {
  "web-interaktif": Globe,
  "fullstack-sistem": Database,
  "mobile-lintas-platform": DeviceMobile
};

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const [activeId, setActiveId] = useState(SERVICES_DATA[0].id);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".service-header-reveal", {
          x: -24,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true
          }
        });

        gsap.from(".service-card-item", {
          y: 34,
          opacity: 0,
          filter: "blur(5px)",
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "transform,opacity,filter",
          scrollTrigger: {
            trigger: ".service-cards-grid",
            start: "top 84%",
            once: true
          }
        });
      });
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".service-card-active .service-point-item",
          { x: -10, opacity: 0.45 },
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out",
            clearProps: "transform,opacity"
          }
        );
      });
    },
    { scope: sectionRef, dependencies: [activeId] }
  );

  const handleCardPointerMove = (event) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const card = event.currentTarget;
    const glare = card.querySelector("[data-service-spotlight]");
    if (!glare) return;

    const rect = card.getBoundingClientRect();
    const gx = Math.round(((event.clientX - rect.left) / rect.width) * 100);
    const gy = Math.round(((event.clientY - rect.top) / rect.height) * 100);
    glare.style.background = `radial-gradient(420px circle at ${gx}% ${gy}%, rgba(56, 189, 248, 0.20), rgba(37, 99, 235, 0.06) 45%, transparent 75%)`;
    glare.style.opacity = "1";
  };

  const handleCardPointerLeave = (event) => {
    const glare = event.currentTarget.querySelector("[data-service-spotlight]");
    if (glare) {
      glare.style.opacity = "0";
    }
  };

  const handleCardKeyDown = (event, serviceId) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveId(serviceId);
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="border-b border-[#1E293B] bg-[#060B19]/65 py-14 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="service-header-reveal font-display-h2 font-extrabold text-[#F8FAFC]">
            Fokus &amp; Bidang Pengerjaan
          </h2>
          <p className="service-header-reveal mt-3 text-sm text-[#CBD5E1] sm:text-lg">
            Tiga area utama yang saya bangun, dari antarmuka web interaktif
            hingga aplikasi mobile lintas platform.
          </p>
        </div>

        {/* Interactive Expanding Spotlight Cards */}
        <div className="service-cards-grid mt-8 flex flex-col gap-4 sm:mt-12 sm:gap-6 lg:flex-row lg:items-stretch">
          {SERVICES_DATA.map((service) => {
            const IconComponent = SERVICE_ICONS[service.id] || Globe;
            const isActive = activeId === service.id;

            return (
              <article
                key={service.id}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                data-cursor-hover
                onMouseEnter={() => setActiveId(service.id)}
                onFocus={() => setActiveId(service.id)}
                onClick={() => setActiveId(service.id)}
                onKeyDown={(e) => handleCardKeyDown(e, service.id)}
                onMouseMove={handleCardPointerMove}
                onMouseLeave={handleCardPointerLeave}
                className={`service-card-item group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-lg border p-5 text-left transition-[flex,border-color,background-color,box-shadow] duration-500 ease-out sm:p-7 lg:p-8 ${
                  isActive
                    ? "service-card-active border-[#38BDF8] bg-[#131F38]/90 shadow-[0_18px_50px_rgba(37,99,235,0.22)] lg:flex-[1.55]"
                    : "border-[#1E293B] bg-[#0F172A]/85 hover:border-[#64748B] lg:flex-1"
                }`}
              >
                {/* Animated Top Accent Line */}
                <span
                  aria-hidden="true"
                  className={`absolute top-0 right-0 left-0 h-[3px] origin-left bg-[#38BDF8] transition-transform duration-500 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />

                {/* Radial Cursor Spotlight */}
                <div
                  data-service-spotlight
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-display text-3xl font-extrabold tabular-nums transition-colors duration-300 ${
                        isActive ? "text-[#38BDF8]" : "text-[#94A3B8]"
                      }`}
                    >
                      {service.number}
                    </span>

                    <IconComponent
                      size={34}
                      weight="duotone"
                      className={`transition-transform duration-500 ${
                        isActive
                          ? "scale-110 text-[#38BDF8]"
                          : "text-[#CBD5E1] group-hover:text-[#38BDF8]"
                      }`}
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="font-display-h3 mt-6 font-extrabold text-[#F8FAFC]">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1] sm:text-base">
                    {service.summary}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-[#1E293B] pt-5">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="service-point-item flex items-start gap-2.5 text-sm text-[#CBD5E1]"
                      >
                        <CheckCircle
                          size={17}
                          weight="fill"
                          className="mt-0.5 shrink-0 text-[#38BDF8]"
                          aria-hidden="true"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10 mt-8 border-t border-[#1E293B] pt-4">
                  <p className="text-xs font-medium text-[#38BDF8]">
                    {service.tech}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
