// 제보로 프로젝트 - 이용 가이드 페이지
// 핵심 규칙: 제보자/기자별 단계별 가이드

import Link from "next/link";
import { BookOpen, Mic, Users, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const informantSteps = [
  { step: 1, title: "회원가입", description: "카카오, 네이버, 또는 구글 계정으로 간편하게 가입하세요.", tip: "로그인 없이도 음성→텍스트 데모를 체험할 수 있어요." },
  { step: 2, title: "제보 작성", description: "마이크 버튼을 눌러 음성으로 제보하거나 직접 텍스트를 입력하세요.", tip: "음성은 서버에 저장되지 않으니 안심하세요." },
  { step: 3, title: "공개 방식 선택", description: "OPEN(전체 공개) 또는 EXCLUSIVE(독점 48시간)를 선택하세요.", tip: "중요한 제보는 EXCLUSIVE로 설정하면 독점 기사화 가능성이 높아요." },
  { step: 4, title: "제보 제출", description: "카테고리와 지역을 선택하고 제출하면 심사가 시작됩니다.", tip: "심사는 보통 24시간 이내에 완료됩니다." },
  { step: 5, title: "기자 제안 검토", description: "기자들의 Pick 제안을 확인하고 원하는 기자를 선택하세요.", tip: "기자의 평판 점수와 이전 기사를 참고하세요." },
];

const reporterSteps = [
  { step: 1, title: "회원가입", description: "소셜 로그인으로 가입 후 기자 가입 페이지로 이동하세요.", tip: null },
  { step: 2, title: "기자 인증", description: "기자증 또는 재직증명서를 업로드하여 인증을 요청하세요.", tip: "영업일 기준 1-2일 내 심사가 완료됩니다." },
  { step: 3, title: "구독 선택", description: "무료 플랜으로 시작하거나 BASIC/PREMIUM 구독을 선택하세요.", tip: "첫 달은 BASIC 플랜 무료 체험이 가능해요." },
  { step: 4, title: "제보 피드 탐색", description: "승인된 제보를 필터링하여 관심 있는 제보를 찾으세요.", tip: "지역, 카테고리, 공개 방식으로 필터링할 수 있어요." },
  { step: 5, title: "Pick 및 제안", description: "마음에 드는 제보를 Pick하고 제보자에게 기사화 제안을 보내세요.", tip: "구체적인 기사화 계획을 작성하면 수락률이 높아요." },
  { step: 6, title: "기사화 완료", description: "기사가 게재되면 URL을 등록하여 기사화 완료를 알리세요.", tip: "완료 등록 시 평판 점수가 상승합니다." },
];

export default function GuidePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">이용 가이드</h1>
            <p className="text-gray-600 max-w-xl mx-auto">제보로를 처음 사용하시나요? 단계별로 안내해 드립니다.</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="informant" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="informant" className="flex items-center gap-2">
                  <Mic className="h-4 w-4" />제보자 가이드
                </TabsTrigger>
                <TabsTrigger value="reporter" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />기자 가이드
                </TabsTrigger>
              </TabsList>

              <TabsContent value="informant">
                <div className="space-y-6">
                  {informantSteps.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="flex items-start gap-4 pt-6">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-gray-600 mb-2">{item.description}</p>
                          {item.tip && (
                            <Badge variant="secondary" className="text-xs">
                              💡 {item.tip}
                            </Badge>
                          )}
                        </div>
                        {index < informantSteps.length - 1 && (
                          <ArrowRight className="h-5 w-5 text-gray-300 shrink-0 hidden md:block" />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Button asChild size="lg" className="bg-linear-to-r from-blue-600 to-indigo-600">
                    <Link href="/report/new">지금 제보하기</Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="reporter">
                <div className="space-y-6">
                  {reporterSteps.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="flex items-start gap-4 pt-6">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-gray-600 mb-2">{item.description}</p>
                          {item.tip && (
                            <Badge variant="secondary" className="text-xs">
                              💡 {item.tip}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Button asChild size="lg" className="bg-linear-to-r from-indigo-600 to-blue-600">
                    <Link href="/for-reporters">기자로 가입하기</Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

