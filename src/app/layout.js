import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { PROFILE_DATA } from "@/data/profileData";
import { SKILL_GROUPS } from "@/data/techData";
import { FEATURED_PROJECTS } from "@/data/projectsData";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap"
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap"
});

const SEO_TITLE = "Ilham Dwi Arsandy (Hammm22) | Web & Mobile Developer PPLG";
const SEO_DESCRIPTION =
  "Portofolio resmi Ilham Dwi Arsandy (Hammm22), siswa SMK PPLG pengembang aplikasi web interaktif dan mobile dengan React, Next.js, Laravel, dan Flutter.";

export const metadata = {
  metadataBase: new URL(PROFILE_DATA.siteUrl),
  title: {
    default: SEO_TITLE,
    template: `%s | ${PROFILE_DATA.name} (${PROFILE_DATA.handle})`
  },
  description: SEO_DESCRIPTION,
  alternates: {
    canonical: "/"
  },
  authors: [{ name: PROFILE_DATA.name, url: PROFILE_DATA.githubUrl }],
  creator: PROFILE_DATA.name,
  publisher: PROFILE_DATA.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: PROFILE_DATA.siteUrl,
    siteName: `${PROFILE_DATA.name} (${PROFILE_DATA.handle})`,
    type: "website",
    locale: "id_ID"
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${PROFILE_DATA.siteUrl}/#website`,
      url: PROFILE_DATA.siteUrl,
      name: `${PROFILE_DATA.name} (${PROFILE_DATA.handle})`,
      description: SEO_DESCRIPTION,
      inLanguage: "id-ID",
      publisher: {
        "@id": `${PROFILE_DATA.siteUrl}/#person`
      }
    },
    {
      "@type": "Person",
      "@id": `${PROFILE_DATA.siteUrl}/#person`,
      name: PROFILE_DATA.name,
      alternateName: PROFILE_DATA.handle,
      jobTitle: PROFILE_DATA.role,
      description: PROFILE_DATA.heroSummary,
      url: PROFILE_DATA.siteUrl,
      image: PROFILE_DATA.avatarUrl,
      email: `mailto:${PROFILE_DATA.email}`,
      sameAs: [PROFILE_DATA.githubUrl],
      knowsAbout: SKILL_GROUPS.flatMap((group) =>
        group.items.map((item) =>
          typeof item === "string" ? item : item.fullLabel || item.label
        )
      )
    },
    {
      "@type": "ProfilePage",
      "@id": `${PROFILE_DATA.siteUrl}/#profilepage`,
      url: PROFILE_DATA.siteUrl,
      name: SEO_TITLE,
      description: SEO_DESCRIPTION,
      inLanguage: "id-ID",
      isPartOf: {
        "@id": `${PROFILE_DATA.siteUrl}/#website`
      },
      about: {
        "@id": `${PROFILE_DATA.siteUrl}/#person`
      },
      mainEntity: {
        "@id": `${PROFILE_DATA.siteUrl}/#person`
      },
      hasPart: FEATURED_PROJECTS.map((project) => ({
        "@type": "SoftwareSourceCode",
        name: project.title,
        description: project.summary,
        codeRepository: project.repoUrl,
        ...(project.liveUrl ? { url: project.liveUrl } : {}),
        programmingLanguage: project.stack,
        author: {
          "@id": `${PROFILE_DATA.siteUrl}/#person`
        }
      }))
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${syne.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="bg-[#060B19] text-[#F8FAFC] antialiased selection:bg-[#2563EB] selection:text-[#F8FAFC]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-[#2563EB] focus:px-4 focus:py-2.5 focus:font-mono focus:text-sm focus:font-medium focus:text-[#F8FAFC] focus:shadow-lg"
        >
          Lewati ke konten utama
        </a>
        {children}
      </body>
    </html>
  );
}
