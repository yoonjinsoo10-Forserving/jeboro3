// 제보로 프로젝트 - 결제 API (토스페이먼츠 샌드박스)
// 핵심 규칙: 구독, 부스트, AI 편집 결제 지원

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const TOSS_SECRET_KEY = process.env.TOSS_SECRET_KEY;
const TOSS_API_URL = process.env.TOSS_SANDBOX === "true" 
  ? "https://api.tosspayments.com/v1/payments" 
  : "https://api.tosspayments.com/v1/payments";

// POST /api/payments - 결제 요청
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
    const { type, amount, orderId, paymentKey } = body;

    if (!type || !amount || !orderId || !paymentKey) {
      return NextResponse.json(
        { success: false, error: "필수 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    // 토스페이먼츠 결제 승인 요청
    const tossResponse = await fetch(`${TOSS_API_URL}/confirm`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${TOSS_SECRET_KEY}:`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount,
      }),
    });

    const tossData = await tossResponse.json();

    if (!tossResponse.ok) {
      // 결제 실패 기록
      await prisma.payment.create({
        data: {
          type,
          amount,
          orderId,
          paymentKey,
          status: "FAILED",
          failReason: tossData.message || "결제 승인 실패",
          userId: session.user.id,
        },
      });

      return NextResponse.json(
        { success: false, error: tossData.message || "결제에 실패했습니다." },
        { status: 400 }
      );
    }

    // 결제 성공 기록
    const payment = await prisma.payment.create({
      data: {
        type,
        amount,
        orderId,
        paymentKey,
        status: "COMPLETED",
        receiptUrl: tossData.receipt?.url,
        userId: session.user.id,
      },
    });

    // 결제 유형에 따른 후처리
    if (type === "SUBSCRIPTION") {
      // 구독 생성/갱신
      const planFromAmount = amount >= 59000 ? "PREMIUM" : amount >= 29000 ? "BASIC" : "FREE";
      
      await prisma.subscription.create({
        data: {
          userId: session.user.id,
          plan: planFromAmount,
          status: "ACTIVE",
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30일 후
        },
      });
    } else if (type === "BOOST") {
      // 부스트 활성화는 별도 API에서 처리
    }

    return NextResponse.json({
      success: true,
      data: {
        payment,
        receiptUrl: tossData.receipt?.url,
      },
      message: "결제가 완료되었습니다.",
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      { success: false, error: "결제 처리에 실패했습니다." },
      { status: 500 }
    );
  }
}

// GET /api/payments - 결제 내역 조회
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

    const payments = await prisma.payment.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: payments,
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { success: false, error: "결제 내역을 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}

