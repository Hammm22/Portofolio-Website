import { PROFILE_DATA } from "@/data/portfolioData";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${PROFILE_DATA.siteUrl}/sitemap.xml`,
    host: PROFILE_DATA.siteUrl
  };
}
