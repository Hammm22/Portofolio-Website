# GEMINI.md: Workspace Context & Rules for Gemini / Antigravity

File ini menyediakan konteks cepat untuk Gemini / Antigravity saat bekerja di dalam proyek **`portofolio-website`**.

## Referensi Utama
1. **[DESIGN.md](./DESIGN.md):** Spesifikasi sistem desain, palet warna Deep Midnight & Electric Cobalt yang telah diverifikasi WCAG AA, skala tipografi fluid `clamp()`, serta alasan fungsional satu baris (`R-31`).
2. **[AGENTS.md](./AGENTS.md):** Aturan arsitektur Next.js App Router (JavaScript), aturan penulisan salinan bebas *AI-slop*, serta standar aksesibilitas.

## Ringkasan Struktur Folder
- `src/app/layout.js` : Root Server Component (memuat font `Syne`, `Plus Jakarta Sans`, `JetBrains Mono` dan *Skip-to-Content* link).
- `src/app/page.js` : Halaman utama (Server Component) yang menyusun 9 section portofolio (`Hero`, `KineticMarquee`, `AboutSection`, `ServicesSection`, `FeaturedProjects`, `WorkflowSection`, `ProjectArchive`, `CertificateSection`, `JourneyTimeline`) dengan latar kanvas bintang astronomi.
- `src/app/globals.css` : Variabel CSS, aturan tipografi fluid, `:focus-visible`, dan `prefers-reduced-motion`.
- `src/data/portfolioData.js` : Sumber data terpusat berisi profil Ilham Dwi Arsandy (`Hammm22`), foto potret observatorium (`photoUrl`), CV (`cvUrl`), 4 proyek unggulan, 9 arsip repositori PPLG, 6 sertifikat kompetensi (`CERTIFICATES`), matriks keahlian, dan perjalanan belajar Kelas X-XII.
- `src/components/layout/` : `SmoothScroll.jsx` (Lenis + GSAP ticker + progress bar), `StarfieldCanvas.jsx` (HTML5 Canvas 3-layer parallax starfield + nebula + constellation cursor + shooting star), `CustomCursor.jsx` (cincin kursor interaktif), `Navbar.jsx`, dan `Footer.jsx`.
- `src/components/sections/` : `Hero.jsx`, `KineticMarquee.jsx`, `AboutSection.jsx`, `ServicesSection.jsx`, `FeaturedProjects.jsx`, `WorkflowSection.jsx`, `ProjectVisualStage.jsx`, `ProjectArchive.jsx`, `CertificateSection.jsx`, dan `JourneyTimeline.jsx`.
- `public/` : `images/profile-placeholder.svg` (bingkai potret 4:5), `images/certificates/*.svg` (6 placeholder foto sertifikat 16:11), dan `cv-ilham-dwi-arsandy.pdf`.

## Prinsip Utama Saat Mengedit
- Gunakan **JavaScript (`.js`/`.jsx`)**, bukan TypeScript.
- Jaga agar narasi tetap simpel dan fokus sebagai **Web & Mobile Developer (SMK PPLG)** tanpa membawa elemen atau jargon Linux.
- Pastikan tidak ada satupun karakter em-dash (`—`) di dalam teks yang tampil ke layar.
- Selalu jalankan `npm run build` dan `npm run lint` setelah melakukan perubahan kode.

## Tool & File Constraints
- NEVER read, inspect, or call `read_file` on binary icon files (`*.ico`), font files (`*.woff2`, `*.ttf`), or compiled archives.
- Assume `favicon.ico` exists if referenced in HTML/Blade/Next.js metadata without opening the file.