export const CERTIFICATE_CATEGORIES = [
  "Semua",
  "Web & Frontend",
  "Mobile & Android",
  "Backend & Sistem",
  "Kompetensi PPLG"
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
  }
];
