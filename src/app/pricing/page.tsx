// 제보로 프로젝트 - 요금제 페이지
// 핵심 규칙: 기자 구독, 제보자 부스트 상품 안내

"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Zap, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PLAN_FEATURES, BOOST_PRICE, AI_EDIT_PRICE } from "@/lib/constants";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      id: "FREE",
      name: "무료",
      icon: Star,
      price: 0,
      features: ["OPEN 제보 열람", "기본 피드 접근", "제보 Pick (월 5회)"],
      notIncluded: ["EXCLUSIVE 제보 접근", "우선 알림", "AI 편집 서비스"],
      cta: "시작하기",
      popular: false,
    },
    {
      id: "BASIC",
      name: "기본",
      icon: Zap,
      price: isAnnual ? 24900 : 29000,
      features: ["OPEN 제보 열람", "EXCLUSIVE 제안 가능", "우선 알림", "무제한 Pick"],
      notIncluded: ["AI 편집 서비스", "전담 지원"],
      cta: "구독하기",
      popular: true,
    },
    {
      id: "PREMIUM",
      name: "프리미엄",
      icon: Crown,
      price: isAnnual ? 49900 : 59000,
      features: ["모든 기능 포함", "EXCLUSIVE 우선 접근", "AI 편집 서비스", "전담 지원", "언론사 대시보드"],
      notIncluded: [],
      cta: "구독하기",
      popular: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-20 bg-linear-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-700">💼 기자 전용</Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">구독 요금제</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              더 많은 제보에 접근하고, 독점 기사 기회를 잡으세요
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <Label htmlFor="billing">월간</Label>
              <Switch id="billing" checked={isAnnual} onCheckedChange={setIsAnnual} />
              <Label htmlFor="billing">연간 <Badge variant="secondary">14% 할인</Badge></Label>
            </div>
          </div>

          {/* 구독 플랜 */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <Card key={plan.id} className={`relative ${plan.popular ? "border-2 border-blue-500 shadow-lg" : ""}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500">인기</Badge>
                  )}
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-gray-700" />
                    </div>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>
                      <span className="text-3xl font-bold text-gray-900">₩{plan.price.toLocaleString()}</span>
                      {plan.price > 0 && <span className="text-gray-500">/월</span>}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500" />{feature}
                        </li>
                      ))}
                      {plan.notIncluded.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-400 line-through">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`} variant={plan.popular ? "default" : "outline"}>
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* 제보자 상품 */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-yellow-100 text-yellow-700">✨ 제보자 전용</Badge>
              <h2 className="text-2xl font-bold text-gray-900">부가 서비스</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-yellow-500" />부스트</CardTitle>
                  <CardDescription>제보를 상단에 우선 노출합니다</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">₩{BOOST_PRICE.toLocaleString()}<span className="text-sm text-gray-500">/회</span></p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" />24시간 상단 노출</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" />기자 우선 알림</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Star className="h-5 w-5 text-purple-500" />AI 편집</CardTitle>
                  <CardDescription>제보를 기사 초안으로 변환합니다</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">₩{AI_EDIT_PRICE.toLocaleString()}<span className="text-sm text-gray-500">/회</span></p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" />AI 기사 초안 생성</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" />문법/맞춤법 교정</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

