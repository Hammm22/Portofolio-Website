export const PROFILE_DATA = {
  name: "Ilham Dwi Arsandy",
  handle: "Hammm22",
  siteUrl: "https://hamm22projects.dev",
  role: "Creative Frontend & Web Developer",
  program: "Siswa SMK Jurusan PPLG (Pengembangan Perangkat Lunak dan Gim)",
  tagline: "Code. Create. Improve.",
  location: "Indonesia",
  schoolPlaceholder: "[SMK Jurusan PPLG]",
  email: "ilhamdwiarsandy61@gmail.com",
  githubUrl: "https://github.com/Hammm22",
  githubApiUrl: "https://api.github.com/users/Hammm22",
  avatarUrl: "https://avatars.githubusercontent.com/u/179662276?v=4",
  // Simpan foto pribadimu di public/images/profile.jpg lalu ubah nilai photoUrl di bawah:
  photoUrl: "/images/profile-placeholder.svg",
  photoCaption: "Potret Observatorium · Ilham Dwi Arsandy",
  coordinates: "RA 06h 45m 08s · DEC -16° 42' 58\"",
  cvUrl: "/cv-ilham-dwi-arsandy.pdf",
  heroHeadline: "Membangun antarmuka web interaktif dan aplikasi lintas platform.",
  heroSummary:
    "Halo, saya Ilham Dwi Arsandy. Siswa SMK jurusan PPLG yang merancang dan menulis kode aplikasi web serta mobile menggunakan React, Next.js, Laravel, dan Flutter.",
  aboutStory: [
    "Perjalanan pemrograman saya dimulai di bangku SMK jurusan Pengembangan Perangkat Lunak dan Gim (PPLG). Dari menyusun logika dasar hingga membangun aplikasi utuh, saya menyukai proses mengubah ide menjadi produk digital yang nyaman digunakan di layar ponsel maupun desktop.",
    "Fokus utama saya saat ini adalah rekayasa antarmuka frontend modern dengan React dan Next.js yang dipadukan bersama animasi terukur menggunakan GSAP, serta pengembangan sistem backend fungsional dengan Laravel dan aplikasi mobile menggunakan Flutter."
  ],
  fallbackGithubStats: {
    public_repos: 11,
    followers: 58,
    following: 41,
    login: "Hammm22",
    html_url: "https://github.com/Hammm22",
    bio: "Junior Developer | Web & Mobile Enthusiast"
  }
};

export const SKILL_GROUPS = [
  {
    id: "frontend",
    title: "Frontend & Antarmuka",
    description: "Arsitektur komponen, tata letak responsif, dan animasi interaktif.",
    items: ["JavaScript (ES6+)", "React.js", "Next.js", "Vue.js", "Tailwind CSS", "GSAP & ScrollTrigger"]
  },
  {
    id: "backend-mobile",
    title: "Backend & Mobile",
    description: "Pengembangan aplikasi server-side, basis data, dan aplikasi perangkat bergerak.",
    items: ["PHP", "Laravel (Blade)", "Node.js", "Dart & Flutter", "Java (Android)", "C++ & Lua"]
  },
  {
    id: "workflow",
    title: "Alur Kerja & Perkakas",
    description: "Manajemen versi kode, perancangan antarmuka, dan pengujian endpoint API.",
    items: ["Git", "GitHub", "VS Code", "Figma", "Postman", "Vercel Deployment"]
  }
];

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

export const JOURNEY_CHAPTERS = [
  {
    id: "kelas-x",
    period: "Fase 01 / Kelas X SMK PPLG",
    title: "Fondasi Algoritma & Web Dasar",
    focus: "Logika Pemrograman, C++, Lua, & Struktur HTML/CSS",
    description:
      "Memulai perjalanan di jurusan Pengembangan Perangkat Lunak dan Gim dengan mempelajari dasar logika algoritma, struktur data sederhana, pembuatan skrip C++ dan Lua, serta penyusunan halaman web statis yang semantik.",
    deliverables: [
      "Pemahaman logika percabangan, perulangan, dan fungsi dasar.",
      "Pembuatan halaman profil dan tata letak responsif pertama dengan HTML5 & CSS.",
      "Pengenalan sistem kontrol versi Git dan publikasi kode ke GitHub."
    ]
  },
  {
    id: "kelas-xi",
    period: "Fase 02 / Kelas XI SMK PPLG",
    title: "Aplikasi Fullstack & Kolaborasi Tim",
    focus: "PHP, Laravel, Basis Data Relasional, & Android Java",
    description:
      "Beralih ke pembangunan sistem yang terhubung ke basis data. Mengerjakan proyek sekolah seperti sistem Perpustakaan Digital (Perpus-Digital), sistem inventaris, platform Lost and Found Ketemuin.com dengan Laravel, serta proyek tim Android GameJar.",
    deliverables: [
      "Implementasi operasi CRUD lengkap dan autentikasi pengguna dengan PHP & Laravel.",
      "Kolaborasi Git multi-developer pada proyek Android Java GameJar.",
      "Perancangan skema tabel basis data dan pengujian API dengan Postman."
    ]
  },
  {
    id: "kelas-xii",
    period: "Fase 03 / Kelas XII & Eksplorasi Lanjutan",
    title: "Ekosistem Reaktif, Lintas Platform, & Web Interaktif",
    focus: "React, Next.js, Vue, Flutter, & Animasi GSAP",
    description:
      "Mendalami pengembangan frontend modern berbasis komponen (React, Next.js, Vue) dan aplikasi mobile lintas platform dengan Flutter pada proyek Jejak Sehat, sekaligus mengasah kualitas antarmuka untuk persiapan portofolio dan kompetisi.",
    deliverables: [
      "Peluncuran aplikasi Jejak Sehat versi Web dan Mobile (Flutter/Dart).",
      "Eksplorasi katalog interaktif MovieList dan aplikasi konser berbasis Vue.js.",
      "Penerapan standar aksesibilitas WCAG AA dan animasi terukur menggunakan GSAP ScrollTrigger."
    ]
  }
];

export const CERTIFICATE_CATEGORIES = [
  "Semua",
  "Web & Frontend",
  "Mobile & Android",
  "Backend & Sistem",
  "Kompetensi PPLG"
];

export const SERVICES_DATA = [
  {
    id: "web-interaktif",
    number: "01",
    title: "Web Frontend Interaktif",
    summary:
      "Membangun antarmuka web modern yang cepat, responsif di semua ukuran layar, dan dilengkapi animasi interaktif yang halus.",
    points: [
      "Tata letak responsif dengan React, Next.js, dan Tailwind CSS",
      "Animasi berbasis scroll dan mikro-interaksi dengan GSAP",
      "Aksesibilitas keyboard dan kontras visual yang nyaman dibaca"
    ],
    tech: "React.js · Next.js · Vue.js · Tailwind CSS · GSAP"
  },
  {
    id: "fullstack-sistem",
    number: "02",
    title: "Aplikasi Web Fullstack",
    summary:
      "Merancang sistem web terintegrasi mulai dari skema basis data relasional, autentikasi pengguna, hingga pengelolaan data CRUD.",
    points: [
      "Arsitektur MVC dengan Laravel dan Blade maupun Next.js App Router",
      "Perancangan tabel relasional di PostgreSQL dan MySQL",
      "Integrasi REST API dan deployment ke lingkungan produksi"
    ],
    tech: "Laravel · PHP · Prisma · PostgreSQL · MySQL"
  },
  {
    id: "mobile-lintas-platform",
    number: "03",
    title: "Aplikasi Mobile & Android",
    summary:
      "Mengembangkan aplikasi perangkat bergerak yang ringan dan intuitif untuk kebutuhan pencatatan harian maupun utilitas pengguna.",
    points: [
      "Antarmuka mobile lintas platform menggunakan Flutter dan Dart",
      "Pengembangan aplikasi Android native dengan bahasa Java (OOP)",
      "Sinkronisasi data antara aplikasi mobile dan layanan web"
    ],
    tech: "Flutter · Dart · Android Java · XML Layout"
  }
];

export const WORKFLOW_STEPS = [
  {
    id: "step-desain",
    step: "01",
    title: "Riset & Struktur Antarmuka",
    description:
      "Memetakan kebutuhan pengguna, menyusun alur halaman di Figma, dan memastikan hierarki informasi mudah dipahami sejak layar pertama."
  },
  {
    id: "step-arsitektur",
    step: "02",
    title: "Fondasi Data & Komponen",
    description:
      "Menyiapkan struktur komponen modular di frontend serta merancang skema basis data dan rute endpoint yang rapi di sisi backend."
  },
  {
    id: "step-interaksi",
    step: "03",
    title: "Implementasi & Animasi",
    description:
      "Menulis kode yang bersih, menghubungkan data dinamis, dan menambahkan transisi GSAP serta Lenis agar pengalaman navigasi terasa hidup."
  },
  {
    id: "step-rilis",
    step: "04",
    title: "Pengujian & Publikasi",
    description:
      "Menguji tampilan di layar ponsel hingga desktop, memeriksa performa build, lalu mempublikasikan aplikasi ke Vercel dan GitHub."
  }
];

// Simpan foto sertifikat aslimu di public/images/certificates/ lalu sesuaikan properti imageUrl di bawah:
export const CERTIFICATES = [
  {
    id: "cert-frontend-web",
    index: "01",
    title: "Rekayasa Frontend & Web Modern",
    issuer: "Program Kompetensi PPLG & Mandiri",
    date: "2026",
    category: "Web & Frontend",
    credentialCode: "PPLG-FE-2026-01",
    skills: ["React.js", "Next.js", "Tailwind CSS", "GSAP"],
    summary:
      "Validasi perancangan antarmuka web modern berbasis komponen, tata letak responsif lintas layar, serta penerapan aksesibilitas WCAG AA dan animasi interaktif.",
    imageUrl: "/images/certificates/cert-frontend-web.svg"
  },
  {
    id: "cert-flutter-mobile",
    index: "02",
    title: "Pengembangan Mobile Lintas Platform (Flutter & Dart)",
    issuer: "Modul Praktik Perangkat Bergerak PPLG",
    date: "2026",
    category: "Mobile & Android",
    credentialCode: "PPLG-FL-2026-02",
    skills: ["Dart", "Flutter", "Mobile UI", "State Management"],
    summary:
      "Sertifikasi kompetensi pengembangan aplikasi perangkat bergerak menggunakan kerangka kerja Flutter dan bahasa Dart yang diterapkan langsung pada ekosistem Jejak Sehat Mobile.",
    imageUrl: "/images/certificates/cert-flutter-mobile.svg"
  },
  {
    id: "cert-laravel-backend",
    index: "03",
    title: "Arsitektur Backend MVC Laravel & Basis Data SQL",
    issuer: "Laboratorium Rekayasa Perangkat Lunak",
    date: "2026",
    category: "Backend & Sistem",
    credentialCode: "PPLG-BE-2026-03",
    skills: ["PHP", "Laravel", "MySQL", "PostgreSQL", "Prisma"],
    summary:
      "Penguasaan pola arsitektur Model-View-Controller (MVC), perancangan skema relasional, autentikasi pengguna, serta manajemen rute CRUD pada aplikasi Ketemuin.com.",
    imageUrl: "/images/certificates/cert-laravel-backend.svg"
  },
  {
    id: "cert-android-java",
    index: "04",
    title: "Pemrograman Aplikasi Android Native (Java OOP)",
    issuer: "Proyek Kolaborasi Tim PPLG",
    date: "2026",
    category: "Mobile & Android",
    credentialCode: "PPLG-AJ-2026-04",
    skills: ["Java", "Android SDK", "XML Layout", "Gradle"],
    summary:
      "Penerapan prinsip Object-Oriented Programming (OOP) dengan bahasa Java pada pengembangan aplikasi Android native GameJar bersama tim pengembang.",
    imageUrl: "/images/certificates/cert-android-java.svg"
  },
  {
    id: "cert-git-workflow",
    index: "05",
    title: "Manajemen Kode Git, Pengujian API, & Cloud Deployment",
    issuer: "Standar Alur Kerja Pengembang PPLG",
    date: "2025",
    category: "Backend & Sistem",
    credentialCode: "PPLG-GW-2025-05",
    skills: ["Git", "GitHub", "Postman", "Vercel"],
    summary:
      "Sertifikasi praktik kerja tim menggunakan sistem kontrol versi Git, pengujian endpoint REST API menggunakan Postman, dan publikasi aplikasi produksi ke Vercel.",
    imageUrl: "/images/certificates/cert-git-workflow.svg"
  },
  {
    id: "cert-ukk-pplg",
    index: "06",
    title: "Apresiasi Karya & Pameran Proyek Praktik PPLG",
    issuer: "Jurusan Pengembangan Perangkat Lunak dan Gim",
    date: "2025",
    category: "Kompetensi PPLG",
    credentialCode: "PPLG-EX-2025-06",
    skills: ["Fullstack Web", "Analisis Sistem", "Dokumentasi Teknis"],
    summary:
      "Penghargaan atas penyelesaian proyek aplikasi sekolah seperti Perpus-Digital dan Inventory-App dengan dokumentasi struktur basis data serta antarmuka yang fungsional.",
    imageUrl: "/images/certificates/cert-ukk-pplg.svg"
  }
];
