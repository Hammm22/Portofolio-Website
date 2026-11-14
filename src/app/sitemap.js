import { PROFILE_DATA } from "@/data/portfolioData";

export default function sitemap() {
  return [
    {
      url: PROFILE_DATA.siteUrl,
      lastModified: "2026-11-14",
      changeFrequency: "monthly",
      priority: 1
    }
  ];
}
