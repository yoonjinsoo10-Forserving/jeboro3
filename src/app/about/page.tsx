// 제보로 프로젝트 - 소개 페이지
// 핵심 규칙: 서비스 소개, 핵심 가치 전달

import Link from "next/link";
import { Mic, Shield, Users, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function AboutPage() {
  const values = [
    { icon: Shield, title: "프라이버시 우선", description: "음성 파일은 서버에 저장되지 않습니다. 브라우저에서만 처리됩니다." },
    { icon: Users, title: "양면 마켓플레이스", description: "제보자와 기자를 연결하여 가치 있는 뉴스를 만들어갑니다." },
    { icon: Clock, title: "48시간 엠바고", description: "독점 제보는 선택한 기자에게만 48시간 동안 제공됩니다." },
    { icon: Heart, title: "소상공인 지원", description: "소상공인과 개인의 목소리가 뉴스가 될 수 있도록 돕습니다." },
  ];

  const stats = [
    { number: "50+", label: "파트너 언론사" },
    { number: "1,000+", label: "제보 처리" },
    { number: "300+", label: "인증 기자" },
    { number: "48시간", label: "엠바고 보장" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* 히어로 */}
        <section className="bg-linear-to-br from-blue-50 via-white to-indigo-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <Mic className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              제보로를 소개합니다
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              제보로는 소상공인과 개인이 음성으로 쉽게 제보하고,
              인증된 기자들이 이를 기사화하는 양면 마켓플레이스입니다.
            </p>
          </div>
        </section>

        {/* 미션 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">우리의 미션</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                &quot;모든 사람의 목소리가 뉴스가 될 수 있는 세상&quot;
              </p>
              <p className="mt-6 text-gray-600">
                복잡한 제보 과정을 음성 한 번으로 해결하고,
                신뢰할 수 있는 기자들과 연결하여
                당신의 이야기가 세상에 전해지도록 돕습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 핵심 가치 */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">핵심 가치</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-7 w-7 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 통계 */}
        <section className="py-20 bg-linear-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">지금 시작하세요</h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              제보자라면 음성으로 간편하게 제보하고,
              기자라면 인증 후 제보 피드에 접근하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-linear-to-r from-blue-600 to-indigo-600">
                <Link href="/report/new">제보하기</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/for-reporters">기자로 가입</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

