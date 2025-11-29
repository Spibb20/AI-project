import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cpus: 1,
  },
  outputFileTracingExcludes: {
    "/*": ["node_modules/**", ".git/**", ".next/**"],
  },
};

export default nextConfig;
