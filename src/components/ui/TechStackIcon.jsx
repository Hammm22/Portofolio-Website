import { GithubLogo } from "@phosphor-icons/react";

export const TECH_STACK_KEYS = [
  "javascript",
  "react",
  "nextjs",
  "vuejs",
  "tailwind",
  "gsap",
  "php",
  "laravel",
  "nodejs",
  "flutter",
  "java",
  "cpp-lua",
  "git",
  "github",
  "vscode",
  "figma",
  "postman",
  "vercel"
];

/**
 * Merender ikon logo stack teknologi resmi dalam SVG ringan bebas dependensi eksternal.
 */
export default function TechStackIcon({ name, className = "h-6 w-6" }) {
  switch (name) {
    case "javascript":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#F7DF1E" />
          <path
            d="M12.9 10.9h1.8v6.2c0 1.8-.9 2.9-2.7 2.9-1.1 0-1.9-.5-2.4-1.3l1.4-.9c.3.4.5.7.9.7.6 0 .9-.3.9-.9v-6.7z"
            fill="#060B19"
          />
          <path
            d="M16.1 17.5c.4.6.9 1 1.8 1 .7 0 1.2-.3 1.2-.8 0-.6-.5-.8-1.3-1.1l-.4-.2c-1.3-.5-2.1-1.2-2.1-2.5 0-1.3 1-2.3 2.5-2.3 1.1 0 1.9.4 2.4 1.3l-1.3.9c-.3-.5-.6-.7-1.1-.7-.5 0-.8.3-.8.7 0 .5.3.7 1.1 1l.4.2c1.4.6 2.2 1.3 2.2 2.6 0 1.5-1.2 2.4-2.8 2.4-1.5 0-2.5-.7-3-1.7l1.2-.8z"
            fill="#060B19"
          />
        </svg>
      );

    case "react":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <circle cx="12" cy="12" r="2.1" fill="#61DAFB" />
          <ellipse cx="12" cy="12" rx="10" ry="3.9" stroke="#61DAFB" strokeWidth="1.4" />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="3.9"
            transform="rotate(60 12 12)"
            stroke="#61DAFB"
            strokeWidth="1.4"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="3.9"
            transform="rotate(120 12 12)"
            stroke="#61DAFB"
            strokeWidth="1.4"
          />
        </svg>
      );

    case "nextjs":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <circle
            cx="12"
            cy="12"
            r="9.5"
            fill="#060B19"
            stroke="#F8FAFC"
            strokeWidth="1.6"
          />
          <path
            d="M9 16V8.5l7.6 10.1"
            stroke="#F8FAFC"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 8.5v4.8"
            stroke="#F8FAFC"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );

    case "vuejs":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <path d="M2 4.5h3.8L12 15.2 18.2 4.5H22L12 21.5 2 4.5z" fill="#4FC08D" />
          <path d="M6.2 4.5h3.3L12 9l2.5-4.5h3.3L12 14.7 6.2 4.5z" fill="#35495E" />
        </svg>
      );

    case "tailwind":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <path
            d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.12 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.62 7.15 14.48 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.12 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.62 13.15 9.48 12 7 12z"
            fill="#38BDF8"
          />
        </svg>
      );

    case "gsap":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <circle
            cx="12"
            cy="12"
            r="9.2"
            stroke="#88CE02"
            strokeWidth="1.7"
            strokeDasharray="44 12"
            strokeLinecap="round"
          />
          <path
            d="M15.6 8.8A4.8 4.8 0 1 0 16.8 13H12"
            stroke="#88CE02"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.8 7l2.7-2.2-1 3.6"
            stroke="#88CE02"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "php":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <ellipse cx="12" cy="12" rx="10.5" ry="6.2" fill="#8993BE" />
          <path
            d="M5.6 15.2l.8-4.4h1.7c.9 0 1.4.5 1.2 1.4-.2 1-.9 1.5-1.8 1.5H6.6m3.9-4.5l-.9 4.5m.3-2.4h1.3c.7 0 1 .4.9 1.1l-.2 1.3m2.2 1.5l.8-4.4h1.7c.9 0 1.4.5 1.2 1.4-.2 1-.9 1.5-1.8 1.5h-.9"
            stroke="#060B19"
            strokeWidth="1.45"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "laravel":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <path
            d="M3.5 6.2L6.5 4.5l3 1.7v8.6l3 1.7 5-2.8V8.8l3-1.7-3-1.7-3 1.7v4.9m-5-5.8L6.5 7.9 3.5 6.2m0 0v8.6l9 5.1 3-1.7v-3.5m-9-6.8v8.6m9-11.4l3 1.7v6l-3 1.7"
            stroke="#FF2D20"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "nodejs":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <path
            d="M12 2.4L20.3 7.2v9.6L12 21.6l-8.3-4.8V7.2L12 2.4z"
            fill="#5FA04E"
            fillOpacity="0.16"
            stroke="#5FA04E"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M8.8 15.2V8.8l6.4 6.4V8.8"
            stroke="#8CC84B"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "flutter":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <path d="M13.5 2.8L4.5 11.8l2.8 2.8L19.1 2.8h-5.6z" fill="#54C5F8" />
          <path d="M13.5 11.3L8.7 16.1l2.8 2.8 7.6-7.6h-5.6z" fill="#29B6F6" />
          <path d="M11.5 18.9l2.9 2.9h5.4l-5.5-5.5-2.8 2.6z" fill="#0284C7" />
        </svg>
      );

    case "java":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <path
            d="M10.4 3.2c1.1 1.1-.8 2.1.3 3.2M13.4 2.5c1.1 1.2-.8 2.3.3 3.5"
            stroke="#F89820"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M6.5 9.5h9v4.2a4.5 4.5 0 0 1-9 0V9.5z"
            stroke="#60A5FA"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M15.5 10.4h1.6a1.8 1.8 0 0 1 0 3.6h-1.6"
            stroke="#60A5FA"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M5 19.8c2.2.8 9.8.8 12 0"
            stroke="#F89820"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );

    case "cpp-lua":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <path
            d="M11 3.2L18.2 7.4v8.4L11 20 3.8 15.8V7.4L11 3.2z"
            fill="#659AD2"
            fillOpacity="0.18"
            stroke="#659AD2"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M9.6 9.8a2.6 2.6 0 1 0 0 3.6M12.2 11.6h2.4M13.4 10.4v2.4"
            stroke="#F8FAFC"
            strokeWidth="1.45"
            strokeLinecap="round"
          />
          <circle cx="19.2" cy="5.2" r="2.2" fill="#38BDF8" />
        </svg>
      );

    case "git":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <rect
            x="5"
            y="5"
            width="14"
            height="14"
            rx="2.6"
            transform="rotate(45 12 12)"
            fill="#F05032"
          />
          <path
            d="M9.4 7.2L12 9.8v6.2M12 9.8l3.2 3.1"
            stroke="#F8FAFC"
            strokeWidth="1.45"
            strokeLinecap="round"
          />
          <circle cx="12" cy="9.8" r="1.45" fill="#F8FAFC" />
          <circle cx="12" cy="16" r="1.45" fill="#F8FAFC" />
          <circle cx="15.2" cy="12.9" r="1.45" fill="#F8FAFC" />
        </svg>
      );

    case "github":
      return (
        <GithubLogo
          size={24}
          weight="fill"
          aria-hidden="true"
          className={`${className} text-[#F8FAFC]`}
        />
      );

    case "vscode":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <path d="M16.8 2.6L21 4.6v14.8l-4.2 2V2.6z" fill="#007ACC" />
          <path d="M3.2 14.9L16.8 2.6v5.2L5.1 16.6l-1.9-1.7z" fill="#1D9BF0" />
          <path d="M3.2 9.1L5.1 7.4l11.7 8.8v5.2L3.2 9.1z" fill="#38BDF8" />
        </svg>
      );

    case "figma":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <path d="M9 3h3v6H9a3 3 0 0 1 0-6z" fill="#F24E1E" />
          <path d="M12 3h3a3 3 0 0 1 0 6h-3V3z" fill="#FF7262" />
          <path d="M9 9h3v6H9a3 3 0 0 1 0-6z" fill="#A259FF" />
          <circle cx="15" cy="12" r="3" fill="#1ABCFE" />
          <path d="M9 15h3v3a3 3 0 1 1-3-3z" fill="#0ACF83" />
        </svg>
      );

    case "postman":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <circle cx="12" cy="12" r="9.5" fill="#FF6C37" />
          <circle cx="12" cy="12" r="5.6" stroke="#F8FAFC" strokeWidth="1.4" />
          <path
            d="M12 12l5.2-5.2"
            stroke="#060B19"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="1.7" fill="#F8FAFC" />
        </svg>
      );

    case "vercel":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
          <path d="M12 3.5L22 20.5H2L12 3.5z" fill="#F8FAFC" />
        </svg>
      );

    default:
      return null;
  }
}
