// 제보로 프로젝트 - 상수 정의
// 핵심 규칙: 음성 파일 비저장, 엠바고 48시간 준수

// 엠바고 시간 (시간 단위)
export const EMBARGO_HOURS = parseInt(process.env.EMBARGO_HOURS || '48', 10)

// 카테고리 목록
export const CATEGORIES = [
  { id: 'politics', name: '정치', slug: 'politics' },
  { id: 'economy', name: '경제', slug: 'economy' },
  { id: 'society', name: '사회', slug: 'society' },
  { id: 'culture', name: '문화', slug: 'culture' },
  { id: 'sports', name: '스포츠', slug: 'sports' },
  { id: 'tech', name: 'IT/과학', slug: 'tech' },
  { id: 'world', name: '국제', slug: 'world' },
  { id: 'local', name: '지역', slug: 'local' },
  { id: 'entertainment', name: '연예', slug: 'entertainment' },
  { id: 'lifestyle', name: '라이프', slug: 'lifestyle' },
  { id: 'opinion', name: '오피니언', slug: 'opinion' },
  { id: 'other', name: '기타', slug: 'other' },
] as const

// 지역 목록
export const REGIONS = [
  { id: 'seoul', name: '서울', slug: 'seoul' },
  { id: 'busan', name: '부산', slug: 'busan' },
  { id: 'daegu', name: '대구', slug: 'daegu' },
  { id: 'incheon', name: '인천', slug: 'incheon' },
  { id: 'gwangju', name: '광주', slug: 'gwangju' },
  { id: 'daejeon', name: '대전', slug: 'daejeon' },
  { id: 'ulsan', name: '울산', slug: 'ulsan' },
  { id: 'sejong', name: '세종', slug: 'sejong' },
  { id: 'gyeonggi', name: '경기', slug: 'gyeonggi' },
  { id: 'gangwon', name: '강원', slug: 'gangwon' },
  { id: 'chungbuk', name: '충북', slug: 'chungbuk' },
  { id: 'chungnam', name: '충남', slug: 'chungnam' },
  { id: 'jeonbuk', name: '전북', slug: 'jeonbuk' },
  { id: 'jeonnam', name: '전남', slug: 'jeonnam' },
  { id: 'gyeongbuk', name: '경북', slug: 'gyeongbuk' },
  { id: 'gyeongnam', name: '경남', slug: 'gyeongnam' },
  { id: 'jeju', name: '제주', slug: 'jeju' },
  { id: 'nationwide', name: '전국', slug: 'nationwide' },
] as const

// 역할별 권한
export const ROLE_PERMISSIONS = {
  INFORMANT: ['create_report', 'view_own_reports', 'edit_own_reports'],
  REPORTER: ['view_reports', 'pick_reports', 'view_exclusive', 'submit_articles'],
  ADMIN: ['all'],
} as const

// 구독 플랜 기능
export const PLAN_FEATURES = {
  FREE: {
    name: '무료',
    price: 0,
    features: ['OPEN 제보 열람', '기본 피드 접근'],
    canAccessExclusive: false,
  },
  BASIC: {
    name: '기본',
    price: 29000,
    features: ['OPEN 제보 열람', '우선 알림', 'EXCLUSIVE 제안 가능'],
    canAccessExclusive: true,
  },
  PREMIUM: {
    name: '프리미엄',
    price: 59000,
    features: ['모든 기능', 'EXCLUSIVE 우선 접근', 'AI 편집 서비스', '전담 지원'],
    canAccessExclusive: true,
  },
} as const

// 평판 점수 규칙
export const REPUTATION_RULES = {
  ARTICLE_COMPLETED: 10,    // 기사화 완료
  PROPOSAL_IGNORED: -2,     // 제안 무응답 (48시간당)
  REPORT_RECEIVED: -20,     // 신고 접수
  WARNING_ISSUED: -30,      // 경고 발송
  EXCELLENT_RESPONSE: 5,    // 빠른 응답 (24시간 이내)
} as const

// 신고 처리 SLA (시간)
export const REPORT_SLA = {
  NORMAL: 72,     // 일반 신고: 72시간
  HIGH_RISK: 24,  // 고위험 신고: 24시간
} as const

// 파트너 언론사 (50개)
export const PARTNER_PRESS = [
  '경남일보', '경북매일', '광주일보', '국제신문', '대구일보',
  '대전일보', '동양일보', '매일신문', '무등일보', '부산일보',
  '새전북신문', '서울신문', '세계일보', '아시아경제', '울산매일',
  '전남일보', '전북도민일보', '전북일보', '제민일보', '제주일보',
  '중도일보', '중부매일', '중부일보', '청주일보', '충북일보',
  '충청일보', '충청투데이', '한라일보', '강원도민일보', '강원일보',
  '경기일보', '경인일보', '기호일보', '인천일보', '중앙일보',
  '한국일보', '동아일보', '조선일보', '경향신문', '한겨레',
  '머니투데이', '이데일리', '헤럴드경제', '아주경제', '뉴스1',
  '뉴시스', '연합뉴스', '오마이뉴스', '프레시안', '미디어오늘',
] as const

// 부스트 가격 (원)
export const BOOST_PRICE = 5000

// AI 편집 서비스 가격 (원)
export const AI_EDIT_PRICE = 3000

