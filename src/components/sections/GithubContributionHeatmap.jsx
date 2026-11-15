"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { PROFILE_DATA } from "@/data/profileData";

gsap.registerPlugin(ScrollTrigger);

const EMPTY_WEEKS = [];

const MONTH_ABBR_ID = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des"
];

const LEVEL_STYLES = {
  0: "bg-[#060B19] border border-[#1E293B]",
  1: "bg-[#0E4429]",
  2: "bg-[#006D32]",
  3: "bg-[#26A641]",
  4: "bg-[#39D353]"
};

const DATE_FORMATTER_ID = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC"
});

function formatIsoDateId(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return DATE_FORMATTER_ID.format(new Date(Date.UTC(year, month - 1, day)));
}

function buildMonthLabels(weeks) {
  const labels = [];
  let lastMonth = null;

  weeks.forEach((week, weekIndex) => {
    if (weekIndex > weeks.length - 3) return;
    const firstValidDay = week.find(Boolean);
    if (!firstValidDay) return;

    const month = Number(firstValidDay.date.slice(5, 7)) - 1;
    if (month !== lastMonth) {
      // Hindari tabrakan label awal jika bulan pertama hanya tersisa 1-2 minggu
      if (labels.length > 0 && weekIndex - labels[labels.length - 1].weekIndex < 3) {
        labels.shift();
      }
      labels.push({
        weekIndex,
        label: MONTH_ABBR_ID[month] || ""
      });
      lastMonth = month;
    }
  });

  return labels;
}

function findNextValidCell(weeks, startCol, startRow, dCol, dRow) {
  let col = startCol + dCol;
  let row = startRow + dRow;

  while (col >= 0 && col < weeks.length) {
    while (row >= 0 && row < 7) {
      if (weeks[col]?.[row]) {
        return { col, row };
      }
      if (dRow === 0) break;
      row += dRow;
    }
    if (dCol === 0) break;
    col += dCol;
    row = startRow;
  }

  return null;
}

function findLatestCoords(weeks) {
  for (let col = weeks.length - 1; col >= 0; col -= 1) {
    for (let row = 6; row >= 0; row -= 1) {
      if (weeks[col]?.[row]) {
        return { col, row };
      }
    }
  }
  return null;
}

/**
 * Menampilkan kalender heatmap kontribusi GitHub hijau 52 minggu di kartu profil AboutSection.
 */
export default function GithubContributionHeatmap({
  status,
  data,
  error,
  onRetry,
  githubUrl
}) {
  const rootRef = useRef(null);
  const gridRef = useRef(null);
  const [activeCoords, setActiveCoords] = useState(null);

  const weeks = data?.weeks || EMPTY_WEEKS;
  const monthLabels = buildMonthLabels(weeks);
  const latestCoords = findLatestCoords(weeks);

  useGSAP(
    () => {
      if (status !== "ready" || weeks.length === 0 || !gridRef.current) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".github-contrib-col", {
          opacity: 0,
          scaleY: 0.72,
          transformOrigin: "bottom center",
          duration: 0.45,
          stagger: { amount: 0.55, from: "start" },
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 92%",
            once: true
          }
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [status, weeks.length] }
  );

  const activeDay = activeCoords ? weeks[activeCoords.col]?.[activeCoords.row] || null : null;

  const updateCoordsFromPointer = (clientX, clientY) => {
    if (!gridRef.current || weeks.length === 0) return;
    const rect = gridRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const rawCol = Math.floor(((clientX - rect.left) / rect.width) * weeks.length);
    const rawRow = Math.floor(((clientY - rect.top) / rect.height) * 7);
    const col = Math.max(0, Math.min(weeks.length - 1, rawCol));
    const row = Math.max(0, Math.min(6, rawRow));

    if (weeks[col]?.[row]) {
      setActiveCoords({ col, row });
    }
  };

  const handleGridKeyDown = (event) => {
    if (weeks.length === 0) return;
    const current = activeCoords || latestCoords;
    if (!current) return;

    let next = null;
    if (event.key === "ArrowLeft") next = findNextValidCell(weeks, current.col, current.row, -1, 0);
    else if (event.key === "ArrowRight") next = findNextValidCell(weeks, current.col, current.row, 1, 0);
    else if (event.key === "ArrowUp") next = findNextValidCell(weeks, current.col, current.row, 0, -1);
    else if (event.key === "ArrowDown") next = findNextValidCell(weeks, current.col, current.row, 0, 1);
    else if (event.key === "Escape") {
      setActiveCoords(null);
      return;
    } else {
      return;
    }

    event.preventDefault();
    if (next) {
      setActiveCoords(next);
    }
  };

  return (
    <div
      ref={rootRef}
      className="mt-5 rounded-md border border-[#1E293B] bg-[#0F172A]/70 p-3.5 sm:p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-medium text-[#CBD5E1]">
          {status === "ready" && data
            ? `${data.totalContributions.toLocaleString("id-ID")} kontribusi dalam setahun terakhir`
            : "Aktivitas kontribusi GitHub"}
        </p>

        <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8]" aria-hidden="true">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <span
              key={level}
              className={`inline-block h-2.5 w-2.5 rounded-[2px] ${LEVEL_STYLES[level]}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      {status === "loading" && (
        <div
          className="mt-3"
          role="status"
          aria-label="Memuat grafik kontribusi GitHub"
        >
          <div
            className="grid w-full gap-px sm:gap-[2px] lg:gap-[3px]"
            style={{ gridTemplateColumns: "repeat(53, minmax(0, 1fr))" }}
          >
            {Array.from({ length: 53 }).map((_, colIdx) => (
              <div key={colIdx} className="grid grid-rows-7 gap-px sm:gap-[2px] lg:gap-[3px]">
                {Array.from({ length: 7 }).map((__, rowIdx) => (
                  <div
                    key={rowIdx}
                    className="aspect-square w-full animate-pulse rounded-[2px] bg-[#1E293B]/60"
                  />
                ))}
              </div>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-[#94A3B8]">
            Memuat riwayat kontribusi 52 minggu...
          </p>
        </div>
      )}

      {status === "empty" && (
        <div className="mt-3 rounded border border-[#1E293B] bg-[#060B19]/70 px-3 py-3 text-xs text-[#94A3B8]">
          Riwayat kontribusi publik belum tersedia untuk ditampilkan saat ini.
        </div>
      )}

      {status === "error" && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded border border-[#1E293B] bg-[#060B19]/70 px-3 py-3 text-xs">
          <p className="text-[#CBD5E1]">
            Grafik kontribusi belum dapat dimuat ({error || "kendala jaringan"}).
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex min-h-[44px] items-center rounded border border-[#64748B] bg-[#0F172A] px-3 py-1.5 font-medium text-[#38BDF8] transition-colors hover:border-[#38BDF8]"
            >
              Coba Lagi
            </button>
            <a
              href={githubUrl || PROFILE_DATA.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1 rounded border border-[#1E293B] px-3 py-1.5 text-[#CBD5E1] transition-colors hover:border-[#38BDF8] hover:text-[#F8FAFC]"
            >
              <span>Lihat di GitHub</span>
              <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}

      {status === "ready" && weeks.length > 0 && (
        <div className="mt-3">
          {/* Baris label bulan selaras kolom minggu, disederhanakan di layar sempit agar tidak tumpang tindih */}
          <div
            aria-hidden="true"
            className="grid w-full gap-px text-[10px] leading-none text-[#94A3B8] sm:gap-[2px] lg:gap-[3px]"
            style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
          >
            {monthLabels.map((item, idx) => (
              <span
                key={`${item.label}-${item.weekIndex}`}
                style={{ gridColumnStart: item.weekIndex + 1 }}
                className={`col-span-1 overflow-visible whitespace-nowrap ${
                  idx % 2 === 1 ? "hidden sm:block" : ""
                }`}
              >
                {item.label}
              </span>
            ))}
          </div>

          {/* Pembungkus sentuh py-3 memberi tinggi sentuh >= 44px agar nyaman disentuh di HP */}
          <div
            className="-mx-1 cursor-crosshair rounded px-1 py-3 touch-pan-y focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
            role="application"
            tabIndex={0}
            aria-roledescription="kalender kontribusi interaktif"
            aria-label={
              activeDay
                ? `Kalender kontribusi GitHub ${PROFILE_DATA.handle}. Dipilih ${formatIsoDateId(activeDay.date)}: ${activeDay.count} kontribusi`
                : `Kalender kontribusi GitHub ${PROFILE_DATA.handle} selama 52 minggu. Gunakan tombol panah untuk menelusuri tanggal`
            }
            onFocus={() => {
              if (!activeCoords && latestCoords) {
                setActiveCoords(latestCoords);
              }
            }}
            onKeyDown={handleGridKeyDown}
            onPointerDown={(e) => {
              updateCoordsFromPointer(e.clientX, e.clientY);
            }}
            onPointerMove={(e) => {
              if (e.pointerType === "mouse" || e.buttons > 0) {
                updateCoordsFromPointer(e.clientX, e.clientY);
              }
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") {
                setActiveCoords(null);
              }
            }}
          >
            <div
              ref={gridRef}
              className="grid w-full gap-px sm:gap-[2px] lg:gap-[3px]"
              style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
            >
              {weeks.map((week, colIdx) => (
                <div
                  key={colIdx}
                  className="github-contrib-col grid grid-rows-7 gap-px sm:gap-[2px] lg:gap-[3px]"
                >
                  {week.map((day, rowIdx) => {
                    if (!day) {
                      return <div key={rowIdx} aria-hidden="true" className="aspect-square w-full" />;
                    }
                    const isSelected =
                      activeCoords?.col === colIdx && activeCoords?.row === rowIdx;
                    return (
                      <div
                        key={day.date}
                        aria-hidden="true"
                        className={`aspect-square w-full rounded-[2px] transition-transform duration-150 ${
                          LEVEL_STYLES[day.level] || LEVEL_STYLES[0]
                        } ${isSelected ? "relative z-10 scale-125 ring-1 ring-[#F8FAFC]" : ""}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div
            aria-live="polite"
            className="flex min-h-[20px] items-center justify-between gap-2 text-[11px] text-[#94A3B8]"
          >
            {activeDay ? (
              <span className="font-mono text-[#CBD5E1]">
                {formatIsoDateId(activeDay.date)}: {activeDay.count} kontribusi
              </span>
            ) : (
              <span>Arahkan kursor atau sentuh kotak untuk melihat detail harian</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
