"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Copy,
  Check,
  GithubLogo,
  ArrowUpRight,
  ArrowUp,
  EnvelopeSimple
} from "@phosphor-icons/react";
import { PROFILE_DATA } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const [copyStatus, setCopyStatus] = useState("idle");
  const resetTimerRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".footer-reveal", {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 88%",
            once: true
          }
        });
      });
    },
    { scope: footerRef }
  );

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const scheduleReset = () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }
    resetTimerRef.current = setTimeout(() => {
      setCopyStatus("idle");
    }, 3500);
  };

  const handleCopyEmail = async () => {
    if (
      typeof navigator === "undefined" ||
      !navigator.clipboard ||
      typeof navigator.clipboard.writeText !== "function"
    ) {
      setCopyStatus("error");
      scheduleReset();
      return;
    }

    try {
      await navigator.clipboard.writeText(PROFILE_DATA.email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
    scheduleReset();
  };

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative z-10 border-t border-[#1E293B] bg-[#060B19]/75 pt-14 pb-10 sm:pt-20 sm:pb-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <span className="sr-only" role="status" aria-live="polite">
          {copyStatus === "copied"
            ? "Alamat email berhasil disalin ke clipboard."
            : copyStatus === "error"
            ? "Gagal menyalin otomatis. Silakan salin alamat email secara manual."
            : ""}
        </span>

        <div className="footer-reveal grid grid-cols-1 gap-8 border-b border-[#1E293B] pb-12 sm:gap-10 sm:pb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="font-display-h2 font-extrabold text-[#F8FAFC]">
              Mari Terhubung
            </h2>

            <p className="mt-3 max-w-[58ch] text-sm text-[#CBD5E1] sm:text-lg">
              Terbuka untuk kolaborasi proyek web, mobile, maupun diskusi
              pengembangan perangkat lunak.
            </p>

            <p className="mt-4 select-all break-all text-sm font-medium text-[#38BDF8] sm:text-base">
              {PROFILE_DATA.email}
            </p>
          </div>

          <div className="flex min-w-0 flex-col gap-3 lg:col-span-4">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-md bg-[#2563EB] px-5 py-3 text-sm font-semibold text-[#F8FAFC] transition-colors hover:bg-[#1D4ED8] active:scale-[0.99]"
            >
              {copyStatus === "copied" ? (
                <>
                  <Check size={18} weight="bold" aria-hidden="true" />
                  <span>Email Tersalin</span>
                </>
              ) : (
                <>
                  <Copy size={18} weight="duotone" aria-hidden="true" />
                  <span>
                    {copyStatus === "error"
                      ? "Salin Manual di Atas"
                      : "Salin Email"}
                  </span>
                </>
              )}
            </button>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href={`mailto:${PROFILE_DATA.email}`}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-[#64748B] bg-[#0F172A] px-4 py-3 text-sm font-medium text-[#F8FAFC] transition-colors hover:border-[#38BDF8] hover:bg-[#131F38]"
              >
                <EnvelopeSimple size={18} weight="duotone" aria-hidden="true" />
                <span>Kirim Email</span>
              </a>

              <a
                href={PROFILE_DATA.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-[#64748B] bg-[#0F172A] px-4 py-3 text-sm font-medium text-[#F8FAFC] transition-colors hover:border-[#38BDF8] hover:bg-[#131F38]"
              >
                <GithubLogo size={18} weight="duotone" aria-hidden="true" />
                <span>GitHub</span>
                <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-reveal mt-8 flex flex-col items-start justify-between gap-4 sm:mt-10 sm:flex-row sm:items-center">
          <p className="text-sm text-[#94A3B8]">
            {PROFILE_DATA.name} · SMK PPLG
          </p>

          <a
            href="#hero"
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md border border-[#64748B] bg-[#0F172A] px-4 py-2 text-xs font-medium text-[#F8FAFC] transition-colors hover:border-[#38BDF8] hover:bg-[#131F38] sm:w-auto"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp size={15} weight="bold" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
