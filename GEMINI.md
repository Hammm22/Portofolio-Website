# GEMINI.md: Workspace Context & Rules for Gemini / Antigravity

File ini menyediakan konteks cepat untuk Gemini / Antigravity saat bekerja di dalam proyek **`portofolio-website`**.

## Referensi Utama
1. **[DESIGN.md](./DESIGN.md):** Spesifikasi sistem desain, palet warna Deep Midnight & Electric Cobalt yang telah diverifikasi WCAG AA, skala tipografi fluid `clamp()`, serta alasan fungsional satu baris (`R-31`).
2. **[AGENTS.md](./AGENTS.md):** Aturan arsitektur Next.js App Router (JavaScript), aturan penulisan salinan bebas *AI-slop*, serta standar aksesibilitas.

## Ringkasan Struktur Folder
- `src/app/layout.js` : Root Server Component (memuat font `Syne`, `Plus Jakarta Sans`, `JetBrains Mono`, `title.template`, dan *Skip-to-Content* link).
- `src/app/page.js` : Halaman utama (Server Component) yang menyusun 6 section utama portofolio (`Hero`, `AboutSection`, `FeaturedProjects`, `ProjectArchive`, `CertificateSection`, `JourneyTimeline`) dengan latar kanvas bintang astronomi.
- `src/app/not-found.js`, `manifest.js`, & `apple-icon.js` : Halaman 404 observatorium, Web App Manifest, dan ikon sentuh Apple.
- `src/app/globals.css` : Variabel CSS, aturan tipografi fluid, `:focus-visible`, dan `prefers-reduced-motion`.
- `src/data/` : Data modular terpisah per domain: `profileData.js` (profil Ilham Dwi Arsandy `Hammm22`, foto, CV), `techData.js` (`SKILL_GROUPS`), `projectsData.js` (4 proyek unggulan & 9 arsip repositori PPLG), `certificatesData.js` (`CERTIFICATES` & kategori), `journeyData.js` (perjalanan Kelas X-XII), serta `portfolioData.js` (barrel re-export kompatibilitas).
- `src/hooks/` : `useGithubProfile.js` (pengambilan statistik profil GitHub + cache lokal 30 menit + fallback data).
- `src/components/ui/` : `TechStackIcon.jsx` (ikon logo resmi 18 stack teknologi untuk `AboutSection`).
- `src/components/layout/` : `SmoothScroll.jsx` (Lenis + GSAP ticker + progress bar), `StarfieldCanvas.jsx` (HTML5 Canvas 3-layer parallax starfield + nebula + constellation cursor + shooting star), `ScrollRocket.jsx` (GSAP MotionPath scroll shuttle), `Navbar.jsx`, dan `Footer.jsx`.
- `src/components/sections/` : `Hero.jsx`, `HeroObservatory3D.jsx` (Three.js desktop lazy 3D gyroscope), `AboutSection.jsx`, `FeaturedProjects.jsx`, `ProjectVisualStage.jsx`, `ProjectArchive.jsx`, `CertificateSection.jsx`, dan `JourneyTimeline.jsx`.
- `tests/` & `.github/workflows/ci.yml` : Unit test built-in Node (`npm test`) dan pipeline CI otomatis (`lint`, `test`, `build`).
- `public/` : `images/profile-placeholder.svg` (bingkai potret 4:5), `images/certificates/*.svg` (6 placeholder foto sertifikat 16:11), dan `cv-ilham-dwi-arsandy.pdf`.

## Prinsip Utama Saat Mengedit
- Gunakan **JavaScript (`.js`/`.jsx`)**, bukan TypeScript.
- Jaga agar narasi tetap simpel dan fokus sebagai **Web & Mobile Developer (SMK PPLG)** tanpa membawa elemen atau jargon Linux.
- Pastikan tidak ada satupun karakter em-dash (`—`) di dalam teks yang tampil ke layar.
- Selalu jalankan `npm run build` dan `npm run lint` setelah melakukan perubahan kode.

## Tool & File Constraints
- NEVER read, inspect, or call `read_file` on binary icon files (`*.ico`), font files (`*.woff2`, `*.ttf`), or compiled archives.
- Assume `favicon.ico` exists if referenced in HTML/Blade/Next.js metadata without opening the file.