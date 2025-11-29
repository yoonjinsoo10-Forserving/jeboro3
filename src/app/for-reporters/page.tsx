// 제보로 프로젝트 - 기자 가입 안내 페이지
// 핵심 규칙: 기자 인증 프로세스 안내

import Link from "next/link";
import { Shield, Clock, Award, TrendingUp, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PARTNER_PRESS } from "@/lib/constants";

export default function ForReportersPage() {
  const steps = [
    { icon: FileText, title: "1. 회원가입", description: "카카오/네이버/구글로 간편 가입" },
    { icon: Shield, title: "2. 인증 요청", description: "기자증 또는 재직증명서 업로드" },
    { icon: Clock, title: "3. 심사 대기", description: "영업일 기준 1-2일 내 심사" },
    { icon: CheckCircle, title: "4. 인증 완료", description: "제보 피드 접근 및 Pick 시작" },
  ];

  const benefits = [
    { icon: TrendingUp, title: "독점 제보 접근", description: "EXCLUSIVE 제보에 우선 접근하여 단독 기사 기회를 잡으세요" },
    { icon: Shield, title: "신뢰도 시스템", description: "평판 점수로 우수 기자로 인정받고 더 많은 기회를 얻으세요" },
    { icon: Award, title: "언론사 대시보드", description: "팀원 관리, 제보 분배, 성과 분석 기능 제공 (B2B)" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* 히어로 */}
        <section className="bg-linear-to-br from-indigo-50 via-white to-blue-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4 bg-indigo-100 text-indigo-700">📰 기자 전용</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              기사 소재, 이제<br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-blue-600">
                직접 찾지 마세요
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              제보로에서 인증된 기자로 활동하고,
              검증된 제보를 빠르게 기사화하세요.
              음성 제보가 텍스트로 정리되어 바로 활용 가능합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-linear-to-r from-indigo-600 to-blue-600 text-lg px-8 py-6">
                <Link href="/login">기자로 가입하기</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/pricing">요금제 보기</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 가입 단계 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">인증 프로세스</h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 혜택 */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">기자 혜택</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                      <benefit.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle>{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 파트너 언론사 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-lg font-semibold text-gray-500 mb-6">50+ 파트너 언론사</h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              {PARTNER_PRESS.slice(0, 15).map((press) => (
                <span key={press} className="px-3 py-1 bg-gray-100 rounded-full">{press}</span>
              ))}
              <span className="px-3 py-1 bg-gray-100 rounded-full">+35</span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-linear-to-r from-indigo-600 to-blue-600 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">지금 시작하세요</h2>
            <p className="text-lg mb-8 opacity-90">무료로 가입하고, 첫 달 BASIC 플랜 무료 체험</p>
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/login">무료로 시작하기</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

