import type { NextConfig } from "next";
import i18nConfig from "./configs/i18ncofig";

const nextConfig: NextConfig = {
  images: {
    domains: ["img.youtube.com", "images.ctfassets.net"],
  },
  // i18n: i18nConfig,
};

export default nextConfig;
