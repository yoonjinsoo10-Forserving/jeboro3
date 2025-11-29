// 제보로 프로젝트 - 명예훼손 정책 페이지
// 핵심 규칙: 명예훼손 신고 및 처리 절차 안내

import Link from "next/link";
import { AlertTriangle, Scale, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function DefamationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
              <Scale className="h-8 w-8 text-orange-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">명예훼손 정책</h1>
            <p className="text-gray-600 max-w-xl mx-auto">제보로는 명예훼손으로부터 모든 이용자를 보호합니다.</p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="prose prose-gray max-w-none pt-6">
              <Alert className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  제보로는 명예훼손 신고를 심각하게 다루며, 신속하게 처리합니다.
                </AlertDescription>
              </Alert>

              <h2 className="text-xl font-bold mt-6 mb-4">1. 명예훼손이란?</h2>
              <p className="text-gray-600 mb-4">
                명예훼손은 공연히 사실 또는 허위의 사실을 적시하여 사람의 명예를 훼손하는 행위입니다. 
                제보로에서는 다음과 같은 행위를 명예훼손으로 간주합니다:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li>특정인을 식별할 수 있는 정보와 함께 허위 사실 유포</li>
                <li>사실이라도 비방의 목적으로 작성된 제보</li>
                <li>개인의 사생활을 침해하는 내용</li>
                <li>욕설, 모욕적 표현이 포함된 제보</li>
              </ul>

              <h2 className="text-xl font-bold mt-6 mb-4">2. 명예훼손 신고 절차</h2>
              <div className="grid md:grid-cols-3 gap-4 my-6">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="font-semibold mb-1">신고 접수</h3>
                  <p className="text-sm text-gray-600">신고하기 페이지에서 상세 내용 작성</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-blue-600">2</span>
                  </div>
                  <h3 className="font-semibold mb-1">내용 검토</h3>
                  <p className="text-sm text-gray-600">24시간 내 담당자 검토</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-blue-600">3</span>
                  </div>
                  <h3 className="font-semibold mb-1">조치 및 통보</h3>
                  <p className="text-sm text-gray-600">삭제/경고/차단 등 조치 후 결과 통보</p>
                </div>
              </div>

              <h2 className="text-xl font-bold mt-6 mb-4">3. 처리 기준</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li><strong>경미한 위반:</strong> 해당 제보 삭제 및 경고</li>
                <li><strong>중대한 위반:</strong> 제보 삭제, 평판 점수 차감, 일시 이용 정지</li>
                <li><strong>반복적 위반:</strong> 계정 영구 정지</li>
                <li><strong>법적 조치 필요 시:</strong> 수사 기관 협조</li>
              </ul>

              <h2 className="text-xl font-bold mt-6 mb-4">4. 처리 시한</h2>
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg mb-4">
                <Clock className="h-8 w-8 text-blue-600 shrink-0" />
                <div>
                  <p className="font-semibold text-blue-800">일반 신고: 72시간 이내</p>
                  <p className="font-semibold text-blue-800">긴급 신고(고위험): 24시간 이내</p>
                </div>
              </div>

              <h2 className="text-xl font-bold mt-6 mb-4">5. 피해자 보호</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li>신고자의 신원은 철저히 보호됩니다.</li>
                <li>필요시 해당 제보를 즉시 비공개 처리합니다.</li>
                <li>피해자가 요청할 경우 법적 대응에 필요한 자료를 제공합니다.</li>
              </ul>

              <h2 className="text-xl font-bold mt-6 mb-4">6. 제보자의 책임</h2>
              <p className="text-gray-600 mb-4">
                제보자는 제보 내용의 진실성에 대한 책임이 있습니다. 
                허위 사실로 인한 명예훼손은 민형사상 책임을 질 수 있으며, 
                제보로는 법적 절차에 협조합니다.
              </p>

              <div className="mt-8 p-6 bg-gray-100 rounded-lg text-center">
                <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">명예훼손 피해를 입으셨나요?</h3>
                <p className="text-gray-600 mb-4">지금 바로 신고해 주세요. 신속하게 처리하겠습니다.</p>
                <Button asChild className="bg-orange-600 hover:bg-orange-700">
                  <Link href="/report-issue">신고하기</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

