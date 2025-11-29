// 제보로 프로젝트 - 기자 대시보드
// 핵심 규칙: EXCLUSIVE 제보 접근, 48시간 엠바고 표시

"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Clock, Eye, Lock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/components/layout/header";
import { differenceInHours } from "date-fns";
import { CATEGORIES, REGIONS } from "@/lib/constants";

interface Report {
  id: string;
  title: string;
  content: string;
  status: string;
  publishType: "OPEN" | "EXCLUSIVE";
  region?: string;
  category?: string;
  viewCount: number;
  isBoosted: boolean;
  embargoEnds?: string;
  createdAt: string;
  _count: { picks: number };
}

export default function ReporterDashboardPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState({ publishType: "all", region: "all", category: "all" });

  const fetchReports = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ status: "APPROVED" });
      if (filter.publishType !== "all") params.set("publishType", filter.publishType);
      if (filter.region !== "all") params.set("region", filter.region);
      if (filter.category !== "all") params.set("category", filter.category);

      const response = await fetch(`/api/reports?${params}`);
      const data = await response.json();
      if (data.success) setReports(data.data.items);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const getEmbargoStatus = (embargoEnds?: string) => {
    if (!embargoEnds) return null;
    const hoursLeft = differenceInHours(new Date(embargoEnds), new Date());
    if (hoursLeft <= 0) return { text: "엠바고 만료", color: "text-red-600" };
    return { text: `${hoursLeft}시간 남음`, color: hoursLeft <= 12 ? "text-orange-600" : "text-blue-600" };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">제보 피드</h1>
          <p className="text-gray-600">승인된 제보를 확인하고 Pick하세요</p>
        </div>

        {/* 필터 */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Select value={filter.publishType} onValueChange={(v) => setFilter({ ...filter, publishType: v })}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="공개 방식" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="OPEN">OPEN</SelectItem>
              <SelectItem value="EXCLUSIVE">EXCLUSIVE</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filter.region} onValueChange={(v) => setFilter({ ...filter, region: v })}>
            <SelectTrigger className="w-[120px]"><SelectValue placeholder="지역" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              {REGIONS.map((r) => <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filter.category} onValueChange={(v) => setFilter({ ...filter, category: v })}>
            <SelectTrigger className="w-[120px]"><SelectValue placeholder="카테고리" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              {CATEGORIES.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* 제보 목록 */}
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => <Card key={i}><CardContent className="p-6"><Skeleton className="h-32 w-full" /></CardContent></Card>)}
          </div>
        ) : reports.length === 0 ? (
          <Card><CardContent className="p-12 text-center"><p className="text-gray-500">조건에 맞는 제보가 없습니다</p></CardContent></Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => {
              const embargo = getEmbargoStatus(report.embargoEnds);
              return (
                <Card key={report.id} className={`hover:shadow-md transition-shadow ${report.isBoosted ? "ring-2 ring-yellow-400" : ""}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {report.isBoosted && <Badge className="bg-yellow-100 text-yellow-800">⚡ 부스트</Badge>}
                      <Badge variant={report.publishType === "EXCLUSIVE" ? "default" : "outline"}>
                        {report.publishType === "EXCLUSIVE" ? <><Lock className="h-3 w-3 mr-1" />독점</> : <><Globe className="h-3 w-3 mr-1" />공개</>}
                      </Badge>
                      {report.category && <Badge variant="secondary">{CATEGORIES.find(c => c.id === report.category)?.name}</Badge>}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{report.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{report.content}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Eye className="h-4 w-4" />{report.viewCount}</span>
                        <span>{report._count.picks} Pick</span>
                      </div>
                      {embargo && <span className={`flex items-center gap-1 font-medium ${embargo.color}`}><Clock className="h-4 w-4" />{embargo.text}</span>}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button asChild className="flex-1" size="sm"><Link href={`/report/${report.id}`}>상세보기</Link></Button>
                      <Button variant="outline" size="sm">Pick</Button>
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

