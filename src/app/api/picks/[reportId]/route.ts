// 제보로 프로젝트 - Pick 삭제/완료 API
// 핵심 규칙: 본인 Pick만 삭제 가능, 기사화 완료 처리

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { REPUTATION_RULES } from "@/lib/constants";

// Edge Runtime 설정 (Cloudflare Workers 호환)
export const runtime = 'edge';

// DELETE /api/picks/[reportId] - Pick 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ reportId: string }> }
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

    const { reportId } = await params;

    const pick = await prisma.pick.findUnique({
      where: {
        reporterId_reportId: {
          reporterId: session.user.id,
          reportId,
        },
      },
    });

    if (!pick) {
      return NextResponse.json(
        { success: false, error: "Pick을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    await prisma.pick.delete({
      where: { id: pick.id },
    });

    return NextResponse.json({
      success: true,
      message: "Pick이 취소되었습니다.",
    });
  } catch (error) {
    console.error("Error deleting pick:", error);
    return NextResponse.json(
      { success: false, error: "Pick 취소에 실패했습니다." },
      { status: 500 }
    );
  }
}

// PUT /api/picks/[reportId] - Pick 상태 업데이트 (기사화 완료 등)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ reportId: string }> }
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

    const { reportId } = await params;
    const body = await request.json();
    const { isCompleted, articleUrl } = body;

    const pick = await prisma.pick.findUnique({
      where: {
        reporterId_reportId: {
          reporterId: session.user.id,
          reportId,
        },
      },
    });

    if (!pick) {
      return NextResponse.json(
        { success: false, error: "Pick을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // Pick 업데이트
    const updatedPick = await prisma.pick.update({
      where: { id: pick.id },
      data: {
        isCompleted,
        articleUrl,
      },
    });

    // 기사화 완료 시 평판 점수 증가
    if (isCompleted) {
      await prisma.reputation.upsert({
        where: { userId: session.user.id },
        update: {
          score: { increment: REPUTATION_RULES.ARTICLE_COMPLETED },
          articlesCount: { increment: 1 },
          lastActiveAt: new Date(),
        },
        create: {
          userId: session.user.id,
          score: REPUTATION_RULES.ARTICLE_COMPLETED,
          articlesCount: 1,
          lastActiveAt: new Date(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: updatedPick,
      message: isCompleted ? "기사화 완료가 등록되었습니다." : "Pick이 업데이트되었습니다.",
    });
  } catch (error) {
    console.error("Error updating pick:", error);
    return NextResponse.json(
      { success: false, error: "Pick 업데이트에 실패했습니다." },
      { status: 500 }
    );
  }
}

