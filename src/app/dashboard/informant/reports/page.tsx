// 제보로 프로젝트 - 제보자 대시보드 (내 제보 목록)
// 핵심 규칙: 본인 제보만 조회, 상태 확인 가능

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Clock, CheckCircle, XCircle, Eye, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/components/layout/header";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface Report {
  id: string;
  title: string;
  content: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  publishType: "OPEN" | "EXCLUSIVE";
  viewCount: number;
  createdAt: string;
  rejectReason?: string;
  picks: Array<{
    id: string;
    proposal?: string;
    isAccepted: boolean;
    reporter: { name: string };
  }>;
}

const statusConfig = {
  PENDING: { label: "심사 중", icon: Clock, color: "bg-yellow-100 text-yellow-800" },
  APPROVED: { label: "승인됨", icon: CheckCircle, color: "bg-green-100 text-green-800" },
  REJECTED: { label: "반려됨", icon: XCircle, color: "bg-red-100 text-red-800" },
};

export default function InformantReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch("/api/reports/my");
      const data = await response.json();
      if (data.success) {
        setReports(data.data.items);
      }
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">내 제보</h1>
            <p className="text-gray-600">제출한 제보 현황을 확인하세요</p>
          </div>
          <Button asChild className="bg-linear-to-r from-blue-600 to-indigo-600">
            <Link href="/report/new"><Plus className="mr-2 h-4 w-4" />새 제보</Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}><CardContent className="p-6"><Skeleton className="h-24 w-full" /></CardContent></Card>
            ))}
          </div>
        ) : reports.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500 mb-4">아직 제출한 제보가 없습니다</p>
              <Button asChild><Link href="/report/new">첫 제보하기</Link></Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => {
              const status = statusConfig[report.status];
              const StatusIcon = status.icon;
              return (
                <Card key={report.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={status.color}>
                            <StatusIcon className="h-3 w-3 mr-1" />{status.label}
                          </Badge>
                          <Badge variant="outline">
                            {report.publishType === "EXCLUSIVE" ? "🔒 독점" : "🌐 공개"}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">{report.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{report.content}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />{report.viewCount}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />{report.picks.length} 제안
                          </span>
                          <span>{formatDistanceToNow(new Date(report.createdAt), { addSuffix: true, locale: ko })}</span>
                        </div>
                        {report.status === "REJECTED" && report.rejectReason && (
                          <div className="mt-3 p-3 bg-red-50 rounded-lg text-sm text-red-700">
                            <strong>반려 사유:</strong> {report.rejectReason}
                          </div>
                        )}
                      </div>
                      <Button variant="outline" asChild>
                        <Link href={`/report/${report.id}`}>상세보기</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

