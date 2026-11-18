"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import { ArrowsOutSimple, X } from "@phosphor-icons/react";
import { CERTIFICATES, CERTIFICATE_CATEGORIES } from "@/data/certificatesData";

gsap.registerPlugin(ScrollTrigger, Flip);

export default function CertificateSection() {
  const sectionRef = useRef(null);
  const modalDialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const lastTriggerRef = useRef(null);
  const flipStateRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedCert, setSelectedCert] = useState(null);

  const filteredCertificates =
    activeCategory === "Semua"
      ? CERTIFICATES
      : CERTIFICATES.filter((item) => item.category === activeCategory);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cert-header-word", {
          yPercent: 110,
          duration: 0.75,
          stagger: 0.08,
          ease: "power4.out",
          clearProps: "transform",
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
          gsap.from(".cert-card-item", {
            y: 34,
            opacity: 0,
            duration: 0.68,
            stagger: 0.09,
            ease: "power3.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: ".cert-cards-grid",
              start: "top 84%",
              once: true
            }
          });

          gsap.fromTo(
            ".cert-thumb-mask",
            { clipPath: "inset(12% 0% 0% 0% round 6px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 6px)",
              duration: 0.85,
              stagger: 0.09,
              ease: "expo.out",
              clearProps: "clipPath",
              scrollTrigger: {
                trigger: ".cert-cards-grid",
                start: "top 84%",
                once: true
              }
            }
          );
        }
      );

      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = gsap.utils.toArray(".cert-card-item");
          cards.forEach((card) => {
            gsap.set(card, { transformPerspective: 1050 });
            gsap.fromTo(
              card,
              { rotationX: 9, y: 28, scale: 0.95, opacity: 0.4 },
              {
                rotationX: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                ease: "none",
                clearProps: "transform,opacity",
                scrollTrigger: {
                  trigger: card,
                  start: "top 93%",
                  end: "center 68%",
                  scrub: 0.45
                }
              }
            );

            const thumbMask = card.querySelector(".cert-thumb-mask");
            if (thumbMask) {
              gsap.fromTo(
                thumbMask,
                { clipPath: "inset(10% 0% 0% 0% round 6px)" },
                {
                  clipPath: "inset(0% 0% 0% 0% round 6px)",
                  duration: 0.7,
                  ease: "expo.out",
                  clearProps: "clipPath",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    once: true
                  }
                }
              );
            }
          });
        }
      );
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const state = flipStateRef.current;
      flipStateRef.current = null;
      if (state) {
        if (
          window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
          !sectionRef.current?.querySelector(".cert-card-item")
        ) {
          ScrollTrigger.refresh();
        } else {
          Flip.from(state, {
            targets: ".cert-card-item",
            duration: 0.52,
            stagger: 0.045,
            ease: "power3.inOut",
            scale: true,
            simple: true,
            onEnter: (elements) =>
              gsap.fromTo(
                elements,
                { opacity: 0, y: 24, scale: 0.92 },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.45,
                  stagger: 0.05,
                  ease: "power3.out",
                  clearProps: "transform,opacity"
                }
              ),
            onComplete: () => {
              ScrollTrigger.refresh();
            }
          });
        }
      }

      mm.add(
        "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = sectionRef.current?.querySelectorAll(".cert-card-item");
          if (!cards || cards.length === 0) return undefined;

          const cleanups = [];
          cards.forEach((card) => {
            gsap.set(card, { transformPerspective: 950 });
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
            const glare = card.querySelector("[data-cert-glare]");

            const handleMove = (e) => {
              const rect = card.getBoundingClientRect();
              const px = (e.clientX - rect.left) / rect.width - 0.5;
              const py = (e.clientY - rect.top) / rect.height - 0.5;
              rotX(-py * 12);
              rotY(px * 14);
              yTo(-6);

              if (glare) {
                const gx = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                const gy = Math.round(((e.clientY - rect.top) / rect.height) * 100);
                glare.style.background = `radial-gradient(320px circle at ${gx}% ${gy}%, rgba(56, 189, 248, 0.22), transparent 70%)`;
                glare.style.opacity = "1";
              }
            };

            const handleLeave = () => {
              rotX(0);
              rotY(0);
              yTo(0);
              if (glare) {
                glare.style.opacity = "0";
              }
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
    { scope: sectionRef, dependencies: [activeCategory] }
  );

  useEffect(() => {
    if (!selectedCert) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("lenis:lock", { detail: { locked: true } }));

    if (
      modalDialogRef.current &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      gsap.fromTo(
        modalDialogRef.current,
        { y: 18, scale: 0.95, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.28,
          ease: "power3.out",
          clearProps: "transform,opacity"
        }
      );
    }

    closeBtnRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedCert(null);
        return;
      }

      if (event.key === "Tab" && modalDialogRef.current) {
        const focusables = modalDialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
      window.dispatchEvent(new CustomEvent("lenis:lock", { detail: { locked: false } }));
      lastTriggerRef.current?.focus();
    };
  }, [selectedCert]);

  const handleCategoryChange = (category) => {
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      sectionRef.current?.querySelector(".cert-card-item")
    ) {
      flipStateRef.current = Flip.getState(".cert-card-item");
    }
    setActiveCategory(category);
  };

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="border-b border-[#1E293B] bg-[#060B19]/65 py-14 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display-h2 flex flex-wrap gap-x-3 font-extrabold text-[#F8FAFC]">
            {["Sertifikat", "Kompetensi"].map((word) => (
              <span key={word} className="inline-block overflow-hidden pb-1">
                <span className="cert-header-word inline-block">{word}</span>
              </span>
            ))}
          </h2>
          <p className="mt-3 text-base text-[#CBD5E1]">
            Dokumentasi sertifikat pembelajaran dan pencapaian kompetensi. Klik
            gambar untuk memperbesar.
          </p>
        </div>

        {/* Filter Bar */}
        <div
          role="group"
          aria-label="Filter kategori sertifikat"
          className="mt-8 flex flex-wrap items-center gap-2"
        >
          {CERTIFICATE_CATEGORIES.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isSelected}
                onClick={() => handleCategoryChange(category)}
                className={`inline-flex min-h-[44px] items-center rounded-md border px-4 py-2 text-xs font-medium transition-colors ${
                  isSelected
                    ? "border-[#38BDF8] bg-[#2563EB] text-[#F8FAFC]"
                    : "border-[#64748B] bg-[#0F172A] text-[#CBD5E1] hover:border-[#38BDF8] hover:text-[#F8FAFC]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Clean 16:11 Certificate Grid with Dramatic 3D Tilt */}
        {filteredCertificates.length === 0 ? (
          <div
            role="status"
            aria-live="polite"
            className="mt-10 rounded-lg border border-[#1E293B] bg-[#0F172A] p-8 text-center"
          >
            <p className="text-sm text-[#CBD5E1]">
              Belum ada sertifikat pada kategori ini.
            </p>
          </div>
        ) : (
          <div className="cert-cards-grid mt-10 grid grid-cols-1 gap-6 [perspective:1200px] md:grid-cols-2 lg:grid-cols-3">
            {filteredCertificates.map((cert) => (
              <article
                key={cert.id}
                data-flip-id={cert.id}
                className="cert-card-item group relative flex flex-col justify-between overflow-hidden rounded-lg border border-[#1E293B] bg-[#0F172A]/90 p-5 transition-[border-color,box-shadow] duration-200 hover:border-[#38BDF8] hover:shadow-[0_18px_45px_rgba(37,99,235,0.22)]"
              >
                <div
                  data-cert-glare
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300"
                />

                <div className="relative z-10">
                  <button
                    type="button"
                    onClick={(e) => {
                      lastTriggerRef.current = e.currentTarget;
                      setSelectedCert(cert);
                    }}
                    aria-label={`Perbesar foto sertifikat ${cert.title}`}
                    className="cert-thumb-mask relative block aspect-[16/11] w-full overflow-hidden rounded-md border border-[#1E293B] bg-[#060B19] p-1.5 text-left focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
                  >
                    <Image
                      src={cert.imageUrl}
                      alt={`Foto sertifikat ${cert.title}`}
                      width={880}
                      height={605}
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 400px"
                      className="h-full w-full rounded-[4px] object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-1.5 rounded bg-[#060B19]/90 px-2.5 py-1.5 text-xs font-medium text-[#F8FAFC] backdrop-blur-sm">
                      <ArrowsOutSimple
                        size={13}
                        weight="bold"
                        className="text-[#38BDF8]"
                        aria-hidden="true"
                      />
                      <span>Perbesar</span>
                    </span>
                  </button>

                  <div className="mt-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs font-medium text-[#38BDF8]">
                        {cert.index} · {cert.category}
                      </span>
                      <span className="font-mono text-[11px] text-[#94A3B8]">
                        {cert.date}
                      </span>
                    </div>
                    <h3 className="mt-1.5 font-display text-lg font-bold text-[#F8FAFC]">
                      {cert.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-[#94A3B8]">
                      {cert.issuer}
                    </p>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#CBD5E1]">
                      {cert.summary}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 mt-4 border-t border-[#1E293B] pt-3">
                  <p className="text-xs text-[#94A3B8]">
                    {cert.skills.join(" · ")}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal Zoom via Portal agar tidak terjebak stacking context main z-10 */}
      {selectedCert &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-modal-title"
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#060B19]/90 p-4 backdrop-blur-md sm:p-6"
            onClick={() => setSelectedCert(null)}
          >
            <div
              ref={modalDialogRef}
              data-lenis-prevent
              className="max-h-[84dvh] w-full max-w-2xl overflow-y-auto rounded-lg border border-[#64748B] bg-[#0F172A] p-4 shadow-2xl sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1E293B] pb-3.5">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-[#38BDF8]">
                    {selectedCert.issuer} · {selectedCert.date}
                    {selectedCert.credentialCode
                      ? ` · ${selectedCert.credentialCode}`
                      : ""}
                  </p>
                  <h3
                    id="cert-modal-title"
                    className="mt-1 font-display text-lg font-bold text-[#F8FAFC] sm:text-xl"
                  >
                    {selectedCert.title}
                  </h3>
                </div>

                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[#64748B] bg-[#060B19] px-3.5 py-2 text-xs font-medium text-[#F8FAFC] transition-colors hover:border-[#38BDF8]"
                >
                  <X size={16} weight="bold" aria-hidden="true" />
                  <span>Tutup</span>
                </button>
              </div>

              <div className="mt-4 flex justify-center overflow-hidden rounded-md bg-[#060B19] p-2">
                <Image
                  src={selectedCert.imageUrl}
                  alt={`Pratinjau penuh sertifikat ${selectedCert.title}`}
                  width={1200}
                  height={927}
                  sizes="(max-width: 767px) 92vw, 640px"
                  className="max-h-[46dvh] w-auto max-w-full object-contain sm:max-h-[52dvh]"
                />
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#CBD5E1]">
                {selectedCert.summary}
              </p>
              <p className="mt-3 border-t border-[#1E293B] pt-3 font-mono text-xs text-[#94A3B8]">
                Kompetensi: {selectedCert.skills.join(" · ")}
              </p>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
