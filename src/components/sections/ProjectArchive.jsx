"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  MagnifyingGlass,
  ArrowUpRight,
  GithubLogo,
  Globe,
  X,
  ArrowsCounterClockwise,
  CaretDown,
  CaretUp
} from "@phosphor-icons/react";
import { ARCHIVE_PROJECTS, ARCHIVE_CATEGORIES } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const FEATURED_ARCHIVE_IDS = new Set([
  "arch-jejak-sehat-web",
  "arch-jejak-sehat-mobile",
  "arch-ketemuin",
  "arch-movielist",
  "arch-gamejar"
]);

export default function ProjectArchive() {
  const sectionRef = useRef(null);
  const inspectorCardRef = useRef(null);
  const isFirstInspectorRef = useRef(true);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProjectId, setActiveProjectId] = useState(ARCHIVE_PROJECTS[0].id);
  const [expandedRowId, setExpandedRowId] = useState(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".archive-reveal", {
          y: 26,
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

        gsap.from(".archive-row-item", {
          y: 16,
          opacity: 0,
          duration: 0.45,
          stagger: 0.04,
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: ".archive-table-list",
            start: "top 86%",
            once: true
          }
        });
      });
    },
    { scope: sectionRef }
  );

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return ARCHIVE_PROJECTS.filter((project) => {
      const matchesCategory =
        selectedCategory === "Semua" || project.category === selectedCategory;

      const matchesSearch =
        query === "" ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.stack.some((tech) => tech.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory("Semua");
    setSearchQuery("");
    setActiveProjectId(ARCHIVE_PROJECTS[0].id);
  };

  const displayedInspector =
    filteredProjects.find((item) => item.id === activeProjectId) ||
    filteredProjects[0] ||
    null;

  const inspectorId = displayedInspector?.id;

  useEffect(() => {
    if (isFirstInspectorRef.current) {
      isFirstInspectorRef.current = false;
      return;
    }
    if (!inspectorCardRef.current || !inspectorId) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      inspectorCardRef.current,
      { y: 10, opacity: 0.35 },
      {
        y: 0,
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
        clearProps: "transform,opacity"
      }
    );
  }, [inspectorId]);

  return (
    <section
      id="archive"
      ref={sectionRef}
      className="border-b border-[#1E293B] bg-[#060B19]/65 py-14 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="archive-reveal flex flex-col justify-between gap-4 border-b border-[#1E293B] pb-8 lg:flex-row lg:items-end">
          <div>
            <h2 className="font-display-h2 font-extrabold text-[#F8FAFC]">
              Arsip Proyek
            </h2>
          </div>

          <p className="max-w-[48ch] text-sm text-[#CBD5E1] sm:text-base">
            Daftar seluruh repositori publik yang pernah saya kerjakan di GitHub.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="archive-reveal mt-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div
            role="group"
            aria-label="Filter kategori proyek"
            className="flex flex-wrap items-center gap-2"
          >
            {ARCHIVE_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCategory(category)}
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

          <div className="relative w-full lg:w-80">
            <label htmlFor="archive-search-input" className="sr-only">
              Cari nama proyek atau teknologi
            </label>
            <MagnifyingGlass
              size={18}
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[#94A3B8]"
              aria-hidden="true"
            />
            <input
              id="archive-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari proyek atau teknologi..."
              className="min-h-[44px] w-full rounded-md border border-[#64748B] bg-[#0F172A] py-2 pr-10 pl-10 text-sm text-[#F8FAFC] placeholder-[#94A3B8] transition-colors focus:border-[#38BDF8] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Bersihkan kata kunci pencarian"
                className="absolute top-1/2 right-1.5 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded text-[#94A3B8] hover:text-[#F8FAFC]"
              >
                <X size={16} weight="bold" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        <p
          role="status"
          aria-live="polite"
          className="mt-4 font-mono text-xs text-[#94A3B8]"
        >
          Menampilkan {filteredProjects.length} dari {ARCHIVE_PROJECTS.length} repositori
        </p>

        {filteredProjects.length === 0 ? (
          <div
            role="status"
            aria-live="polite"
            className="mt-6 rounded-lg border border-[#1E293B] bg-[#0F172A] p-8 text-center sm:p-12"
          >
            <h3 className="font-display text-xl font-bold text-[#F8FAFC]">
              Proyek tidak ditemukan
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#CBD5E1]">
              Tidak ada repositori yang cocok dengan pencarian{" "}
              <span className="font-semibold text-[#38BDF8]">
                &ldquo;{searchQuery}&rdquo;
              </span>
              .
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#2563EB] px-5 py-2.5 text-xs font-semibold text-[#F8FAFC] transition-colors hover:bg-[#1D4ED8]"
            >
              <ArrowsCounterClockwise size={16} weight="bold" />
              <span>Reset Filter</span>
            </button>
          </div>
        ) : (
          <div className="archive-reveal mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8">
              <div className="overflow-hidden rounded-lg border border-[#1E293B] bg-[#0F172A]/90">
                <div className="hidden grid-cols-12 border-b border-[#1E293B] bg-[#060B19] px-5 py-3 text-xs font-medium text-[#94A3B8] sm:grid">
                  <div className="col-span-2">Tahun</div>
                  <div className="col-span-4">Proyek</div>
                  <div className="col-span-3">Teknologi</div>
                  <div className="col-span-3 text-right">Aksi</div>
                </div>

                <ul className="archive-table-list divide-y divide-[#1E293B]">
                  {filteredProjects.map((project) => {
                    const isExpanded = expandedRowId === project.id;
                    const isSelectedPreview =
                      displayedInspector?.id === project.id;
                    const isFeatured = FEATURED_ARCHIVE_IDS.has(project.id);

                    return (
                      <li
                        key={project.id}
                        onClick={() => setActiveProjectId(project.id)}
                        className={`archive-row-item transition-colors lg:cursor-pointer ${
                          isSelectedPreview
                            ? "lg:bg-[#131F38]"
                            : "hover:bg-[#131F38]/60"
                        }`}
                      >
                        <div className="grid grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-12 sm:items-center sm:px-5">
                          <div className="flex items-center justify-between sm:col-span-2">
                            <span className="font-mono text-xs text-[#38BDF8] tabular-nums">
                              {project.year}
                            </span>
                            <span className="text-xs text-[#94A3B8] sm:hidden">
                              {project.category}
                            </span>
                          </div>

                          <div className="min-w-0 sm:col-span-4">
                            <h3 className="break-words font-display text-base font-bold text-[#F8FAFC]">
                              {project.title}
                            </h3>
                            {isFeatured && (
                              <span className="mt-0.5 inline-block font-mono text-[11px] text-[#38BDF8]">
                                Karya Pilihan
                              </span>
                            )}
                          </div>

                          <div className="sm:col-span-3">
                            <p className="text-xs text-[#CBD5E1]">
                              {project.stack.join(" · ")}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2 sm:col-span-3 sm:justify-end">
                            <button
                              type="button"
                              aria-expanded={isExpanded}
                              aria-controls={`archive-detail-${project.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedRowId(isExpanded ? null : project.id);
                              }}
                              className="inline-flex min-h-[44px] items-center gap-1 rounded-md border border-[#64748B] bg-[#060B19] px-3 py-1.5 text-xs font-medium text-[#F8FAFC] transition-colors hover:border-[#38BDF8] lg:hidden"
                            >
                              <span>Detail</span>
                              {isExpanded ? (
                                <CaretUp size={14} weight="bold" aria-hidden="true" />
                              ) : (
                                <CaretDown size={14} weight="bold" aria-hidden="true" />
                              )}
                            </button>

                            <button
                              type="button"
                              aria-pressed={isSelectedPreview}
                              aria-label={`Tampilkan pratinjau ${project.title}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveProjectId(project.id);
                              }}
                              onFocus={() => setActiveProjectId(project.id)}
                              className={`hidden min-h-[44px] items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors lg:inline-flex ${
                                isSelectedPreview
                                  ? "border-[#38BDF8] bg-[#131F38] text-[#38BDF8]"
                                  : "border-[#64748B] bg-[#060B19] text-[#F8FAFC] hover:border-[#38BDF8]"
                              }`}
                            >
                              <span>
                                {isSelectedPreview ? "Dipilih" : "Pratinjau"}
                              </span>
                            </button>

                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`Buka repositori GitHub ${project.title}`}
                              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-[#64748B] bg-[#060B19] px-2.5 text-[#F8FAFC] transition-colors hover:border-[#38BDF8] hover:text-[#38BDF8]"
                            >
                              <GithubLogo size={18} weight="duotone" aria-hidden="true" />
                            </a>
                          </div>
                        </div>

                        {isExpanded && (
                          <div
                            id={`archive-detail-${project.id}`}
                            className="border-t border-[#1E293B] bg-[#060B19]/90 px-4 py-4 sm:px-5 lg:hidden"
                          >
                            <p className="text-sm leading-relaxed text-[#CBD5E1]">
                              {project.description}
                            </p>
                            <div className="mt-3 flex flex-wrap items-center gap-3">
                              {project.liveUrl && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md bg-[#2563EB] px-3.5 py-2 text-xs font-semibold text-[#F8FAFC] hover:bg-[#1D4ED8]"
                                >
                                  <Globe size={15} weight="duotone" aria-hidden="true" />
                                  <span>Live Demo</span>
                                  <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
                                </a>
                              )}

                              <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-[#64748B] bg-[#0F172A] px-3.5 py-2 text-xs font-medium text-[#F8FAFC] hover:border-[#38BDF8]"
                              >
                                <GithubLogo size={15} weight="duotone" aria-hidden="true" />
                                <span>GitHub</span>
                                <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
                              </a>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Right 4 Columns on Desktop Only: Clean Inspector */}
            <aside
              aria-label="Pratinjau Detail Proyek Arsip"
              className="hidden lg:sticky lg:top-24 lg:col-span-4 lg:block"
            >
              {displayedInspector && (
                <div
                  ref={inspectorCardRef}
                  className="min-w-0 rounded-lg border border-[#1E293B] bg-[#0F172A]/90 p-6"
                >
                  <p className="text-xs font-medium text-[#38BDF8]">
                    {displayedInspector.category} · {displayedInspector.year}
                  </p>

                  <h3 className="mt-1 break-words font-display text-2xl font-bold text-[#F8FAFC]">
                    {displayedInspector.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">
                    {displayedInspector.description}
                  </p>

                  <p className="mt-5 border-t border-[#1E293B] pt-4 text-xs text-[#94A3B8]">
                    {displayedInspector.stack.join(" · ")}
                  </p>

                  <div className="mt-5 flex flex-col gap-2.5">
                    {displayedInspector.liveUrl && (
                      <a
                        href={displayedInspector.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-[#2563EB] px-4 py-2.5 text-xs font-semibold text-[#F8FAFC] transition-colors hover:bg-[#1D4ED8]"
                      >
                        <Globe size={16} weight="duotone" aria-hidden="true" />
                        <span>Live Demo</span>
                        <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                      </a>
                    )}

                    <a
                      href={displayedInspector.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md border border-[#64748B] bg-[#060B19] px-4 py-2.5 text-xs font-medium text-[#F8FAFC] transition-colors hover:border-[#38BDF8]"
                    >
                      <GithubLogo size={16} weight="duotone" aria-hidden="true" />
                      <span>Buka di GitHub</span>
                      <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              )}
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
