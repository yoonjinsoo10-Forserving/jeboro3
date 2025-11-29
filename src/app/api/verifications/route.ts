// 제보로 프로젝트 - 기자 인증 API
// 핵심 규칙: 인증 요청/조회, 관리자 승인/반려

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Edge Runtime 설정 (Cloudflare Workers 호환)
export const runtime = 'edge'

// GET /api/verifications - 인증 요청 목록 조회 (관리자)
export async function GET() {
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

    const verifications = await prisma.verification.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: verifications,
    });
  } catch (error) {
    console.error("Error fetching verifications:", error);
    return NextResponse.json(
      { success: false, error: "인증 목록을 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}

// POST /api/verifications - 인증 요청 제출 (기자)
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

    const body = await request.json();
    const { docs } = body;

    // 기존 인증 요청 확인
    const existing = await prisma.verification.findUnique({
      where: { userId: session.user.id },
    });

    if (existing) {
      if (existing.status === "PENDING") {
        return NextResponse.json(
          { success: false, error: "이미 심사 중인 인증 요청이 있습니다." },
          { status: 400 }
        );
      }
      if (existing.status === "APPROVED") {
        return NextResponse.json(
          { success: false, error: "이미 인증된 기자입니다." },
          { status: 400 }
        );
      }
    }

    // 인증 요청 생성/업데이트
    const verification = await prisma.verification.upsert({
      where: { userId: session.user.id },
      update: {
        docs,
        status: "PENDING",
        comment: null,
      },
      create: {
        userId: session.user.id,
        docs,
        status: "PENDING",
      },
    });

    // 역할을 REPORTER로 변경 (인증 완료 전이라도)
    await prisma.user.update({
      where: { id: session.user.id },
      data: { role: "REPORTER" },
    });

    return NextResponse.json({
      success: true,
      data: verification,
      message: "인증 요청이 제출되었습니다. 심사 후 결과를 안내드립니다.",
    });
  } catch (error) {
    console.error("Error creating verification:", error);
    return NextResponse.json(
      { success: false, error: "인증 요청 제출에 실패했습니다." },
      { status: 500 }
    );
  }
}

