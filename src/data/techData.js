export const SKILL_GROUPS = [
  {
    id: "frontend",
    title: "Frontend & Antarmuka",
    description: "Arsitektur komponen, tata letak responsif, dan animasi interaktif.",
    items: [
      { id: "javascript", label: "JavaScript", fullLabel: "JavaScript (ES6+)", icon: "FileJs" },
      { id: "react", label: "React.js", fullLabel: "React.js", icon: "Atom" },
      { id: "nextjs", label: "Next.js", fullLabel: "Next.js", icon: "Triangle" },
      { id: "vuejs", label: "Vue.js", fullLabel: "Vue.js", icon: "Polygon" },
      { id: "tailwind", label: "Tailwind", fullLabel: "Tailwind CSS", icon: "Wind" },
      { id: "gsap", label: "GSAP", fullLabel: "GSAP & ScrollTrigger", icon: "Sparkle" }
    ]
  },
  {
    id: "backend-mobile",
    title: "Backend & Mobile",
    description: "Pengembangan aplikasi server-side, basis data, dan aplikasi perangkat bergerak.",
    items: [
      { id: "php", label: "PHP", fullLabel: "PHP", icon: "BracketsCurly" },
      { id: "laravel", label: "Laravel", fullLabel: "Laravel (Blade)", icon: "Cube" },
      { id: "nodejs", label: "Node.js", fullLabel: "Node.js", icon: "Hexagon" },
      { id: "flutter", label: "Flutter", fullLabel: "Dart & Flutter", icon: "DeviceMobile" },
      { id: "java", label: "Java", fullLabel: "Java (Android)", icon: "Coffee" },
      { id: "cpp-lua", label: "C++ & Lua", fullLabel: "C++ & Lua", icon: "Cpu" }
    ]
  },
  {
    id: "workflow",
    title: "Alur Kerja & Perkakas",
    description: "Manajemen versi kode, perancangan antarmuka, dan pengujian endpoint API.",
    items: [
      { id: "git", label: "Git", fullLabel: "Git", icon: "GitBranch" },
      { id: "github", label: "GitHub", fullLabel: "GitHub", icon: "GithubLogo" },
      { id: "vscode", label: "VS Code", fullLabel: "VS Code", icon: "CodeBlock" },
      { id: "figma", label: "Figma", fullLabel: "Figma", icon: "FigmaLogo" },
      { id: "postman", label: "Postman", fullLabel: "Postman", icon: "PaperPlaneTilt" },
      { id: "vercel", label: "Vercel", fullLabel: "Vercel Deployment", icon: "CloudArrowUp" }
    ]
  }
];
