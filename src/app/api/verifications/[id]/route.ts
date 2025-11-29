// 제보로 프로젝트 - 기자 인증 승인/반려 API
// 핵심 규칙: 관리자만 승인/반려 가능, 감사 로그 기록

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Edge Runtime 설정 (Cloudflare Workers 호환)
export const runtime = 'edge';

// PUT /api/verifications/[id] - 인증 승인/반려
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
    const admin = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!admin || admin.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "관리자 권한이 필요합니다." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { status, comment } = body;

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json(
        { success: false, error: "유효하지 않은 상태입니다." },
        { status: 400 }
      );
    }

    const verification = await prisma.verification.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!verification) {
      return NextResponse.json(
        { success: false, error: "인증 요청을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 인증 상태 업데이트
    const updated = await prisma.verification.update({
      where: { id },
      data: {
        status,
        comment,
      },
    });

    // 승인 시 기자 역할 확정
    if (status === "APPROVED") {
      await prisma.user.update({
        where: { id: verification.userId },
        data: { role: "REPORTER" },
      });

      // 기본 평판 생성
      await prisma.reputation.upsert({
        where: { userId: verification.userId },
        update: {},
        create: {
          userId: verification.userId,
          score: 0,
        },
      });
    }

    // 감사 로그 기록
    await prisma.auditLog.create({
      data: {
        action: `VERIFICATION_${status}`,
        targetType: "Verification",
        targetId: id,
        details: comment || null,
        userId: verification.userId,
        adminId: session.user.id,
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
      message: status === "APPROVED" 
        ? "기자 인증이 승인되었습니다." 
        : "기자 인증이 반려되었습니다.",
    });
  } catch (error) {
    console.error("Error updating verification:", error);
    return NextResponse.json(
      { success: false, error: "인증 상태 변경에 실패했습니다." },
      { status: 500 }
    );
  }
}

