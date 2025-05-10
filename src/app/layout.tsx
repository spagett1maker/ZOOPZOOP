import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';


import { AuthProvider } from "../contexts/auth-context";
import ChannelService from "@/components/channel-talk";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "아파트 청약은 줍줍 | 대한민국 분양 정보 플랫폼",
  description: "전국 아파트 분양, 분양권, 규제, 전매제한, 실거주의무, 입주예정일, 교통, 학군, 편의시설 등 모든 정보를 한눈에!",
  openGraph: {
    title: "아파트 청약은 줍줍 | 대한민국 분양 정보 플랫폼",
    description: "전국 아파트 분양, 분양권, 규제, 전매제한, 실거주의무, 입주예정일, 교통, 학군, 편의시설 등 모든 정보를 한눈에!",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://zoopzoop.homes",
    type: "website",
    images: [
      {
        url: (process.env.NEXT_PUBLIC_BASE_URL || "https://zoopzoop.homes") + "/og-default.png",
        width: 1200,
        height: 630,
        alt: "줍줍 대표 이미지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "아파트 청약은 줍줍 | 대한민국 분양 정보 플랫폼",
    description: "전국 아파트 분양, 분양권, 규제, 전매제한, 실거주의무, 입주예정일, 교통, 학군, 편의시설 등 모든 정보를 한눈에!",
    images: [
      (process.env.NEXT_PUBLIC_BASE_URL || "https://zoopzoop.homes") + "/og-default.png"
    ],
  },
  other: {
    "naver-site-verification": "65b3740c4f59722100f6df5816f3cb4c00e507ee",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          async
          src='https://t1.kakaocdn.net/kakao_js_sdk/2.3.0/kakao.min.js'
          integrity={"!!!integridy!!!"}
          crossOrigin='anonymous'
        ></Script>
        <Analytics />
        <SpeedInsights />
        <AuthProvider>
          {children}
          <ChannelService/>

        </AuthProvider>
      </body>
    </html>
  );
}
