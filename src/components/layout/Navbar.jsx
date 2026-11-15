"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  List,
  X,
  ArrowUpRight,
  ArrowRight,
  GithubLogo,
  EnvelopeSimple
} from "@phosphor-icons/react";
import { PROFILE_DATA } from "@/data/profileData";

const DESKTOP_NAV_ITEMS = [
  { id: "about", label: "Tentang", href: "#about" },
  { id: "projects", label: "Karya", href: "#projects" },
  { id: "archive", label: "Arsip", href: "#archive" },
  { id: "certificates", label: "Sertifikat", href: "#certificates" },
  { id: "journey", label: "Perjalanan", href: "#journey" }
];

const MOBILE_NAV_ITEMS = [
  ...DESKTOP_NAV_ITEMS,
  { id: "contact", label: "Kontak", href: "#contact" }
];

export default function Navbar() {
  const headerRef = useRef(null);
  const menuBtnRef = useRef(null);
  const navPillTrackRef = useRef(null);
  const navIndicatorRef = useRef(null);
  const navItemRefs = useRef({});
  const mobileDrawerRef = useRef(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scrolled state & bottom footer detection
  useEffect(() => {
    const sectionIds = [
      "hero",
      ...DESKTOP_NAV_ITEMS.map((item) => item.id),
      "contact"
    ];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const handleScrollState = () => {
      const scrollY = window.scrollY || 0;
      setIsScrolled(scrollY > 24);

      const atBottom =
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 24;
      if (atBottom) {
        setActiveSectionId("contact");
      }
    };

    handleScrollState();
    window.addEventListener("scroll", handleScrollState, { passive: true });

    if (elements.length === 0) {
      return () => window.removeEventListener("scroll", handleScrollState);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 24;
        if (atBottom) {
          setActiveSectionId("contact");
          return;
        }

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSectionId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.1, 0.3, 0.6]
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollState);
    };
  }, []);

  // Animate sliding desktop pill indicator
  useEffect(() => {
    const indicator = navIndicatorRef.current;
    const track = navPillTrackRef.current;
    const activeEl = navItemRefs.current[activeSectionId];

    if (!indicator || !track) return;

    if (!activeEl) {
      gsap.to(indicator, { opacity: 0, duration: 0.2, overwrite: "auto" });
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const targetX = activeEl.offsetLeft;
    const targetW = activeEl.offsetWidth;

    if (reducedMotion) {
      gsap.set(indicator, { x: targetX, width: targetW, opacity: 1 });
    } else {
      gsap.to(indicator, {
        x: targetX,
        width: targetW,
        opacity: 1,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto"
      });
    }
  }, [activeSectionId, isScrolled]);

  // Reposition desktop indicator on window resize
  useEffect(() => {
    const handleResize = () => {
      const indicator = navIndicatorRef.current;
      const activeEl = navItemRefs.current[activeSectionId];
      if (indicator && activeEl) {
        gsap.set(indicator, {
          x: activeEl.offsetLeft,
          width: activeEl.offsetWidth
        });
      }
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeSectionId, isMobileMenuOpen]);

  // Mobile drawer animation, outside click, and Escape focus restore
  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!reducedMotion && mobileDrawerRef.current) {
      gsap.fromTo(
        mobileDrawerRef.current,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.25, ease: "power3.out" }
      );
      gsap.fromTo(
        mobileDrawerRef.current.querySelectorAll(".mobile-nav-item"),
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.26,
          stagger: 0.03,
          ease: "power3.out",
          clearProps: "transform,opacity"
        }
      );
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };

    const handlePointerDown = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMobileMenuOpen]);

  const isContactActive = activeSectionId === "contact";

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 px-3 py-2.5 sm:px-6 lg:px-8"
    >
      <div
        className={`mx-auto flex items-center justify-between transition-[max-width,background-color,border-color,box-shadow,border-radius,padding] duration-300 ease-out ${
          isScrolled
            ? "h-14 max-w-6xl rounded-full border border-[#38BDF8]/30 bg-[#060B19]/90 px-3.5 shadow-[0_14px_38px_rgba(6,11,25,0.72)] backdrop-blur-lg sm:px-5"
            : "h-14 max-w-7xl rounded-2xl border border-[#1E293B]/80 bg-[#060B19]/75 px-3.5 backdrop-blur-md sm:px-5 md:h-16"
        }`}
      >
        {/* Brand Anchor */}
        <a
          href="#hero"
          aria-current={activeSectionId === "hero" ? "location" : undefined}
          className="flex min-h-[44px] min-w-0 shrink items-center gap-1.5 rounded-full px-1 font-display text-xs font-bold tracking-tight text-[#F8FAFC] min-[360px]:text-sm sm:gap-2.5 sm:px-1.5 sm:text-base"
        >
          <span
            aria-hidden="true"
            className="h-2 w-2 shrink-0 rounded-full bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]"
          />
          <span className="truncate">Ilham Dwi Arsandy</span>
        </a>

        {/* Desktop Center Pill Navigation */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden items-center lg:flex"
        >
          <div
            ref={navPillTrackRef}
            className="relative flex items-center rounded-full border border-[#1E293B] bg-[#0F172A]/80 p-1"
          >
            <span
              ref={navIndicatorRef}
              aria-hidden="true"
              className="pointer-events-none absolute top-1 bottom-1 left-0 rounded-full bg-[#131F38] ring-1 ring-[#38BDF8]/55 opacity-0"
            />

            {DESKTOP_NAV_ITEMS.map((item) => {
              const isActive = activeSectionId === item.id;
              return (
                <a
                  key={item.href}
                  ref={(el) => {
                    navItemRefs.current[item.id] = el;
                  }}
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative z-10 flex min-h-[38px] items-center whitespace-nowrap rounded-full px-2.5 text-xs font-medium transition-colors xl:px-3.5 xl:text-sm ${
                    isActive
                      ? "text-[#F8FAFC]"
                      : "text-[#CBD5E1] hover:text-[#F8FAFC]"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <a
            href={PROFILE_DATA.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Buka profil GitHub ${PROFILE_DATA.handle}`}
            title={`GitHub @${PROFILE_DATA.handle}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#64748B] bg-[#0F172A] text-[#F8FAFC] transition-colors hover:border-[#38BDF8] hover:text-[#38BDF8]"
          >
            <GithubLogo size={18} weight="duotone" aria-hidden="true" />
          </a>

          <a
            href="#contact"
            aria-current={isContactActive ? "location" : undefined}
            className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-4 text-xs font-semibold transition-colors ${
              isContactActive
                ? "bg-[#38BDF8] text-[#060B19]"
                : "bg-[#2563EB] text-[#F8FAFC] hover:bg-[#1D4ED8]"
            }`}
          >
            <EnvelopeSimple size={15} weight="duotone" aria-hidden="true" />
            <span>Kontak</span>
          </a>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={PROFILE_DATA.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Buka profil GitHub ${PROFILE_DATA.handle}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#64748B] bg-[#0F172A] text-[#F8FAFC] transition-colors hover:border-[#38BDF8] hover:text-[#38BDF8]"
          >
            <GithubLogo size={18} weight="duotone" aria-hidden="true" />
          </a>

          <button
            ref={menuBtnRef}
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-full border px-3.5 text-xs font-semibold transition-colors ${
              isMobileMenuOpen
                ? "border-[#38BDF8] bg-[#131F38] text-[#38BDF8]"
                : "border-[#64748B] bg-[#0F172A] text-[#F8FAFC] hover:border-[#38BDF8]"
            }`}
          >
            {isMobileMenuOpen ? (
              <>
                <X size={16} weight="bold" aria-hidden="true" />
                <span>Tutup</span>
              </>
            ) : (
              <>
                <List size={16} weight="bold" aria-hidden="true" />
                <span>Menu</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Floating Navigation Drawer */}
      {isMobileMenuOpen && (
        <>
          <div
            aria-hidden="true"
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 top-[76px] z-40 bg-[#060B19]/75 backdrop-blur-sm lg:hidden"
          />
          <nav
            ref={mobileDrawerRef}
            id="mobile-nav-drawer"
            aria-label="Navigasi Perangkat Seluler"
            className="relative z-50 mx-auto mt-2.5 max-h-[calc(100dvh-5.5rem)] max-w-6xl overflow-y-auto rounded-2xl border border-[#38BDF8]/30 bg-[#0F172A]/95 p-4 shadow-2xl backdrop-blur-xl sm:p-5 lg:hidden"
          >
            <ul className="grid grid-cols-1 gap-2 min-[460px]:grid-cols-2">
              {MOBILE_NAV_ITEMS.map((item, idx) => {
                const isActive = activeSectionId === item.id;
                const num = String(idx + 1).padStart(2, "0");
                return (
                  <li key={item.href} className="mobile-nav-item">
                    <a
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex min-h-[48px] items-center justify-between rounded-xl border px-3.5 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "border-[#38BDF8] bg-[#131F38] text-[#F8FAFC]"
                          : "border-[#1E293B] bg-[#060B19]/80 text-[#CBD5E1] hover:border-[#64748B] hover:text-[#F8FAFC]"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="font-mono text-xs text-[#38BDF8]">
                          {num}
                        </span>
                        <span>{item.label}</span>
                      </span>
                      <ArrowRight
                        size={15}
                        className={isActive ? "text-[#38BDF8]" : "text-[#94A3B8]"}
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mobile-nav-item mt-3 grid grid-cols-1 gap-2 border-t border-[#1E293B] pt-3 min-[460px]:grid-cols-2">
              <a
                href={`mailto:${PROFILE_DATA.email}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-xs font-semibold text-[#F8FAFC] transition-colors hover:bg-[#1D4ED8]"
              >
                <EnvelopeSimple size={16} weight="duotone" aria-hidden="true" />
                <span>Kirim Email</span>
              </a>

              <a
                href={PROFILE_DATA.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#64748B] bg-[#060B19] px-4 py-2.5 text-xs font-medium text-[#F8FAFC] transition-colors hover:border-[#38BDF8]"
              >
                <GithubLogo size={16} weight="duotone" aria-hidden="true" />
                <span>GitHub @{PROFILE_DATA.handle}</span>
                <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
