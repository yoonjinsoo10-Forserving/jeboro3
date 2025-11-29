// 제보로 프로젝트 - 신고하기 페이지
// 핵심 규칙: 제보/기자/시스템 신고 접수

"use client";

import { useState } from "react";
import { AlertTriangle, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { toast } from "sonner";

export default function ReportIssuePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: "", issueType: "", targetId: "", description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.issueType || !formData.description) {
      toast.error("모든 필수 항목을 입력해주세요.");
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("신고가 접수되었습니다.");
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">신고가 접수되었습니다</h2>
              <p className="text-gray-600 mb-6">신고 내용을 검토 후 조치하겠습니다.<br />처리 결과는 이메일로 안내드립니다.</p>
              <Button onClick={() => setIsSubmitted(false)} variant="outline">새 신고하기</Button>
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
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">신고하기</h1>
            <p className="text-gray-600 max-w-xl mx-auto">부적절한 제보, 기자 행위, 또는 시스템 문제를 신고해 주세요.</p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>신고 양식</CardTitle>
              <CardDescription>신고 내용은 비공개로 처리되며, 신고자 정보는 보호됩니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  허위 신고는 제재 대상이 될 수 있습니다. 정확한 정보를 기반으로 신고해 주세요.
                </AlertDescription>
              </Alert>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">연락받을 이메일 *</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="email@example.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issueType">신고 유형 *</Label>
                  <Select value={formData.issueType} onValueChange={(v) => setFormData({ ...formData, issueType: v })}>
                    <SelectTrigger><SelectValue placeholder="선택해주세요" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false_report">허위/악의적 제보</SelectItem>
                      <SelectItem value="defamation">명예훼손/비방</SelectItem>
                      <SelectItem value="copyright">저작권 침해</SelectItem>
                      <SelectItem value="reporter_misconduct">기자 부정 행위</SelectItem>
                      <SelectItem value="harassment">괴롭힘/협박</SelectItem>
                      <SelectItem value="spam">스팸/광고</SelectItem>
                      <SelectItem value="bug">시스템 오류</SelectItem>
                      <SelectItem value="other">기타</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetId">대상 ID (선택)</Label>
                  <Input id="targetId" value={formData.targetId} onChange={(e) => setFormData({ ...formData, targetId: e.target.value })} placeholder="제보 ID 또는 사용자 ID (알고 있는 경우)" />
                  <p className="text-xs text-gray-500">신고 대상의 ID를 알고 있다면 입력해 주세요. 빠른 처리에 도움이 됩니다.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">상세 내용 *</Label>
                  <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="신고 내용을 상세히 작성해 주세요. 구체적인 상황, 시간, 증거 등을 포함하면 빠른 처리가 가능합니다." rows={6} required />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full bg-red-600 hover:bg-red-700">
                  {isSubmitting ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /> : <><Send className="mr-2 h-4 w-4" />신고 제출</>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

