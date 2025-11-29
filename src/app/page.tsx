// 제보로 프로젝트 - 랜딩페이지
// 핵심 규칙: 모바일 퍼스트, 음성 파일 비저장, 두 집단(기자/제보자) CTA

import Link from "next/link";
import { Mic, Shield, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SpeechDemo } from "@/components/speech/speech-demo";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* 히어로 섹션 */}
        <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-indigo-50 py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
                🎤 음성 제보 플랫폼
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                음성으로 쉽게,<br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                  기사로 빠르게
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                당신의 목소리가 뉴스가 됩니다.
                제보로는 소상공인과 개인의 제보를 기자에게 연결하는
                모바일 음성 제보 플랫폼입니다.
              </p>

              {/* CTA 버튼 */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-linear-to-r from-blue-600 to-indigo-600 text-lg px-8 py-6"
                >
                  <Link href="/report/new">
                    <Mic className="mr-2 h-5 w-5" />
                    지금 제보하기
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 border-2"
                >
                  <Link href="/for-reporters">
                    <Users className="mr-2 h-5 w-5" />
                    기자로 가입하기
                  </Link>
                </Button>
              </div>

              {/* 신뢰 지표 */}
              <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  음성 파일 서버 저장 없음
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  48시간 독점 엠바고
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-500" />
                  50+ 파트너 언론사
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 핵심 기능 카드 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                어떻게 작동하나요?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                제보로는 음성을 텍스트로 변환하여 기자에게 전달합니다.
                당신의 프라이버시를 최우선으로 보호합니다.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Mic className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>음성→텍스트 변환</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Web Speech API를 사용해 브라우저에서 음성을 텍스트로 변환합니다.
                    <strong className="text-blue-600"> 음성 파일은 절대 서버에 저장되지 않습니다.</strong>
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-indigo-200 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle>EXCLUSIVE 제보</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    중요한 제보는 EXCLUSIVE로 설정하세요.
                    선택한 기자에게만 48시간 독점 기회를 제공합니다.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-purple-200 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>48시간 엠바고</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    EXCLUSIVE 제보 선택 시 48시간 타이머가 시작됩니다.
                    기간 내 미기사화 시 자동으로 OPEN 전환됩니다.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 음성 데모 섹션 */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                직접 체험해보세요
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                로그인 없이도 음성→텍스트 변환을 체험할 수 있습니다.
                데이터는 브라우저에서만 처리되며 어디에도 저장되지 않습니다.
              </p>
            </div>
            <SpeechDemo />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
