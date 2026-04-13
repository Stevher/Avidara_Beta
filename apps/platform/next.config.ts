import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: { allowedOrigins: ["app.avidara.co.za"] },
  },
};

export default nextConfig;
