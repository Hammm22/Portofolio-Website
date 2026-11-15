/** @type {import('next').NextConfig} */
const STATIC_ASSET_CACHE_HEADER = [
  {
    key: "Cache-Control",
    value: "public, max-age=86400, stale-while-revalidate=604800"
  }
];

const SECURITY_HEADERS = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff"
  },
  {
    key: "X-Frame-Options",
    value: "DENY"
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin"
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()"
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
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "portfolio-website-three-roan-77.vercel.app"
          }
        ],
        destination: "https://hamm22projects.dev/:path*",
        permanent: true
      }
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS
      },
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
