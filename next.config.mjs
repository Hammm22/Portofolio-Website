/** @type {import('next').NextConfig} */
const STATIC_ASSET_CACHE_HEADER = [
  {
    key: "Cache-Control",
    value: "public, max-age=86400, stale-while-revalidate=604800"
  }
];

const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com"
      }
    ]
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: STATIC_ASSET_CACHE_HEADER
      },
      {
        source: "/cv-ilham-dwi-arsandy.pdf",
        headers: STATIC_ASSET_CACHE_HEADER
      },
      {
        source: "/llms.txt",
        headers: STATIC_ASSET_CACHE_HEADER
      }
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
