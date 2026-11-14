# DESIGN.md: Design System & Architecture Specification

## 1. Design Read & Identity
- **Project:** Portfolio Website for **Ilham Dwi Arsandy** (`Hammm22`)
- **Profile Positioning:** Siswa SMK Jurusan PPLG (Pengembangan Perangkat Lunak dan Gim) yang berfokus pada pengembangan aplikasi Web Interaktif (React, Next.js, Laravel) dan Mobile (Flutter, Android Java).
- **Target Audience:** Guru produktif PPLG, juri LKS (Lomba Kompetensi Siswa), rekan developer, dan kolaborator proyek.
- **Design Read (`antislop` Part 3):**
  > Reading this as a *Scroll-Triggered Storytelling Portfolio* for *teachers, LKS judges, and developer peers*, in an *Editorial High-Contrast Dark Blue* visual language, dial **ENERGY 3 / RHYTHM 3 / MOTION 3** (`ui-ux-pro-max` Variance 8/10, Motion 9/10, Density 4/10).

---

## 2. Functional Decision Ledger (`R-31`: Every Decision Must Have a Reason)

| Elemen | Keputusan | Alasan Fungsional Satu Baris (`R-31`) |
| :--- | :--- | :--- |
| **Latar Utama (`R-21`)** | Deep Midnight (`#060B19`) | Memberikan kontras panggung tinggi agar pratinjau visual proyek web dan mobile langsung menonjol. |
| **Permukaan Panel (`R-20`)** | Dark Slate Navy (`#0F172A`) | Memisahkan kartu proyek dan panel metrik GitHub dari latar utama tanpa perlu efek bayangan kabur berlebihan. |
| **Satu Aksen Utama (`R-29`)** | Electric Cobalt (`#2563EB`) | Memusatkan perhatian mata hanya pada CTA utama, garis progres cerita, dan status filter aktif. |
| **Aksen Fokus (`R-32`)** | Ice Cyan (`#38BDF8`) | Menyediakan cincin `:focus-visible` dan penanda interaktif dengan rasio kontras tinggi (9.16:1) bagi pengguna keyboard. |
| **Tipografi Heading (`R-06`)** | `Syne` (700/800) | Proporsi geometris lebar memberi karakter *showcase* kreatif yang kuat tanpa bergantung pada hiasan dekoratif. |
| **Tipografi Body (`R-06`)** | `Plus Jakarta Sans` (400/500/600) | Menjamin keterbacaan paragraf yang jernih di layar ponsel maupun monitor laboratorium sekolah. |
| **Tipografi Teknis (`R-06`)** | `JetBrains Mono` (400/500) | Membedakan metadata teknis (indeks bab, tahun, bahasa pemrograman, metrik GitHub) dari narasi utama. |
| **Ikonografi (`R-04`)** | `@phosphor-icons/react` | Menghindari tampilan default Lucide sekaligus memberi ikon bermakna jelas hanya pada aksi eksternal dan salin. |
| **Batas Pinning (`R-19`)** | 1 section (`FeaturedProjects`) | Mencegah kelelahan scroll sesuai pedoman `ui-ux-pro-max` (maksimal 1 section pinned di halaman). |
| **Batas Glassmorphism (`R-10`)** | Hanya pada `Navbar.jsx` | Menjaga keterbacaan navigasi saat melayang di atas konten tanpa membuat halaman tampak kabur. |
| **Batas Glow (`R-13`)** | Fokus pada CTA utama saja | Menghindari polusi cahaya (*glow everywhere*) sehingga tombol utama langsung dikenali. |

---

## 3. Color Palette & Verified WCAG AA Contrast (`antislop-human` & `R-25`)

Seluruh pasangan warna telah diuji menggunakan `contrast-check.py`:

| CSS Custom Property | Hex | Peran | Latar Pasangan | Rasio Kontras | Status WCAG AA |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `--bg-primary` | `#060B19` | Latar belakang utama halaman | - | - | Base |
| `--bg-surface` | `#0F172A` | Permukaan kartu, panel GitHub, baris aktif | `#060B19` | - | Surface |
| `--border-subtle` | `#1E293B` | Garis pemisah struktural non-interaktif | `#060B19` | - | Decorative Divider |
| `--border-visible` | `#64748B` | Batas kontrol interaktif, tombol sekunder, input | `#060B19` / `#0F172A` | **4.13:1** / **3.75:1** | **PASS** (Non-text >= 3.0:1) |
| `--text-primary` | `#F8FAFC` | Teks judul dan isi utama | `#060B19` | **18.76:1** | **PASS** (>= 4.5:1) |
| `--text-secondary` | `#CBD5E1` | Paragraf deskripsi proyek dan cerita | `#0F172A` | **13.12:1** | **PASS** (>= 4.5:1) |
| `--text-muted` | `#94A3B8` | Metadata, tahun, label teknologi, indeks | `#060B19` / `#0F172A` | **7.66:1** / **6.96:1** | **PASS** (>= 4.5:1) |
| `--accent-primary` | `#2563EB` | Latar tombol CTA utama (teks `#F8FAFC`) | `#F8FAFC` | **4.94:1** | **PASS** (>= 4.5:1) |
| `--accent-focus` | `#38BDF8` | Indikator `:focus-visible` dan sorotan teks | `#060B19` / `#0F172A` | **9.16:1** / **8.33:1** | **PASS** (>= 4.5:1) |

---

## 4. Typography & Fluid Scale (`R-23` & `antislop-layoutmobile`)

Menggunakan `clamp()` agar teks proporsional dari layar `375px` hingga `1440px+` serta aman pada zoom browser 200%:
- **Hero Display (`--text-display`):** `clamp(2.35rem, 5.5vw + 0.85rem, 5.25rem)`, `line-height: 1.06`, `letter-spacing: -0.03em`
- **Section Heading (`--text-h2`):** `clamp(1.75rem, 3.2vw + 0.6rem, 3.25rem)`, `line-height: 1.12`, `letter-spacing: -0.02em`
- **Project Title (`--text-h3`):** `clamp(1.25rem, 1.8vw + 0.5rem, 2rem)`, `line-height: 1.2`
- **Body Copy:** `1rem` (`16px`) hingga `1.125rem` (`18px`), `line-height: 1.65`, lebar baca dibatasi `60ch - 70ch` (`R-24`)
- **Technical Metadata:** `0.8125rem` (`13px`) hingga `0.875rem` (`14px`), `JetBrains Mono`

---

## 5. Responsive Layout & Motion Architecture
- **3-State Reflow (`antislop-layoutmobile`):**
  - **Mobile (`< 640px`):** Tumpukan 1 kolom vertikal, tinggi header `56px`, tombol menu berlabel teks `"Menu"` / `"Tutup"`, seluruh target sentuh minimal `44x44px`.
  - **Tablet (`640px - 1023px`):** Grid 2 kolom proporsional tanpa horizontal pin agar nyaman di-scroll dengan sentuhan.
  - **Desktop (`>= 1024px`):** Grid editorial asimetris 12 kolom (7:5 pada `AboutSection`) dan *Pinned Horizontal Showcase* pada `FeaturedProjects`.
- **GSAP & Lenis Hygiene (`ui-ux-pro-max`):**
  - Seluruh animasi dibungkus `useGSAP(() => { ... }, { scope: containerRef })` untuk pembersihan otomatis.
  - Menggunakan `gsap.matchMedia()` untuk memisahkan animasi desktop dan mobile serta menghormati `prefers-reduced-motion: reduce`.
  - Hanya menganimasikan properti komposit (`transform: translate/scale/rotate3d`, `clip-path`, `opacity`) ditambah `StarfieldCanvas.jsx` berbasis `requestAnimationFrame` yang otomatis berhenti saat tab tersembunyi atau `prefers-reduced-motion: reduce` aktif.
  - Menyertakan bingkai potret observatorium `4:5` di `AboutSection.jsx` serta galeri `CertificateSection.jsx` (`16:11`) dengan modal Lightbox aksesibel.
