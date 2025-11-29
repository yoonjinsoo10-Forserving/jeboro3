// 제보로 프로젝트 - better-auth 인증 설정
// 핵심 규칙: 카카오 > 네이버 > 구글 로그인 순서 유지

import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import prisma from './prisma'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  
  // 소셜 로그인 제공자 (카카오 > 네이버 > 구글 순서)
  socialProviders: {
    kakao: {
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    },
    naver: {
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  
  // 세션 설정
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7일
    updateAge: 60 * 60 * 24, // 1일마다 갱신
  },

  // 사용자 정의 필드
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'INFORMANT',
      },
      isAnonymous: {
        type: 'boolean',
        defaultValue: true,
      },
    },
  },
})

export type Session = typeof auth.$Infer.Session

