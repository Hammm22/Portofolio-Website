export const SKILL_GROUPS = [
  {
    id: "frontend",
    title: "Frontend & Antarmuka",
    description: "Arsitektur komponen, tata letak responsif, dan animasi interaktif.",
    items: [
      { id: "javascript", label: "JavaScript", fullLabel: "JavaScript (ES6+)", icon: "javascript" },
      { id: "react", label: "React.js", fullLabel: "React.js", icon: "react" },
      { id: "nextjs", label: "Next.js", fullLabel: "Next.js", icon: "nextjs" },
      { id: "vuejs", label: "Vue.js", fullLabel: "Vue.js", icon: "vuejs" },
      { id: "tailwind", label: "Tailwind", fullLabel: "Tailwind CSS", icon: "tailwind" },
      { id: "gsap", label: "GSAP", fullLabel: "GSAP & ScrollTrigger", icon: "gsap" }
    ]
  },
  {
    id: "backend-mobile",
    title: "Backend & Mobile",
    description: "Pengembangan aplikasi server-side, basis data, dan aplikasi perangkat bergerak.",
    items: [
      { id: "php", label: "PHP", fullLabel: "PHP", icon: "php" },
      { id: "laravel", label: "Laravel", fullLabel: "Laravel (Blade)", icon: "laravel" },
      { id: "nodejs", label: "Node.js", fullLabel: "Node.js", icon: "nodejs" },
      { id: "flutter", label: "Flutter", fullLabel: "Dart & Flutter", icon: "flutter" },
      { id: "java", label: "Java", fullLabel: "Java (Android)", icon: "java" },
      { id: "cpp-lua", label: "C++ & Lua", fullLabel: "C++ & Lua", icon: "cpp-lua" }
    ]
  },
  {
    id: "workflow",
    title: "Alur Kerja & Perkakas",
    description: "Manajemen versi kode, perancangan antarmuka, dan pengujian endpoint API.",
    items: [
      { id: "git", label: "Git", fullLabel: "Git", icon: "git" },
      { id: "github", label: "GitHub", fullLabel: "GitHub", icon: "github" },
      { id: "vscode", label: "VS Code", fullLabel: "VS Code", icon: "vscode" },
      { id: "figma", label: "Figma", fullLabel: "Figma", icon: "figma" },
      { id: "postman", label: "Postman", fullLabel: "Postman", icon: "postman" },
      { id: "vercel", label: "Vercel", fullLabel: "Vercel Deployment", icon: "vercel" }
    ]
  }
];
