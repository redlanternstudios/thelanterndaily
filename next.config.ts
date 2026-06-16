import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  experimental: {
    serverSourceMaps: false,
  },
};

export default nextConfig;
