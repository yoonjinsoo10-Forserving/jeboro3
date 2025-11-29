// 제보로 프로젝트 - 제보 API
// 핵심 규칙: 음성 파일 비저장, 텍스트만 처리

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Edge Runtime 설정 (Cloudflare Workers 호환)


// GET /api/reports - 제보 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const publishType = searchParams.get("publishType");
    const region = searchParams.get("region");
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where: Record<string, unknown> = {};
    
    if (status) where.status = status;
    if (publishType) where.publishType = publishType;
    if (region) where.region = region;
    if (category) where.category = category;

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          _count: {
            select: { picks: true },
          },
        },
        orderBy: [
          { isBoosted: "desc" },
          { createdAt: "desc" },
        ],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.report.count({ where }),
    ]);

    // 익명 제보의 경우 작성자 정보 숨김
    const sanitizedReports = reports.map((report) => ({
      ...report,
      author: report.isAnonymous ? null : report.author,
    }));

    return NextResponse.json({
      success: true,
      data: {
        items: sanitizedReports,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json(
      { success: false, error: "제보 목록을 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}

// POST /api/reports - 새 제보 작성
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
    const { title, content, category, region, publishType, isAnonymous } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: "제목과 내용은 필수입니다." },
        { status: 400 }
      );
    }

    const report = await prisma.report.create({
      data: {
        title,
        content, // 텍스트만 저장 (음성 파일 비저장 원칙)
        category,
        region,
        publishType: publishType || "OPEN",
        isAnonymous: isAnonymous ?? true,
        authorId: session.user.id,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      data: report,
      message: "제보가 성공적으로 제출되었습니다.",
    });
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json(
      { success: false, error: "제보 제출에 실패했습니다." },
      { status: 500 }
    );
  }
}

