import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['square', '@anthropic-ai/sdk'],
};

export default nextConfig;
