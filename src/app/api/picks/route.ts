// 제보로 프로젝트 - Pick API
// 핵심 규칙: 기자만 Pick 가능, 48시간 엠바고 규칙

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { EMBARGO_HOURS } from "@/lib/constants";

// Edge Runtime 설정 (Cloudflare Workers 호환)
export const runtime = 'edge';

// POST /api/picks - 제보 Pick 하기
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { success: false, error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    // 기자 권한 확인
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { verification: true },
    });

    if (!user || user.role !== "REPORTER") {
      return NextResponse.json(
        { success: false, error: "기자만 Pick할 수 있습니다." },
        { status: 403 }
      );
    }

    // 인증된 기자인지 확인
    if (!user.verification || user.verification.status !== "APPROVED") {
      return NextResponse.json(
        { success: false, error: "인증된 기자만 Pick할 수 있습니다." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { reportId, proposal } = body;

    if (!reportId) {
      return NextResponse.json(
        { success: false, error: "제보 ID가 필요합니다." },
        { status: 400 }
      );
    }

    // 제보 존재 확인
    const report = await prisma.report.findUnique({
      where: { id: reportId },
    });

    if (!report) {
      return NextResponse.json(
        { success: false, error: "제보를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 승인된 제보인지 확인
    if (report.status !== "APPROVED") {
      return NextResponse.json(
        { success: false, error: "승인된 제보만 Pick할 수 있습니다." },
        { status: 400 }
      );
    }

    // 이미 Pick 했는지 확인
    const existingPick = await prisma.pick.findUnique({
      where: {
        reporterId_reportId: {
          reporterId: session.user.id,
          reportId,
        },
      },
    });

    if (existingPick) {
      return NextResponse.json(
        { success: false, error: "이미 Pick한 제보입니다." },
        { status: 400 }
      );
    }

    // Pick 생성
    const pick = await prisma.pick.create({
      data: {
        reporterId: session.user.id,
        reportId,
        proposal,
      },
    });

    // EXCLUSIVE 제보인 경우 엠바고 시작
    if (report.publishType === "EXCLUSIVE" && !report.embargoEnds) {
      await prisma.report.update({
        where: { id: reportId },
        data: {
          embargoEnds: new Date(Date.now() + EMBARGO_HOURS * 60 * 60 * 1000),
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: pick,
      message: "Pick이 완료되었습니다.",
    });
  } catch (error) {
    console.error("Error creating pick:", error);
    return NextResponse.json(
      { success: false, error: "Pick에 실패했습니다." },
      { status: 500 }
    );
  }
}

// GET /api/picks - 내 Pick 목록 조회
export async function GET(_request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { success: false, error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const picks = await prisma.pick.findMany({
      where: { reporterId: session.user.id },
      include: {
        report: {
          include: {
            author: {
              select: { id: true, name: true, image: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: picks,
    });
  } catch (error) {
    console.error("Error fetching picks:", error);
    return NextResponse.json(
      { success: false, error: "Pick 목록을 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}

