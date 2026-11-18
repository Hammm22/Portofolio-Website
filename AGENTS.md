# AGENTS.md: Instructions for AI Coding Agents

Dokumen ini menjadi panduan utama bagi setiap AI agent yang membaca, memodifikasi, atau mengembangkan repositori **`portofolio-website`** milik **Ilham Dwi Arsandy (`Hammm22`)**.

## 1. Konteks Proyek & Stack Teknis
- **Pemilik:** Ilham Dwi Arsandy (`Hammm22`), siswa SMK Jurusan PPLG (Pengembangan Perangkat Lunak dan Gim).
- **Framework:** Next.js (App Router) dengan **JavaScript murni (`.js` / `.jsx`)**. Jangan menambahkan file TypeScript (`.ts` / `.tsx`).
- **Styling:** Tailwind CSS + CSS Variables di `src/app/globals.css` (spesifikasi lengkap ada di `DESIGN.md`).
- **Animasi & Scroll:** `gsap`, `@gsap/react`, `ScrollTrigger`, dan `lenis` (`lenis/react`).
- **Ikon:** `@phosphor-icons/react` (jangan gunakan `lucide-react` untuk menghindari tampilan generik AI sesuai `R-04`).

## 2. Aturan Konten & Identitas (Wajib Dipatuhi)
1. **Tanpa Atribut Linux berlebihan (No Linux Glazing):**
   - Fokuskan narasi murni pada karya rekayasa perangkat lunak di SMK PPLG: pengembangan aplikasi Web (React, Next.js, Vue, Laravel, PHP) dan Mobile (Flutter/Dart, Android Java).
   - Jangan menambahkan jendela terminal palsu, kutipan *"I use Arch BTW"*, atau dekorasi distro Linux.
2. **Data Asli GitHub `Hammm22` (`R-17`, `R-18`, `R-36`, `R-38`):**
   - Gunakan repositori nyata milik `Hammm22` (`Jejak-Sehat`, `JejakSehat_Mobile`, `Ketemuin.com`, `MovieList`, `GameJar`, `concert-app`, `inventory-app`, `Perpus-Digital`, `Portfolio-Website`).
   - Dilarang mengarang angka klaim palsu, testimoni fiktif, atau tautan kosong `href="#"`.
3. **Standar Copywriting (`antislop-copywriting`, `R-02`, `R-16`):**
   - **Dilarang keras menggunakan karakter em-dash (`—`)** di seluruh teks UI, deskripsi proyek, maupun metadata. Gunakan tanda titik dua (`:`), koma, atau kalimat terpisah.
   - Hindari kata klise AI (*seamless, cutting-edge, unleash, elevate, delve, next-gen*). Gunakan kalimat aktif yang lugas dalam Bahasa Indonesia.

## 3. Arsitektur Komponen Next.js (`ui-ux-pro-max`)
- Pertahankan `src/app/layout.js` dan `src/app/page.js` sebagai **Server Components**.
- Letakkan `'use client'` hanya pada komponen interaktif di dalam `src/components/`.
- Gunakan `useGSAP` dari `@gsap/react` dengan `{ scope }` dan `gsap.matchMedia()` agar semua `ScrollTrigger` bersih saat komponen di-*unmount* atau ukuran layar berubah.

## 4. Standar Kualitas UI & Aksesibilitas (`antislop` Mode 1)
- **Kontras Warna (`R-25`):** Seluruh teks normal wajib memiliki kontras minimal **4.5:1** terhadap latar belakangnya (`#F8FAFC`, `#CBD5E1`, dan `#94A3B8` di atas `#060B19` / `#0F172A`). Jangan gunakan `#64748B` untuk teks berukuran normal.
- **State Lengkap (`R-27`):** Komponen yang memuat data eksternal (`AboutSection.jsx` untuk GitHub API) atau memfilter daftar (`ProjectArchive.jsx`) wajib menampilkan state *Loading*, *Empty*, *Error* (dengan tombol coba lagi + fallback data terverifikasi), dan *Success*.
- **Aksesibilitas Keyboard & Gerak (`R-32`):** Semua elemen interaktif wajib memiliki `:focus-visible` yang jelas (`2px solid #38BDF8`), mendukung penutupan drawer dengan tombol `Escape`, memiliki ukuran target sentuh minimal `44x44px`, dan menghormati `@media (prefers-reduced-motion: reduce)`.

## 5. Perintah Kerja
- Menjalankan server pengembangan: `npm run dev`
- Memeriksa kualitas kode: `npm run lint`
- Membangun versi produksi: `npm run build`

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
