// 제보로 프로젝트 - 로그인 페이지
// 핵심 규칙: 카카오 > 네이버 > 구글 순서 유지

"use client";

import { useState } from "react";
import Link from "next/link";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { signIn } from "@/lib/auth-client";

// 소셜 로그인 아이콘
const KakaoIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.47 1.607 4.647 4.03 5.938-.132.478-.847 3.054-.878 3.282 0 0-.017.135.072.186.089.051.194.014.194.014.256-.035 2.963-1.935 3.432-2.264.37.055.754.084 1.15.084 5.523 0 10-3.477 10-7.5S17.523 3 12 3z"/>
  </svg>
);

const NaverIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"/>
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSocialLogin = async (provider: "kakao" | "naver" | "google") => {
    setIsLoading(provider);
    try {
      await signIn.social({ provider, callbackURL: "/dashboard" });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 via-white to-indigo-50 p-4">
      {/* 로고 */}
      <Link href="/" className="flex items-center space-x-2 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-indigo-600">
          <Mic className="h-5 w-5 text-white" />
        </div>
        <span className="text-2xl font-bold text-gray-900">제보로</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">로그인</CardTitle>
          <CardDescription>
            소셜 계정으로 간편하게 로그인하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 카카오 로그인 (1순위) */}
          <Button
            onClick={() => handleSocialLogin("kakao")}
            disabled={isLoading !== null}
            className="w-full h-12 bg-[#FEE500] hover:bg-[#FDD800] text-[#191919] font-medium"
          >
            {isLoading === "kakao" ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900" />
            ) : (
              <>
                <KakaoIcon />
                <span className="ml-2">카카오로 시작하기</span>
              </>
            )}
          </Button>

          {/* 네이버 로그인 (2순위) */}
          <Button
            onClick={() => handleSocialLogin("naver")}
            disabled={isLoading !== null}
            className="w-full h-12 bg-[#03C75A] hover:bg-[#02B350] text-white font-medium"
          >
            {isLoading === "naver" ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              <>
                <NaverIcon />
                <span className="ml-2">네이버로 시작하기</span>
              </>
            )}
          </Button>

          {/* 구글 로그인 (3순위) */}
          <Button
            onClick={() => handleSocialLogin("google")}
            disabled={isLoading !== null}
            variant="outline"
            className="w-full h-12 font-medium"
          >
            {isLoading === "google" ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900" />
            ) : (
              <>
                <GoogleIcon />
                <span className="ml-2">Google로 시작하기</span>
              </>
            )}
          </Button>

          <Separator className="my-4" />

          <p className="text-xs text-center text-gray-500">
            로그인 시{" "}
            <Link href="/terms" className="underline hover:text-gray-700">
              이용약관
            </Link>
            {" 및 "}
            <Link href="/privacy" className="underline hover:text-gray-700">
              개인정보처리방침
            </Link>
            에 동의합니다.
          </p>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              기자로 가입하시나요?{" "}
              <Link href="/for-reporters" className="text-blue-600 hover:underline font-medium">
                기자 가입 안내
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 신뢰 문구 */}
      <p className="mt-8 text-sm text-gray-500 text-center max-w-md">
        🔒 제보로는 음성 파일을 서버에 저장하지 않습니다.<br />
        브라우저에서만 음성을 텍스트로 변환합니다.
      </p>
    </div>
  );
}

