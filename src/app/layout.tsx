// 제보로 프로젝트 - 루트 레이아웃
// 핵심 규칙: 모바일 퍼스트, 한국어 기본

import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "제보로 - 음성으로 쉽게, 기사로 빠르게",
  description: "제보로는 모바일 음성 제보 플랫폼입니다. 소상공인과 개인이 음성으로 쉽게 제보하면 기자들이 검증하여 기사화합니다. 음성 파일은 서버에 저장되지 않습니다.",
  keywords: ["제보", "기자", "뉴스", "음성 제보", "언론", "제보로"],
  authors: [{ name: "제보로" }],
  openGraph: {
    title: "제보로 - 음성으로 쉽게, 기사로 빠르게",
    description: "모바일 음성 제보 플랫폼",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} font-sans antialiased`}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
