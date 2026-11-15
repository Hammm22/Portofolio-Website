import Link from "next/link";
import { FolderOpen, House, Planet } from "@phosphor-icons/react/ssr";

export const metadata = {
  title: "404: Halaman Tidak Ditemukan",
  description:
    "Koordinat halaman tidak tersedia di portofolio Ilham Dwi Arsandy (Hammm22).",
  robots: {
    index: false,
    follow: false
  }
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#060B19] px-4 py-16 text-[#F8FAFC] sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[420px] w-[420px] rounded-full border border-[#1E293B]/70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[280px] w-[280px] rounded-full border border-dashed border-[#2563EB]/30"
      />

      <section className="relative z-10 w-full max-w-lg rounded-xl border border-[#1E293B] bg-[#0F172A]/90 p-7 text-center shadow-[0_24px_60px_rgba(6,11,25,0.75)] sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#1E293B] bg-[#060B19] text-[#38BDF8]">
          <Planet size={28} weight="duotone" aria-hidden="true" />
        </div>

        <p className="mt-5 font-mono text-xs tracking-[0.2em] text-[#38BDF8] uppercase">
          Status 404 · Luar Orbit
        </p>

        <h1 className="font-display-h2 mt-2 font-extrabold text-[#F8FAFC]">
          Halaman Tidak Ditemukan
        </h1>

        <p className="mx-auto mt-3 max-w-[42ch] text-sm leading-relaxed text-[#CBD5E1] sm:text-base">
          Tautan yang kamu tuju sudah berpindah atau tidak tersedia di
          observatorium ini. Silakan kembali ke beranda atau langsung jelajahi
          daftar karya.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-[#2563EB] px-5 py-3 text-sm font-semibold text-[#F8FAFC] transition-colors hover:bg-[#1D4ED8]"
          >
            <House size={18} weight="duotone" aria-hidden="true" />
            <span>Kembali ke Beranda</span>
          </Link>

          <Link
            href="/#projects"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-[#64748B] bg-[#060B19] px-5 py-3 text-sm font-medium text-[#F8FAFC] transition-colors hover:border-[#38BDF8] hover:bg-[#131F38]"
          >
            <FolderOpen size={18} weight="duotone" aria-hidden="true" />
            <span>Lihat Karya</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
