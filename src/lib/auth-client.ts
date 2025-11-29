// 제보로 프로젝트 - 클라이언트 사이드 인증
// 핵심 규칙: 카카오 > 네이버 > 구글 로그인 순서 유지

import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
})

export const { 
  signIn, 
  signOut, 
  signUp, 
  useSession,
  getSession,
} = authClient

