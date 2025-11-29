// 제보로 프로젝트 - 파일 업로드 API
// 핵심 규칙: 이미지/문서만 허용, 음성 파일 업로드 금지

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUploadPresignedUrl, generateFileKey, isAllowedImageType } from "@/lib/r2";

// POST /api/upload - 프리사인드 URL 발급
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
    const { filename, contentType, folder = "general" } = body;

    if (!filename || !contentType) {
      return NextResponse.json(
        { success: false, error: "파일명과 타입이 필요합니다." },
        { status: 400 }
      );
    }

    // 음성 파일 업로드 차단 (핵심 규칙)
    if (contentType.startsWith("audio/")) {
      return NextResponse.json(
        { success: false, error: "음성 파일은 업로드할 수 없습니다." },
        { status: 400 }
      );
    }

    // 이미지/문서 타입 확인
    if (!isAllowedImageType(contentType)) {
      return NextResponse.json(
        { success: false, error: "지원하지 않는 파일 형식입니다. (JPEG, PNG, GIF, WebP, PDF만 허용)" },
        { status: 400 }
      );
    }

    // 파일 키 생성
    const key = generateFileKey(folder, filename);

    // 프리사인드 URL 생성 (1시간 유효)
    const uploadUrl = await getUploadPresignedUrl(key, contentType, 3600);

    return NextResponse.json({
      success: true,
      data: {
        uploadUrl,
        key,
        expiresIn: 3600,
      },
    });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json(
      { success: false, error: "업로드 URL 생성에 실패했습니다." },
      { status: 500 }
    );
  }
}

