// 제보로 프로젝트 - 타입 정의
// 핵심 규칙: 음성 파일 비저장, 엠바고 48시간 준수

// 사용자 역할
export type Role = 'INFORMANT' | 'REPORTER' | 'ADMIN'

// 제보 상태
export type Status = 'PENDING' | 'APPROVED' | 'REJECTED'

// 제보 공개 유형
export type PublishType = 'OPEN' | 'EXCLUSIVE'

// 소셜 로그인 제공자
export type AuthProvider = 'KAKAO' | 'NAVER' | 'GOOGLE'

// 인증 상태
export type VerifyStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

// 구독 상태
export type SubscriptionStatus = 'ACTIVE' | 'CANCELLED' | 'EXPIRED'

// 구독 플랜
export type SubscriptionPlan = 'FREE' | 'BASIC' | 'PREMIUM'

// 결제 상태
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'

// 결제 유형
export type PaymentType = 'SUBSCRIPTION' | 'BOOST' | 'AI_EDIT'

// 사용자 인터페이스
export interface User {
  id: string
  email: string
  name?: string
  image?: string
  role: Role
  provider: AuthProvider
  isAnonymous: boolean
  createdAt: Date
  updatedAt: Date
}

// 제보 인터페이스
export interface Report {
  id: string
  title: string
  content: string
  publishType: PublishType
  status: Status
  region?: string
  category?: string
  isAnonymous: boolean
  isBoosted: boolean
  viewCount: number
  embargoEnds?: Date
  rejectReason?: string
  authorId: string
  author?: User
  picks?: Pick[]
  createdAt: Date
  updatedAt: Date
}

// Pick 인터페이스 (기자가 제보 선택)
export interface Pick {
  id: string
  proposal?: string
  isAccepted: boolean
  isCompleted: boolean
  articleUrl?: string
  reporterId: string
  reporter?: User
  reportId: string
  report?: Report
  createdAt: Date
  updatedAt: Date
}

// 기자 인증 인터페이스
export interface Verification {
  id: string
  status: VerifyStatus
  docs?: string
  comment?: string
  userId: string
  user?: User
  createdAt: Date
  updatedAt: Date
}

// 평판 인터페이스
export interface Reputation {
  id: string
  score: number
  articlesCount: number
  acceptanceRate: number
  responseTime: number
  warningCount: number
  isBanned: boolean
  lastActiveAt?: Date
  userId: string
  user?: User
  updatedAt: Date
}

// 구독 인터페이스
export interface Subscription {
  id: string
  plan: SubscriptionPlan
  status: SubscriptionStatus
  startDate: Date
  endDate?: Date
  promoCode?: string
  userId: string
  user?: User
  createdAt: Date
  updatedAt: Date
}

// 결제 인터페이스
export interface Payment {
  id: string
  type: PaymentType
  amount: number
  status: PaymentStatus
  orderId: string
  paymentKey?: string
  receiptUrl?: string
  failReason?: string
  userId: string
  user?: User
  createdAt: Date
  updatedAt: Date
}

// API 응답 타입
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// 페이지네이션 응답
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// 제보 필터
export interface ReportFilter {
  status?: Status
  publishType?: PublishType
  region?: string
  category?: string
  search?: string
  page?: number
  limit?: number
}

