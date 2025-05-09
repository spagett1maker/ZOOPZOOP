import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // ✅ Vercel 배포 시에도 ESLint 무시
  },
  images: {
    domains: ['opccrnrgtdsuimrabapc.supabase.co'],
  },
};

export default nextConfig;
