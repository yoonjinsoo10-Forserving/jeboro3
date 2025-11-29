// 제보로 프로젝트 - 인증 API 라우트
// 핵심 규칙: 카카오 > 네이버 > 구글 소셜 로그인 지원

import { auth } from '@/lib/auth'
import { toNextJsHandler } from 'better-auth/next-js'

export const { GET, POST } = toNextJsHandler(auth)

