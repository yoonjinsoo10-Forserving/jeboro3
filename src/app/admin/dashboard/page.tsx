// 제보로 프로젝트 - 관리자 대시보드
// 핵심 규칙: KPI 모니터링, 제보 심사, 기자 인증 관리

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, Shield, AlertTriangle, Clock, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/components/layout/header";

interface DashboardStats {
  totalReports: number;
  pendingReports: number;
  approvedReports: number;
  rejectedReports: number;
  totalReporters: number;
  pendingVerifications: number;
  activeEmbargos: number;
  recentAlerts: number;
}

interface PendingReport {
  id: string;
  title: string;
  content: string;
  publishType: string;
  createdAt: string;
  author: { name: string; email: string } | null;
}

// 초기 데이터
const initialStats: DashboardStats = {
  totalReports: 1250,
  pendingReports: 45,
  approvedReports: 1100,
  rejectedReports: 105,
  totalReporters: 320,
  pendingVerifications: 12,
  activeEmbargos: 8,
  recentAlerts: 3,
};

const initialPendingReports: PendingReport[] = [
  { id: "1", title: "지역 상가 임대료 급등 제보", content: "강남구 일대 상가 임대료가...", publishType: "OPEN", createdAt: "2024-01-15T10:30:00Z", author: null },
  { id: "2", title: "공공기관 비리 제보", content: "모 공공기관에서 발생한...", publishType: "EXCLUSIVE", createdAt: "2024-01-15T09:15:00Z", author: null },
];

export default function AdminDashboardPage() {
  const [stats] = useState<DashboardStats>(initialStats);
  const [pendingReports] = useState<PendingReport[]>(initialPendingReports);
  const [isLoading] = useState(false);

  // 실제 API 호출 시 useEffect 사용
  useEffect(() => {
    // TODO: 실제 API 호출로 교체
  }, []);

  const handleApprove = async (id: string) => {
    console.log("Approve:", id);
    // API 호출
  };

  const handleReject = async (id: string) => {
    console.log("Reject:", id);
    // API 호출
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-32" />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
            <p className="text-gray-600">제보로 플랫폼 현황을 모니터링하세요</p>
          </div>
        </div>

        {/* KPI 카드 */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">전체 제보</CardTitle>
              <FileText className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalReports.toLocaleString()}</div>
              <p className="text-xs text-gray-500">승인률 {((stats?.approvedReports || 0) / (stats?.totalReports || 1) * 100).toFixed(1)}%</p>
            </CardContent>
          </Card>
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700">심사 대기</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-700">{stats?.pendingReports}</div>
              <Link href="/admin/reports" className="text-xs text-yellow-600 hover:underline">바로가기 →</Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">기자 인증 대기</CardTitle>
              <Shield className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.pendingVerifications}</div>
              <Link href="/admin/verifications" className="text-xs text-blue-600 hover:underline">바로가기 →</Link>
            </CardContent>
          </Card>
          <Card className={stats?.recentAlerts ? "border-red-200 bg-red-50" : ""}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">신고 접수</CardTitle>
              <AlertTriangle className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.recentAlerts}</div>
              <p className="text-xs text-gray-500">24시간 이내</p>
            </CardContent>
          </Card>
        </div>

        {/* 심사 대기 제보 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" />심사 대기 제보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingReports.map((report) => (
                <div key={report.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={report.publishType === "EXCLUSIVE" ? "default" : "outline"}>{report.publishType}</Badge>
                    </div>
                    <h3 className="font-medium mb-1">{report.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{report.content}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline" className="text-green-600" onClick={() => handleApprove(report.id)}><CheckCircle className="h-4 w-4 mr-1" />승인</Button>
                    <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleReject(report.id)}><XCircle className="h-4 w-4 mr-1" />반려</Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" asChild><Link href="/admin/reports">전체 보기</Link></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

