import { PROFILE_DATA } from "@/data/profileData";

export default function manifest() {
  return {
    name: `${PROFILE_DATA.name} (${PROFILE_DATA.handle})`,
    short_name: PROFILE_DATA.handle,
    description: PROFILE_DATA.heroSummary,
    start_url: "/",
    display: "standalone",
    background_color: "#060B19",
    theme_color: "#060B19",
    lang: "id",
    icons: [
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png"
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon"
      }
    ]
  };
}
