// 제보로 프로젝트 - 내 제보 목록 API
// 핵심 규칙: 본인 제보만 조회 가능

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Edge Runtime 설정 (Cloudflare Workers 호환)


// GET /api/reports/my - 내 제보 목록 조회
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where: {
          authorId: session.user.id,
        },
        include: {
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
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.report.count({
        where: { authorId: session.user.id },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        items: reports,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching my reports:", error);
    return NextResponse.json(
      { success: false, error: "제보 목록을 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}

