import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export",
  trailingSlash: true,
  basePath: process.env.NODE_ENV === "production" ? "/maestro_sport" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
