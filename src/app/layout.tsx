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
  title: "ZOOP ZOOP | 아파트 분양 정보는 줍줍",
  description: "아파트 분양 정보는 줍줍",
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
