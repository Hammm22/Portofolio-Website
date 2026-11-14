"use client";

import { useState, useMemo } from "react";
import {
  Globe,
  DeviceMobile,
  MagnifyingGlass,
  FilmSlate,
  Plus,
  ArrowsClockwise,
  Thermometer,
  MapPin,
  Tag,
  CheckCircle,
  Star
} from "@phosphor-icons/react";

const JEJAK_ROUTES = [
  {
    route: "/dashboard",
    label: "Ringkasan",
    temp: "36.5°C",
    status: "Suhu Normal",
    entries: [
      { place: "Lab PPLG Sekolah", time: "08:15", temp: "36.4°C" },
      { place: "Perpustakaan Daerah", time: "13:40", temp: "36.6°C" }
    ]
  },
  {
    route: "/catat",
    label: "Catat Baru",
    temp: "Form Input",
    status: "Validasi NIK",
    entries: [
      { place: "Lokasi Tujuan", time: "Wajib isi", temp: "Teks" },
      { place: "Suhu Tubuh", time: "Rentang", temp: "35-42°C" }
    ]
  },
  {
    route: "/view",
    label: "Riwayat",
    temp: "Arsip Log",
    status: "Relasi Prisma",
    entries: [
      { place: "Stasiun Kota", time: "10 Nov", temp: "36.5°C" },
      { place: "Ruang Praktik", time: "11 Nov", temp: "36.7°C" }
    ]
  }
];

const KETEMUIN_VIEWS = [
  {
    id: "hilang",
    label: "Hilang",
    title: "Laporan Barang Hilang",
    badge: "Menunggu",
    item: "Flashdisk 32GB Biru",
    location: "Lab Komputer 2",
    fields: ["Nama & Ciri Barang", "Lokasi Terakhir", "Status Pencarian"]
  },
  {
    id: "ditemukan",
    label: "Temuan",
    title: "Daftar Barang Temuan",
    badge: "Terverifikasi",
    item: "Kartu Pelajar PPLG",
    location: "Kantin Utama",
    fields: ["Kategori Barang", "Titik Penemuan", "Verifikasi Klaim"]
  },
  {
    id: "status",
    label: "Klaim",
    title: "Status Pengembalian",
    badge: "Selesai",
    item: "Pengisi Daya Laptop",
    location: "Pos Keamanan",
    fields: ["Konfirmasi Pemilik", "Bukti Serah Terima", "Dikembalikan"]
  }
];

const MOVIELIST_CATALOG = [
  {
    id: "interstellar",
    title: "Interstellar",
    year: "2014",
    rating: "8.7",
    genre: "Sci-Fi",
    sub: "Eksplorasi antarbintang dan visual daftar film populer TMDB."
  },
  {
    id: "inception",
    title: "Inception",
    year: "2010",
    rating: "8.8",
    genre: "Aksi",
    sub: "Pencarian instan ber-debounce yang menyaring judul secara langsung."
  },
  {
    id: "dune",
    title: "Dune: Part Two",
    year: "2024",
    rating: "8.5",
    genre: "Petualangan",
    sub: "Halaman Detail.jsx sinematik dengan sinopsis, skor, dan transisi halaman."
  }
];

const GAMEJAR_ITEMS = [
  { title: "RPG Open World", discount: "-40%", target: "Rp 329.000" },
  { title: "Indie Strategy", discount: "-25%", target: "Rp 115.000" }
];

function JejakSehatPreview() {
  const [surface, setSurface] = useState("web");
  const [activeRouteIdx, setActiveRouteIdx] = useState(0);
  const currentRoute = JEJAK_ROUTES[activeRouteIdx];

  return (
    <div className="flex h-full flex-col justify-between bg-[#060B19]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E293B] bg-[#0F172A] px-3.5 py-2">
        <span className="flex items-center gap-2 font-mono text-xs text-[#CBD5E1]">
          {surface === "web" ? (
            <Globe size={15} weight="duotone" className="text-[#38BDF8]" aria-hidden="true" />
          ) : (
            <DeviceMobile size={15} weight="duotone" className="text-[#38BDF8]" aria-hidden="true" />
          )}
          <span>{surface === "web" ? currentRoute.route : "Flutter App"}</span>
        </span>

        <div
          role="group"
          aria-label="Pilih tampilan Jejak Sehat"
          className="flex items-center gap-1.5"
        >
          <button
            type="button"
            aria-pressed={surface === "web"}
            onClick={() => setSurface("web")}
            className={`min-h-[44px] rounded px-3 text-xs font-medium transition-colors ${
              surface === "web"
                ? "bg-[#2563EB] text-[#F8FAFC]"
                : "border border-[#64748B] bg-[#060B19] text-[#CBD5E1] hover:border-[#38BDF8]"
            }`}
          >
            Web
          </button>
          <button
            type="button"
            aria-pressed={surface === "mobile"}
            onClick={() => setSurface("mobile")}
            className={`min-h-[44px] rounded px-3 text-xs font-medium transition-colors ${
              surface === "mobile"
                ? "bg-[#2563EB] text-[#F8FAFC]"
                : "border border-[#64748B] bg-[#060B19] text-[#CBD5E1] hover:border-[#38BDF8]"
            }`}
          >
            Flutter
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        {surface === "web" ? (
          <>
            <div className="flex flex-wrap gap-1.5 border-b border-[#1E293B] pb-3">
              {JEJAK_ROUTES.map((item, idx) => (
                <button
                  key={item.route}
                  type="button"
                  aria-pressed={activeRouteIdx === idx}
                  onClick={() => setActiveRouteIdx(idx)}
                  className={`min-h-[44px] rounded px-3 text-xs transition-colors ${
                    activeRouteIdx === idx
                      ? "border border-[#38BDF8] bg-[#131F38] text-[#F8FAFC]"
                      : "border border-[#1E293B] bg-[#0F172A] text-[#94A3B8] hover:border-[#64748B] hover:text-[#F8FAFC]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <div className="rounded border border-[#1E293B] bg-[#0F172A] p-2.5">
                <span className="flex items-center gap-1.5 text-[11px] text-[#94A3B8]">
                  <Thermometer size={13} className="text-[#38BDF8]" aria-hidden="true" />
                  <span>{currentRoute.label}</span>
                </span>
                <p className="mt-1 font-display text-base font-bold text-[#F8FAFC]">
                  {currentRoute.temp}
                </p>
              </div>
              <div className="rounded border border-[#1E293B] bg-[#0F172A] p-2.5">
                <span className="flex items-center gap-1.5 text-[11px] text-[#94A3B8]">
                  <CheckCircle size={13} className="text-[#38BDF8]" aria-hidden="true" />
                  <span>Status UI</span>
                </span>
                <p className="mt-1 font-mono text-xs font-medium text-[#38BDF8]">
                  {currentRoute.status}
                </p>
              </div>
            </div>

            <ul className="mt-3 divide-y divide-[#1E293B] rounded border border-[#1E293B] bg-[#0F172A]/70 px-3">
              {currentRoute.entries.map((entry) => (
                <li
                  key={entry.place}
                  className="flex flex-wrap items-center justify-between gap-1 py-2 text-xs"
                >
                  <span className="flex items-center gap-1.5 text-[#CBD5E1]">
                    <MapPin size={12} className="shrink-0 text-[#38BDF8]" aria-hidden="true" />
                    <span>{entry.place}</span>
                  </span>
                  <span className="font-mono text-[#94A3B8]">
                    {entry.time} · {entry.temp}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="mx-auto flex w-full max-w-[230px] flex-col justify-between rounded-xl border border-[#38BDF8]/45 bg-[#0F172A] p-3.5 shadow-lg">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
              <span className="font-display text-xs font-bold text-[#F8FAFC]">
                JejakSehat Mobile
              </span>
              <span className="rounded bg-[#131F38] px-1.5 py-0.5 font-mono text-[10px] text-[#38BDF8]">
                Dart
              </span>
            </div>
            <div className="my-3 rounded-md border border-[#1E293B] bg-[#060B19] p-3 text-center">
              <p className="text-[11px] text-[#94A3B8]">Simulasi Layar Ponsel</p>
              <p className="mt-1 font-display text-xl font-extrabold text-[#38BDF8]">
                36.5°C
              </p>
              <p className="mt-0.5 text-[11px] text-[#CBD5E1]">
                Sinkronisasi riwayat perjalanan Android
              </p>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#94A3B8]">
              <span>lib/pages</span>
              <span>lib/service</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function KetemuinPreview() {
  const [tabIdx, setTabIdx] = useState(0);
  const activeView = KETEMUIN_VIEWS[tabIdx];

  return (
    <div className="flex h-full flex-col justify-between bg-[#060B19]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E293B] bg-[#0F172A] px-3.5 py-2">
        <span className="font-mono text-xs text-[#CBD5E1]">/statistik/home</span>

        <div
          role="group"
          aria-label="Pilih alur Ketemuin.com"
          className="flex flex-wrap gap-1.5"
        >
          {KETEMUIN_VIEWS.map((view, idx) => (
            <button
              key={view.id}
              type="button"
              aria-pressed={tabIdx === idx}
              onClick={() => setTabIdx(idx)}
              className={`min-h-[44px] rounded px-3 text-xs font-medium transition-colors ${
                tabIdx === idx
                  ? "bg-[#2563EB] text-[#F8FAFC]"
                  : "border border-[#64748B] bg-[#060B19] text-[#CBD5E1] hover:border-[#38BDF8]"
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="rounded border border-[#1E293B] bg-[#0F172A] p-3">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-display text-sm font-bold text-[#F8FAFC]">
              {activeView.title}
            </h4>
            <span className="rounded border border-[#38BDF8]/50 bg-[#131F38] px-2 py-0.5 font-mono text-[11px] text-[#38BDF8]">
              {activeView.badge}
            </span>
          </div>
          <p className="mt-1.5 text-xs text-[#CBD5E1]">
            Contoh entri: <span className="font-medium text-[#F8FAFC]">{activeView.item}</span> ({activeView.location})
          </p>
        </div>

        <ul className="mt-3 divide-y divide-[#1E293B] rounded border border-[#1E293B] bg-[#0F172A]/70 px-3">
          {activeView.fields.map((field, idx) => (
            <li
              key={field}
              className="flex items-center justify-between py-2 text-xs text-[#CBD5E1]"
            >
              <span>{field}</span>
              <span className="font-mono text-[11px] text-[#94A3B8]">
                0{idx + 1}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MovieListPreview() {
  const [selectedId, setSelectedId] = useState(MOVIELIST_CATALOG[0].id);
  const [filterText, setFilterText] = useState("");

  const visibleMovies = useMemo(() => {
    const q = filterText.trim().toLowerCase();
    if (!q) return MOVIELIST_CATALOG;
    return MOVIELIST_CATALOG.filter((movie) =>
      movie.title.toLowerCase().includes(q)
    );
  }, [filterText]);

  const activeItem =
    visibleMovies.find((item) => item.id === selectedId) ||
    visibleMovies[0] ||
    MOVIELIST_CATALOG[0];

  return (
    <div className="flex h-full flex-col justify-between bg-[#060B19]">
      <div className="flex items-center justify-between gap-2 border-b border-[#1E293B] bg-[#0F172A] px-3.5 py-2.5">
        <span className="flex items-center gap-2 text-xs text-[#CBD5E1]">
          <FilmSlate size={15} weight="duotone" className="text-[#38BDF8]" aria-hidden="true" />
          <span>Simulasi Katalog TMDB</span>
        </span>
        <span className="font-mono text-[11px] text-[#94A3B8]">React + Vite</span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="relative">
            <label htmlFor="movielist-preview-search" className="sr-only">
              Simulasi pencarian judul film
            </label>
            <MagnifyingGlass
              size={14}
              className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-[#94A3B8]"
              aria-hidden="true"
            />
            <input
              id="movielist-preview-search"
              type="search"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Coba ketik judul film..."
              className="min-h-[44px] w-full rounded border border-[#1E293B] bg-[#0F172A] py-2 pr-3 pl-8 text-xs text-[#F8FAFC] placeholder-[#94A3B8] focus:border-[#38BDF8] focus:outline-none"
            />
          </div>

          {visibleMovies.length === 0 ? (
            <p className="mt-4 rounded border border-[#1E293B] bg-[#0F172A] p-3 text-center text-xs text-[#94A3B8]">
              Film tidak cocok. Hapus kata kunci untuk menampilkan daftar.
            </p>
          ) : (
            <div className="mt-3 grid grid-cols-1 gap-2 min-[420px]:grid-cols-3">
              {visibleMovies.map((item) => {
                const isSelected = activeItem.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedId(item.id)}
                    className={`flex min-h-[64px] flex-col justify-between rounded border p-2 text-left transition-colors min-[420px]:min-h-[76px] ${
                      isSelected
                        ? "border-[#38BDF8] bg-[#131F38] text-[#F8FAFC]"
                        : "border-[#1E293B] bg-[#0F172A] text-[#94A3B8] hover:border-[#64748B]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-mono text-[#94A3B8]">{item.year}</span>
                      <span className="flex items-center gap-0.5 font-mono text-[#38BDF8]">
                        <Star size={10} weight="fill" aria-hidden="true" />
                        {item.rating}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold leading-tight text-[#F8FAFC]">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-[10px] text-[#94A3B8]">
                        {item.genre}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-3 border-t border-[#1E293B] pt-2.5">
          <p className="font-display text-xs font-bold text-[#F8FAFC]">
            {activeItem.title} ({activeItem.year})
          </p>
          <p className="mt-0.5 text-xs text-[#CBD5E1]">{activeItem.sub}</p>
        </div>
      </div>
    </div>
  );
}

function GameJarPreview() {
  const [savedPct, setSavedPct] = useState(65);

  const handleAddSaving = () => {
    setSavedPct((prev) => (prev >= 100 ? 25 : Math.min(100, prev + 25)));
  };

  return (
    <div className="flex h-full flex-col justify-between bg-[#060B19]">
      <div className="flex items-center justify-between gap-2 border-b border-[#1E293B] bg-[#0F172A] px-3.5 py-2">
        <span className="flex items-center gap-2 text-xs text-[#CBD5E1]">
          <DeviceMobile size={15} weight="duotone" className="text-[#38BDF8]" aria-hidden="true" />
          <span>Simulasi Wishlist &amp; Celengan</span>
        </span>

        <button
          type="button"
          onClick={handleAddSaving}
          className="inline-flex min-h-[44px] items-center gap-1 rounded bg-[#2563EB] px-3 text-xs font-semibold text-[#F8FAFC] transition-colors hover:bg-[#1D4ED8]"
        >
          {savedPct >= 100 ? (
            <>
              <ArrowsClockwise size={13} weight="bold" aria-hidden="true" />
              <span>Ulangi</span>
            </>
          ) : (
            <>
              <Plus size={13} weight="bold" aria-hidden="true" />
              <span>Tambah +25%</span>
            </>
          )}
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <ul className="space-y-2">
          {GAMEJAR_ITEMS.map((game) => (
            <li
              key={game.title}
              className="flex flex-wrap items-center justify-between gap-1.5 rounded border border-[#1E293B] bg-[#0F172A] px-3 py-2 text-xs"
            >
              <span className="flex items-center gap-2 font-medium text-[#F8FAFC]">
                <Tag size={13} className="text-[#38BDF8]" aria-hidden="true" />
                <span>{game.title}</span>
              </span>
              <span className="flex items-center gap-2 font-mono">
                <span className="rounded bg-[#131F38] px-1.5 py-0.5 text-[11px] text-[#38BDF8]">
                  {game.discount}
                </span>
                <span className="text-[#94A3B8]">{game.target}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-3 border-t border-[#1E293B] pt-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-[#CBD5E1]">Progres Tabungan Target</span>
            <span className="font-mono font-bold text-[#38BDF8] tabular-nums">
              {savedPct}%
            </span>
          </div>
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#0F172A]">
            <div
              className="h-full bg-[#2563EB] transition-all duration-300"
              style={{ width: `${savedPct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectVisualStage({ projectId }) {
  return (
    <div className="h-full min-h-[250px] overflow-hidden rounded-md border border-[#1E293B] bg-[#060B19]">
      {projectId === "jejak-sehat" && <JejakSehatPreview />}
      {projectId === "ketemuin" && <KetemuinPreview />}
      {projectId === "movielist" && <MovieListPreview />}
      {projectId === "gamejar" && <GameJarPreview />}
    </div>
  );
}
