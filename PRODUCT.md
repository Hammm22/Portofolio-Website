# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Guru Produktif SMK PPLG & Juri Lomba (LKS):** Menilai kualitas rekayasa perangkat lunak, struktur kode, aksesibilitas antarmuka, dan kelengkapan proyek sekolah maupun mandiri milik Ilham Dwi Arsandy (`Hammm22`).
- **Perusahaan Tempat PKL / Magang Industri & Rekruter Junior Frontend/Web:** Meninjau bukti kemampuan teknis nyata pada pengembangan Web (React, Next.js, Vue, Laravel, PHP) dan Mobile (Flutter/Dart, Android Java) melalui demo langsung dan repositori GitHub publik.
- **Rekan Developer & Kolaborator Proyek:** Melihat rekam jejak kolaborasi tim (seperti proyek Android `GameJar`) dan menjajaki kerja sama proyek baru.

## Product Purpose

Website portofolio resmi **Ilham Dwi Arsandy (`Hammm22`)** yang berfungsi sebagai bukti kerja terverifikasi (*proof-of-work*) di bidang Pengembangan Perangkat Lunak dan Gim (SMK PPLG). Keberhasilan produk diukur dari kemudahan pengunjung memahami keahlian teknis Ilham, mencoba demo aplikasi langsung (*Jejak Sehat*, *MovieList*), memeriksa 9 repositori publik di GitHub, serta menghubungi Ilham untuk kebutuhan penilaian akademik, kompetisi LKS, atau kesempatan PKL/magang industri.

## Positioning

Portofolio siswa SMK PPLG yang menggabungkan dokumentasi rekayasa lintas platform nyata (aplikasi kesehatan `Jejak Sehat` dalam versi Web JavaScript dan Mobile Flutter/Dart, platform fullstack Laravel `Ketemuin.com`, katalog film `MovieList`, serta kolaborasi Android Java `GameJar`) dengan telemetri langsung dari GitHub REST API `@Hammm22`, tanpa klaim statistik karangan atau proyek fiktif.

## Operating Context

- Diakses oleh guru, juri LKS, dan pembimbing/rekruter industri melalui layar laptop/desktop laboratorium maupun ponsel pintar.
- Terhubung langsung ke ekosistem GitHub (`https://github.com/Hammm22`) dan deployment langsung di Vercel (`https://jejak-sehat.vercel.app`, `https://movie-list-gilt.vercel.app`).

## Capabilities and Constraints

- **Stack Teknis Terkunci:** Next.js (App Router) dengan JavaScript murni (`.js` / `.jsx`, tanpa TypeScript), Tailwind CSS, GSAP (`@gsap/react`, `ScrollTrigger`, `Flip`, `MotionPathPlugin`), kanvas bintang 2D + panggung astrolabe SVG observatorium, Lenis Smooth Scroll, dan `@phosphor-icons/react`.
- **Integrasi Data Nyata:** Mengambil statistik profil publik secara langsung dari `https://api.github.com/users/Hammm22` disertai fallback data terverifikasi saat API mengalami batas pemanggilan (*rate limit*) atau kendala jaringan.
- **Kejujuran Bukti:** Hanya menampilkan proyek yang benar-benar ada di akun GitHub `Hammm22`. Dilarang menambahkan testimoni fiktif, metrik perusahaan karangan, atau tautan kosong.
- **Fakta Terbuka (Menunggu Input Pengguna):** Nama spesifik sekolah SMK, tautan LinkedIn, foto profil, scan sertifikat asli, dan pengisian penuh berkas PDF CV (email aktif saat ini memakai `ilhamdwiarsandy61@gmail.com`).

## Brand Commitments

- **Identitas Pemilik:** Ilham Dwi Arsandy (`Hammm22`), tagline `"Code. Create. Improve."`.
- **Suara & Gaya Bahasa:** Bahasa Indonesia yang lugas, aktif, dan langsung ke substansi teknis.
- **Batasan Narasi & Tanda Baca:**
  - Fokus murni pada karya Web & Mobile Developer (SMK PPLG); tidak membawa atribut atau jargon distro Linux berlebihan (*no Linux glazing*) maupun jendela terminal palsu.
  - Bebas dari karakter *em-dash* (`—`) dan kata klise AI (*seamless, revolutionary, cutting-edge, unleash, elevate*).

## Evidence on Hand

- **Data Terpusat (Modular):** `src/data/` (`profileData.js`, `techData.js`, `projectsData.js`, `certificatesData.js`, `journeyData.js`, + barrel `portfolioData.js`)
- **4 Karya Pilihan Utama:**
  1. `Jejak Sehat` (Web JavaScript & Mobile Flutter/Dart) — Live: `https://jejak-sehat.vercel.app` | Repo Web: `https://github.com/Hammm22/Jejak-Sehat` | Repo Mobile: `https://github.com/Hammm22/JejakSehat_Mobile`
  2. `Ketemuin.com` (Fullstack Laravel & Blade Lost and Found) — Repo: `https://github.com/Hammm22/Ketemuin.com`
  3. `MovieList` (Katalog Film Interaktif JavaScript) — Live: `https://movie-list-gilt.vercel.app` | Repo: `https://github.com/Hammm22/MovieList`
  4. `GameJar` (Aplikasi Android Java Kolaborasi bersama Lauvin dan Dyah Ayu) — Repo: `https://github.com/Hammm22/GameJar`
- **5 Repositori Tambahan di Arsip PPLG:**
  - `concert-app` (Vue.js): `https://github.com/Hammm22/concert-app`
  - `inventory-app` (JavaScript CRUD): `https://github.com/Hammm22/inventory-app`
  - `Perpus-Digital` (PHP & MySQL): `https://github.com/Hammm22/Perpus-Digital`
  - `Portfolio-Website` (v1): `https://github.com/Hammm22/Portfolio-Website` (Live: `https://portfolio-website-three-roan-77.vercel.app`)
- **Absensi yang Tidak Boleh Dikarang:** Belum ada testimoni klien/guru tertulis atau metrik jumlah pengguna produksi; jangan pernah mengarang kutipan testimoni atau angka pertumbuhan fiktif.

## Product Principles

1. **Bukti Kode di Atas Klaim Kosong:** Setiap klaim keahlian harus dapat ditelusuri langsung ke repositori GitHub `@Hammm22` atau tautan demo aktif.
2. **Sederhana & Fokus Rekayasa:** Tampilkan identitas sebagai pengembang Web dan Mobile SMK PPLG yang matang tanpa distraksi gimmick OS/terminal palsu.
3. **Ketahanan di Setiap Kondisi Jaringan & Perangkat:** Seluruh komponen dinamis wajib memiliki state *Loading*, *Empty*, *Error* (dengan tombol muat ulang dan fallback nyata), serta nyaman diakses baik di layar ponsel maupun desktop.
4. **Kejelasan untuk Penilai & Rekruter:** Struktur halaman memudahkan guru, juri LKS, dan pembimbing PKL menemukan karya unggulan, rincian teknologi, dan kontak dalam satu kali baca.

## Accessibility & Inclusion

- Memenuhi standar kontras minimum **WCAG AA** (`>= 4.5:1` untuk seluruh teks normal, `>= 3.0:1` untuk batas kontrol interaktif dan indikator fokus).
- Mendukung navigasi penuh menggunakan keyboard (`:focus-visible` yang tegas, tautan *Lewati ke konten utama*, penutupan menu mobile dengan `Escape`), ukuran target sentuh minimal `44x44px`, dan menghormati preferensi sistem `@media (prefers-reduced-motion: reduce)`.
