export const FEATURED_PROJECTS = [
  {
    id: "jejak-sehat",
    index: "01",
    title: "Jejak Sehat",
    subtitle: "Catatan Perjalanan & Pemantauan Suhu Tubuh (Web + Mobile)",
    year: "2026",
    category: "Aplikasi Web & Mobile",
    role: "Fullstack Web & Mobile Developer",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Flutter", "Dart", "Vercel"],
    summary:
      "Aplikasi pencatatan riwayat perjalanan, lokasi singgah, dan suhu tubuh harian yang dibangun dalam dua platform: Web berbasis Next.js + Prisma dan aplikasi Mobile berbasis Flutter.",
    highlights: [
      "Skema data relasional User (NIK & profil) terhubung ke Catatan (lokasi, waktu, suhu) dengan Prisma.",
      "Alur rute Web App Router lengkap: /dashboard, /catat, /view, /edit, hingga /login dan /register.",
      "Ekosistem ganda dengan repositori Web (Next.js) dan Mobile (Flutter lib/pages & lib/service)."
    ],
    liveUrl: "https://jejak-sehat.vercel.app",
    repoUrl: "https://github.com/Hammm22/Jejak-Sehat",
    secondaryRepoUrl: "https://github.com/Hammm22/JejakSehat_Mobile",
    secondaryRepoLabel: "Repo Mobile (Flutter)",
    previewMeta: "Next.js + Prisma · Flutter/Dart · Live di Vercel"
  },
  {
    id: "ketemuin",
    index: "02",
    title: "Ketemuin.com",
    subtitle: "Platform Pelaporan & Klaim Barang Hilang (Laravel MVC)",
    year: "2026",
    category: "Aplikasi Web Fullstack",
    role: "Fullstack Web Developer",
    stack: ["Laravel", "PHP", "Blade", "MySQL", "Tailwind CSS"],
    summary:
      "Platform web Lost and Found berbasis Laravel yang memfasilitasi pelaporan barang hilang, pengumuman barang temuan, serta pelacakan status klaim hingga kembali ke pemilik.",
    highlights: [
      "Rute terpisah dan jelas untuk /barang-hilang, /barang-ditemukan, /lapor-hilang, dan /klaim/{id}.",
      "Endpoint statistik status real-time (/statistik/home) untuk kategori hilang, ditemukan, dan dikembalikan.",
      "Kontrol akses autentikasi (AuthController) untuk pelaporan dan pengelolaan data barang."
    ],
    liveUrl: null,
    repoUrl: "https://github.com/Hammm22/Ketemuin.com",
    secondaryRepoUrl: null,
    secondaryRepoLabel: null,
    previewMeta: "Laravel MVC · Blade + Tailwind · Endpoint Statistik"
  },
  {
    id: "movielist",
    index: "03",
    title: "MovieList",
    subtitle: "Katalog Eksplorasi Film & Pencarian Cepat (React + TMDB API)",
    year: "2026",
    category: "Aplikasi Web",
    role: "Frontend Developer",
    stack: ["React (Vite)", "Tailwind CSS", "Framer Motion", "React Router", "TMDB API"],
    summary:
      "Aplikasi web eksplorasi film modern dengan React dan Vite yang terintegrasi ke TMDB API, dilengkapi pencarian instan (debounce dropdown), auto-hide navbar, dan halaman detail sinematik.",
    highlights: [
      "Pencarian film langsung dengan debounce dan dropdown hasil instan di komponen Navbar.",
      "Transisi halaman halus antara Home.jsx dan Detail.jsx menggunakan Framer Motion.",
      "Tata letak kartu MovieCard.jsx yang menjaga konsistensi poster di layar ponsel hingga desktop."
    ],
    liveUrl: "https://movie-list-gilt.vercel.app",
    repoUrl: "https://github.com/Hammm22/MovieList",
    secondaryRepoUrl: null,
    secondaryRepoLabel: null,
    previewMeta: "React + Vite · TMDB API · Framer Motion"
  },
  {
    id: "gamejar",
    index: "04",
    title: "GameJar",
    subtitle: "Pemantau Harga Game & Tabungan Target (Android Java)",
    year: "2026",
    category: "Mobile & Android",
    role: "Android Developer (Kolaborasi Tim)",
    stack: ["Java", "Android SDK", "Gradle Kotlin DSL", "XML Layout", "Git Team"],
    summary:
      "Aplikasi Android kolaborasi tim (Ilham, Lauvin, Dyah Ayu) yang menggabungkan pemantauan harga diskon game lintas platform dengan sistem celengan target tabungan per game.",
    highlights: [
      "Fitur pemantauan harga game dan notifikasi ketika judul di wishlist sedang diskon.",
      "Sistem tabungan terstruktur per game dengan pelacakan progres target pembelian.",
      "Dibangun dalam bahasa Java (OOP) dengan pembagian cabang kerja tim melalui GitHub."
    ],
    liveUrl: null,
    repoUrl: "https://github.com/Hammm22/GameJar",
    secondaryRepoUrl: null,
    secondaryRepoLabel: null,
    previewMeta: "Android Native (Java) · Tim 3 Developer · Wishlist & Tabungan"
  }
];

export const ARCHIVE_PROJECTS = [
  {
    id: "arch-jejak-sehat-web",
    year: "2026",
    title: "Jejak-Sehat",
    category: "Aplikasi Web",
    context: "Proyek Unggulan",
    stack: ["JavaScript", "Tailwind CSS", "Web App"],
    description: "Aplikasi web pemantauan kesehatan harian dengan antarmuka responsif dan pemantauan kebiasaan positif.",
    repoUrl: "https://github.com/Hammm22/Jejak-Sehat",
    liveUrl: "https://jejak-sehat.vercel.app"
  },
  {
    id: "arch-jejak-sehat-mobile",
    year: "2026",
    title: "JejakSehat_Mobile",
    category: "Mobile & Android",
    context: "Proyek Unggulan",
    stack: ["Dart", "Flutter", "Mobile UI"],
    description: "Versi aplikasi perangkat bergerak dari Jejak Sehat yang dibangun menggunakan kerangka kerja Flutter.",
    repoUrl: "https://github.com/Hammm22/JejakSehat_Mobile",
    liveUrl: null
  },
  {
    id: "arch-ketemuin",
    year: "2026",
    title: "Ketemuin.com",
    category: "Aplikasi Web",
    context: "Proyek Sekolah",
    stack: ["Laravel", "Blade", "PHP", "MySQL"],
    description: "Platform web pelaporan dan pencarian barang hilang berbasis Laravel dengan manajemen data terpusat.",
    repoUrl: "https://github.com/Hammm22/Ketemuin.com",
    liveUrl: null
  },
  {
    id: "arch-movielist",
    year: "2026",
    title: "MovieList",
    category: "Aplikasi Web",
    context: "Eksplorasi Frontend",
    stack: ["JavaScript", "REST API", "CSS3"],
    description: "Katalog film interaktif untuk menelusuri informasi sinema populer secara cepat.",
    repoUrl: "https://github.com/Hammm22/MovieList",
    liveUrl: "https://movie-list-gilt.vercel.app"
  },
  {
    id: "arch-gamejar",
    year: "2026",
    title: "GameJar",
    category: "Mobile & Android",
    context: "Proyek Sekolah",
    stack: ["Java", "Android", "Team Project"],
    description: "Proyek kelompok aplikasi Android berbahasa Java yang dikerjakan bersama Lauvin dan Dyah Ayu.",
    repoUrl: "https://github.com/Hammm22/GameJar",
    liveUrl: null
  },
  {
    id: "arch-concert-app",
    year: "2026",
    title: "concert-app",
    category: "Aplikasi Web",
    context: "Eksplorasi Frontend",
    stack: ["Vue.js", "JavaScript", "Frontend"],
    description: "Aplikasi web eksplorasi jadwal dan informasi konser musik menggunakan kerangka kerja reaktif Vue.js.",
    repoUrl: "https://github.com/Hammm22/concert-app",
    liveUrl: null
  },
  {
    id: "arch-inventory-app",
    year: "2026",
    title: "inventory-app",
    category: "Proyek Sekolah",
    context: "Proyek Sekolah",
    stack: ["JavaScript", "CRUD", "Web App"],
    description: "Sistem manajemen inventaris barang untuk mencatat stok masuk, stok keluar, dan rekapitulasi data.",
    repoUrl: "https://github.com/Hammm22/inventory-app",
    liveUrl: null
  },
  {
    id: "arch-perpus-digital",
    year: "2025",
    title: "Perpus-Digital",
    category: "Proyek Sekolah",
    context: "Proyek Sekolah",
    stack: ["PHP", "MySQL", "Bootstrap"],
    description: "Aplikasi perpustakaan digital sekolah untuk pengelolaan katalog buku dan transaksi peminjaman siswa.",
    repoUrl: "https://github.com/Hammm22/Perpus-Digital",
    liveUrl: null
  },
  {
    id: "arch-portfolio-v1",
    year: "2025",
    title: "Portfolio-Website (v1)",
    category: "Aplikasi Web",
    context: "Eksplorasi Frontend",
    stack: ["JavaScript", "HTML5", "CSS3"],
    description: "Iterasi pertama situs web portofolio pribadi sebelum dikembangkan ulang ke arsitektur Next.js dan GSAP.",
    repoUrl: "https://github.com/Hammm22/Portfolio-Website",
    liveUrl: "https://portfolio-website-three-roan-77.vercel.app"
  }
];

export const ARCHIVE_CATEGORIES = [
  "Semua",
  "Aplikasi Web",
  "Mobile & Android",
  "Proyek Sekolah"
];
