// To redirect from `/` to `/login`, use the `redirects` async function in Next.js config
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental:{
    authInterrupts:true
  }
};

export default nextConfig;
