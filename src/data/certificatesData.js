export const CERTIFICATE_CATEGORIES = [
  "Semua",
  "Cloud & AWS",
  "Mobile & Android"
];

// Simpan foto sertifikat aslimu di public/images/certificates/ lalu sesuaikan properti imageUrl di bawah:
export const CERTIFICATES = [
  {
    id: "aws-job-roles-cloud",
    index: "01",
    title: "Job Roles in the Cloud",
    issuer: "AWS Training & Certification",
    date: "28 Juli 2026",
    category: "Cloud & AWS",
    credentialCode: "Completion Certificate",
    skills: ["Cloud Computing", "Cloud Roles", "AWS Cloud", "Cloud Operations"],
    summary:
      "Sertifikat penyelesaian dari AWS Training & Certification yang membahas berbagai peran profesional di ekosistem cloud computing modern, pembagian tanggung jawab tim, serta alur kolaborasi pada infrastruktur AWS.",
    imageUrl: "/images/certificates/cert1.png"
  },
  {
    id: "aws-compute-services",
    index: "02",
    title: "AWS Compute Services Overview",
    issuer: "AWS Training & Certification",
    date: "27 Juli 2026",
    category: "Cloud & AWS",
    credentialCode: "Completion Certificate",
    skills: ["AWS Compute", "Amazon EC2", "AWS Lambda", "Container Services"],
    summary:
      "Sertifikat penyelesaian dari AWS Training & Certification mengenai pengenalan layanan komputasi utama di AWS, meliputi virtual server, komputasi serverless, serta layanan kontainer sesuai kebutuhan beban kerja aplikasi.",
    imageUrl: "/images/certificates/cert2.png"
  },
  {
    id: "aws-technical-essentials",
    index: "03",
    title: "AWS Technical Essentials",
    issuer: "AWS Training & Certification",
    date: "28 Juli 2026",
    category: "Cloud & AWS",
    credentialCode: "Completion Certificate",
    skills: ["AWS Core Services", "IAM Security", "Cloud Networking", "Cloud Storage"],
    summary:
      "Sertifikat penyelesaian fondasi teknis AWS Training & Certification yang mencakup layanan komputasi inti, manajemen akses dan keamanan (IAM), jaringan dasar, serta solusi penyimpanan dan basis data di cloud.",
    imageUrl: "/images/certificates/cert3.png"
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
