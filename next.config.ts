import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "app-faisal-drive.luminousdemo.com",
      },
      {
        protocol: "https",
        hostname: "admin.atrip.ae",
      },
      {
        protocol: "http",
        hostname: "faisal-booking.test",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "168.231.110.101",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "60mb",
    },
  },
  // output: "export",
};

export default nextConfig;
