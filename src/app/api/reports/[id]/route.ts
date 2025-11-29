// 제보로 프로젝트 - 개별 제보 API
// 핵심 규칙: 역할 기반 접근 제어

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// GET /api/reports/[id] - 제보 상세 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        picks: {
          include: {
            reporter: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!report) {
      return NextResponse.json(
        { success: false, error: "제보를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 조회수 증가
    await prisma.report.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    // 익명 제보의 경우 작성자 정보 숨김
    const sanitizedReport = {
      ...report,
      author: report.isAnonymous ? null : report.author,
    };

    return NextResponse.json({
      success: true,
      data: sanitizedReport,
    });
  } catch (error) {
    console.error("Error fetching report:", error);
    return NextResponse.json(
      { success: false, error: "제보를 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}

// PUT /api/reports/[id]/status - 제보 상태 변경 (관리자)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    // 관리자 권한 확인
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "관리자 권한이 필요합니다." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { status, rejectReason } = body;

    const report = await prisma.report.update({
      where: { id },
      data: {
        status,
        rejectReason: status === "REJECTED" ? rejectReason : null,
      },
    });

    // 감사 로그 기록
    await prisma.auditLog.create({
      data: {
        action: `REPORT_STATUS_${status}`,
        targetType: "Report",
        targetId: id,
        details: rejectReason || null,
        userId: session.user.id,
        adminId: session.user.id,
      },
    });

    return NextResponse.json({
      success: true,
      data: report,
      message: "제보 상태가 변경되었습니다.",
    });
  } catch (error) {
    console.error("Error updating report status:", error);
    return NextResponse.json(
      { success: false, error: "상태 변경에 실패했습니다." },
      { status: 500 }
    );
  }
}

