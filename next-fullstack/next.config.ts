import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      new URL('https://**.supabase.co/**')
    ]
  }
};

export default nextConfig;
