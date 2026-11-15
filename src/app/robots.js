import { PROFILE_DATA } from "@/data/profileData";

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
