// 제보로 프로젝트 - 기업 서비스 페이지
// 핵심 규칙: B2B 언론사 대시보드 안내

import Link from "next/link";
import { Building2, Users, BarChart3, Shield, Zap, HeadphonesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PARTNER_PRESS } from "@/lib/constants";

export default function EnterprisePage() {
  const features = [
    { icon: Users, title: "팀 관리", description: "기자 팀원 초대 및 권한 관리, 제보 분배 기능" },
    { icon: BarChart3, title: "성과 분석", description: "제보 처리 현황, 기사화율, 응답 시간 등 상세 리포트" },
    { icon: Shield, title: "우선 접근", description: "EXCLUSIVE 제보 우선 알림 및 독점 접근 권한" },
    { icon: Zap, title: "API 연동", description: "기존 CMS와 연동 가능한 REST API 제공" },
    { icon: HeadphonesIcon, title: "전담 지원", description: "전담 매니저 배정 및 24시간 기술 지원" },
    { icon: Building2, title: "맞춤 계약", description: "언론사 규모와 니즈에 맞는 맞춤형 요금제" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* 히어로 */}
        <section className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">🏢 Enterprise</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              언론사를 위한<br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
                맞춤형 제보 솔루션
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              팀 단위로 제보를 관리하고, 상세한 성과 분석과 함께
              독점 제보에 우선 접근하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                <Link href="/contact">도입 문의</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href="#features">기능 살펴보기</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 파트너 언론사 */}
        <section className="py-12 bg-gray-50 border-b">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-gray-500 mb-6">50개 이상의 언론사가 제보로와 함께합니다</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              {PARTNER_PRESS.slice(0, 10).map((press) => (
                <span key={press} className="px-4 py-2 bg-white rounded-lg shadow-sm">{press}</span>
              ))}
              <span className="px-4 py-2 bg-white rounded-lg shadow-sm text-blue-600 font-medium">+40</span>
            </div>
          </div>
        </section>

        {/* 기능 */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Enterprise 전용 기능</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 가격 */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">맞춤형 가격 정책</h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-8">
              언론사 규모, 기자 수, 필요 기능에 따라 맞춤형 견적을 제공합니다.
              부담 없이 문의해 주세요.
            </p>
            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">맞춤 견적</div>
                <p className="text-gray-600 mb-6">월 단위 / 연 단위 계약 가능</p>
                <ul className="text-left space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-sm"><span className="text-green-500">✓</span>무제한 기자 계정</li>
                  <li className="flex items-center gap-2 text-sm"><span className="text-green-500">✓</span>전용 대시보드</li>
                  <li className="flex items-center gap-2 text-sm"><span className="text-green-500">✓</span>API 연동</li>
                  <li className="flex items-center gap-2 text-sm"><span className="text-green-500">✓</span>전담 매니저</li>
                </ul>
                <Button asChild className="w-full bg-linear-to-r from-blue-600 to-indigo-600">
                  <Link href="/contact">도입 문의하기</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

