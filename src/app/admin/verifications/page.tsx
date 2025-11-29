// 제보로 프로젝트 - 기자 인증 관리 페이지
// 핵심 규칙: 기자 인증 승인/반려, 감사 로그 기록

"use client";

import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Eye, FileText, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/layout/header";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface Verification {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  docs?: string;
  comment?: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
}

export default function AdminVerificationsPage() {
  const [verifications, setVerifications] = useState<Verification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    // 더미 데이터
    setVerifications([
      {
        id: "1",
        status: "PENDING",
        docs: "press-card-1.jpg",
        createdAt: "2024-01-15T10:00:00Z",
        user: { id: "u1", name: "김기자", email: "kim@press.com" },
      },
      {
        id: "2",
        status: "PENDING",
        docs: "press-card-2.jpg",
        createdAt: "2024-01-14T15:30:00Z",
        user: { id: "u2", name: "이기자", email: "lee@news.com" },
      },
    ]);
    setIsLoading(false);
  }, []);

  const handleApprove = async (id: string) => {
    console.log("Approve verification:", id, comment);
    // API 호출
    setVerifications(verifications.map(v => v.id === id ? { ...v, status: "APPROVED" as const } : v));
    setComment("");
    setSelectedId(null);
  };

  const handleReject = async (id: string) => {
    if (!comment.trim()) {
      alert("반려 사유를 입력해주세요.");
      return;
    }
    console.log("Reject verification:", id, comment);
    // API 호출
    setVerifications(verifications.map(v => v.id === id ? { ...v, status: "REJECTED" as const, comment } : v));
    setComment("");
    setSelectedId(null);
  };

  const pendingCount = verifications.filter(v => v.status === "PENDING").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">기자 인증 관리</h1>
          <p className="text-gray-600">기자 인증 요청을 검토하고 승인/반려하세요</p>
        </div>

        <div className="mb-6">
          <Badge variant="outline" className="text-lg py-1 px-3">
            <Clock className="h-4 w-4 mr-2" />대기 중: {pendingCount}건
          </Badge>
        </div>

        <div className="space-y-4">
          {verifications.filter(v => v.status === "PENDING").map((verification) => (
            <Card key={verification.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
                      {verification.user.name[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{verification.user.name}</h3>
                      <p className="text-gray-600">{verification.user.email}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDistanceToNow(new Date(verification.createdAt), { addSuffix: true, locale: ko })} 신청
                      </p>
                      {verification.docs && (
                        <Button variant="link" className="p-0 h-auto mt-2">
                          <FileText className="h-4 w-4 mr-1" />인증 문서 보기
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="text-green-600" onClick={() => setSelectedId(verification.id)}>
                          <CheckCircle className="h-4 w-4 mr-1" />승인
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>기자 인증 승인</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <p><strong>{verification.user.name}</strong>님의 기자 인증을 승인하시겠습니까?</p>
                          <div>
                            <Label>승인 코멘트 (선택)</Label>
                            <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="승인 관련 메모를 남겨주세요" />
                          </div>
                          <Button onClick={() => handleApprove(verification.id)} className="w-full bg-green-600 hover:bg-green-700">승인하기</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="text-red-600" onClick={() => setSelectedId(verification.id)}>
                          <XCircle className="h-4 w-4 mr-1" />반려
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>기자 인증 반려</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <p><strong>{verification.user.name}</strong>님의 기자 인증을 반려하시겠습니까?</p>
                          <div>
                            <Label>반려 사유 (필수)</Label>
                            <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="반려 사유를 입력해주세요" required />
                          </div>
                          <Button onClick={() => handleReject(verification.id)} variant="destructive" className="w-full">반려하기</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {pendingCount === 0 && (
            <Card><CardContent className="p-12 text-center text-gray-500">대기 중인 인증 요청이 없습니다</CardContent></Card>
          )}
        </div>
      </div>
    </div>
  );
}

