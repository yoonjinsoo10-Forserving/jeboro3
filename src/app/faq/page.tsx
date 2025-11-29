// 제보로 프로젝트 - FAQ 페이지
// 핵심 규칙: 제보자/기자 질문 구분, 핵심 규칙 강조

import Link from "next/link";
import { HelpCircle, Mic, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const informantFaqs = [
  { q: "음성 파일이 서버에 저장되나요?", a: "아니요, 절대 저장되지 않습니다. 음성은 브라우저의 Web Speech API를 통해 텍스트로 변환되며, 서버에는 변환된 텍스트만 전송됩니다. 음성 파일 자체는 어디에도 저장되지 않습니다." },
  { q: "익명으로 제보할 수 있나요?", a: "네, 기본적으로 모든 제보는 익명으로 처리됩니다. 제보 작성 시 '익명 제보' 옵션이 기본으로 켜져 있으며, 원하시면 끄실 수 있습니다." },
  { q: "OPEN과 EXCLUSIVE의 차이가 뭔가요?", a: "OPEN 제보는 모든 인증된 기자에게 공개됩니다. EXCLUSIVE 제보는 선택한 기자에게만 48시간 동안 독점 기회를 제공합니다. 48시간 내 기사화되지 않으면 자동으로 OPEN으로 전환됩니다." },
  { q: "제보 후 어떻게 되나요?", a: "제보는 먼저 관리자 심사를 거칩니다. 승인되면 기자 피드에 노출되고, 기자들이 Pick(선택)하여 기사화를 제안합니다. 제보자는 제안을 검토하고 수락할 수 있습니다." },
  { q: "부스트란 무엇인가요?", a: "부스트는 유료 서비스로, 제보를 24시간 동안 피드 상단에 노출시킵니다. 더 많은 기자에게 빠르게 노출되어 기사화 확률이 높아집니다." },
  { q: "제보가 반려되면 어떻게 되나요?", a: "반려 사유와 함께 알림이 전송됩니다. 내용을 수정하여 다시 제출할 수 있습니다." },
];

const reporterFaqs = [
  { q: "기자 인증은 어떻게 하나요?", a: "회원가입 후 기자 인증 페이지에서 기자증 또는 재직증명서를 업로드하면 됩니다. 영업일 기준 1-2일 내 심사가 완료됩니다." },
  { q: "무료 플랜으로도 제보를 볼 수 있나요?", a: "네, 무료 플랜으로 OPEN 제보를 열람하고 월 5회까지 Pick할 수 있습니다. EXCLUSIVE 제보 접근과 무제한 Pick은 유료 플랜에서 가능합니다." },
  { q: "48시간 엠바고란 무엇인가요?", a: "EXCLUSIVE 제보를 Pick하면 48시간 동안 해당 제보에 대한 독점 기사화 기회가 주어집니다. 이 기간 동안 다른 기자는 해당 제보를 볼 수 없습니다." },
  { q: "평판 점수는 어떻게 작동하나요?", a: "기사화 완료 시 +10점, 빠른 응답 시 +5점이 부여됩니다. 제안 무응답 시 -2점, 신고 접수 시 -20점이 차감됩니다. 평판이 높을수록 제보자에게 신뢰감을 줍니다." },
  { q: "기사화 완료는 어떻게 등록하나요?", a: "Pick한 제보의 상세 페이지에서 '기사화 완료' 버튼을 누르고 기사 URL을 입력하면 됩니다. 등록된 URL은 제보자와 관리자에게 공유됩니다." },
  { q: "구독을 해지하면 어떻게 되나요?", a: "해지 즉시 무료 플랜으로 전환됩니다. 진행 중인 Pick은 유지되지만, 새로운 EXCLUSIVE 제보에는 접근할 수 없습니다." },
];

export default function FaqPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">자주 묻는 질문</h1>
            <p className="text-gray-600 max-w-xl mx-auto">제보로 이용에 궁금한 점을 해결해 드립니다</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="informant" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="informant" className="flex items-center gap-2">
                  <Mic className="h-4 w-4" />제보자
                </TabsTrigger>
                <TabsTrigger value="reporter" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />기자
                </TabsTrigger>
              </TabsList>

              <TabsContent value="informant">
                <Card>
                  <CardHeader>
                    <CardTitle>제보자 FAQ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {informantFaqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                          <AccordionContent className="text-gray-600">{faq.a}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reporter">
                <Card>
                  <CardHeader>
                    <CardTitle>기자 FAQ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {reporterFaqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                          <AccordionContent className="text-gray-600">{faq.a}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">원하는 답변을 찾지 못하셨나요?</p>
              <Button asChild variant="outline">
                <Link href="/contact">문의하기</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

