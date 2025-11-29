// 제보로 프로젝트 - 문의하기 페이지
// 핵심 규칙: 일반 문의, 기업 문의 구분

"use client";

import { useState } from "react";
import { Mail, MessageSquare, Building2, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { toast } from "sonner";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", type: "", subject: "", message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.type || !formData.message) {
      toast.error("모든 필수 항목을 입력해주세요.");
      return;
    }
    setIsSubmitting(true);
    // 실제로는 API 호출
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("문의가 접수되었습니다.");
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20 bg-gray-50">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">문의가 접수되었습니다</h2>
              <p className="text-gray-600 mb-6">영업일 기준 1-2일 내에 답변 드리겠습니다.</p>
              <Button onClick={() => setIsSubmitted(false)} variant="outline">새 문의하기</Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">문의하기</h1>
            <p className="text-gray-600 max-w-xl mx-auto">궁금한 점이나 제안이 있으시면 언제든지 문의해 주세요.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* 연락처 정보 */}
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <Mail className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold mb-1">이메일</h3>
                  <p className="text-sm text-gray-600">support@jeboro.com</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Building2 className="h-8 w-8 text-indigo-600 mb-3" />
                  <h3 className="font-semibold mb-1">기업 문의</h3>
                  <p className="text-sm text-gray-600">enterprise@jeboro.com</p>
                </CardContent>
              </Card>
            </div>

            {/* 문의 폼 */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>문의 양식</CardTitle>
                <CardDescription>아래 양식을 작성해 주시면 빠르게 답변 드리겠습니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">이름 *</Label>
                      <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="홍길동" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">이메일 *</Label>
                      <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="email@example.com" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">문의 유형 *</Label>
                    <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                      <SelectTrigger><SelectValue placeholder="선택해주세요" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">일반 문의</SelectItem>
                        <SelectItem value="report">제보 관련</SelectItem>
                        <SelectItem value="reporter">기자 인증 관련</SelectItem>
                        <SelectItem value="payment">결제 관련</SelectItem>
                        <SelectItem value="enterprise">기업 도입 문의</SelectItem>
                        <SelectItem value="partnership">제휴 문의</SelectItem>
                        <SelectItem value="other">기타</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">제목</Label>
                    <Input id="subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} placeholder="문의 제목" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">내용 *</Label>
                    <Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="문의 내용을 자세히 작성해 주세요." rows={5} required />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /> : <><Send className="mr-2 h-4 w-4" />문의 보내기</>}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

