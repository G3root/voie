await import("./src/env.mjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/job",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
