// 제보로 프로젝트 - 제보 작성 페이지
// 핵심 규칙: 음성 파일 서버 전송 금지, 텍스트만 저장

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mic, MicOff, Send, ArrowLeft, Lock, Globe, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { CATEGORIES, REGIONS } from "@/lib/constants";

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

export default function NewReportPage() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [publishType, setPublishType] = useState<"OPEN" | "EXCLUSIVE">("OPEN");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setIsSupported(false);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "ko-KR";

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalText = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalText += event.results[i][0].transcript;
          }
        }
        if (finalText) {
          setContent((prev) => prev + finalText);
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        if (event.error === "not-allowed") {
          setError("마이크 권한이 필요합니다.");
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        if (isListening) recognition.start();
      };

      recognitionRef.current = recognition;
    }
  }, [isListening]);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;
    setError(null);

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setError("음성 인식을 시작할 수 없습니다.");
      }
    }
  }, [isListening]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("제목과 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title, content, category, region, publishType, isAnonymous,
        }),
      });

      if (response.ok) {
        router.push("/dashboard/informant/reports");
      } else {
        const data = await response.json();
        setError(data.error || "제보 제출에 실패했습니다.");
      }
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />뒤로 가기
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-blue-600" />음성 제보하기
            </CardTitle>
            <p className="text-sm text-gray-500">🔒 음성은 서버에 저장되지 않습니다</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}

              <div className="space-y-2">
                <Label htmlFor="title">제목 *</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제보 제목을 입력하세요" required />
              </div>

              <div className="space-y-2">
                <Label>내용 *</Label>
                <div className="flex justify-center mb-4">
                  <Button type="button" onClick={toggleListening} disabled={!isSupported}
                    className={`rounded-full w-16 h-16 ${isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-linear-to-r from-blue-600 to-indigo-600"}`}>
                    {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                  </Button>
                </div>
                <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="마이크 버튼을 눌러 음성으로 입력하거나 직접 작성하세요" rows={8} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>카테고리</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger><SelectValue placeholder="선택" /></SelectTrigger>
                    <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>지역</Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger><SelectValue placeholder="선택" /></SelectTrigger>
                    <SelectContent>{REGIONS.map((r) => <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label>공개 방식</Label>
                <RadioGroup value={publishType} onValueChange={(v) => setPublishType(v as "OPEN" | "EXCLUSIVE")} className="grid grid-cols-2 gap-4">
                  <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer ${publishType === "OPEN" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`} onClick={() => setPublishType("OPEN")}>
                    <RadioGroupItem value="OPEN" id="open" />
                    <div><Label htmlFor="open" className="font-medium flex items-center gap-2"><Globe className="h-4 w-4" />OPEN</Label><p className="text-xs text-gray-500">모든 기자에게 공개</p></div>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer ${publishType === "EXCLUSIVE" ? "border-indigo-500 bg-indigo-50" : "border-gray-200"}`} onClick={() => setPublishType("EXCLUSIVE")}>
                    <RadioGroupItem value="EXCLUSIVE" id="exclusive" />
                    <div><Label htmlFor="exclusive" className="font-medium flex items-center gap-2"><Lock className="h-4 w-4" />EXCLUSIVE</Label><p className="text-xs text-gray-500">48시간 독점 기회</p></div>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div><Label htmlFor="anonymous" className="font-medium">익명 제보</Label><p className="text-xs text-gray-500">신원이 기자에게 공개되지 않습니다</p></div>
                <Switch id="anonymous" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-linear-to-r from-blue-600 to-indigo-600">
                {isSubmitting ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /> : <><Send className="mr-2 h-5 w-5" />제보 제출하기</>}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

