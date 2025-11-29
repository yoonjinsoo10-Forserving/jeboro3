# 제보로 (Jeboro) - 음성 제보 플랫폼

> 음성으로 쉽게, 기사로 빠르게

제보로는 소상공인과 개인이 음성으로 쉽게 제보하고, 기자가 이를 검증하여 기사화하는 양면 마켓플레이스입니다.

## 🎯 핵심 규칙

1. **음성 파일 서버 저장 금지** - 음성은 브라우저(Web Speech API)에서만 처리되고, 서버에는 텍스트만 저장됩니다.
2. **소셜 로그인 순서** - 카카오 > 네이버 > 구글 순서 유지
3. **48시간 엠바고** - EXCLUSIVE 제보는 선택한 기자에게 48시간 독점 기회 제공

## 🛠 기술 스택

- **프레임워크**: Next.js 16 (App Router, Turbopack)
- **언어**: TypeScript
- **스타일링**: TailwindCSS, Shadcn/UI
- **데이터베이스**: PostgreSQL + Prisma ORM
- **인증**: better-auth (카카오/네이버/구글 소셜 로그인)
- **스토리지**: Cloudflare R2 (기자 인증 문서)
- **결제**: 토스페이먼츠 (샌드박스 모드)
- **배포**: Cloudflare Pages

## 🚀 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
```bash
cp .env.example .env
```

### 3. 데이터베이스 마이그레이션
```bash
npx prisma generate
npx prisma db push
```

### 4. 개발 서버 실행
```bash
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## 📋 환경 변수

| 변수 | 설명 |
|------|------|
| `DATABASE_URL` | PostgreSQL 연결 문자열 |
| `KAKAO_CLIENT_ID/SECRET` | 카카오 소셜 로그인 |
| `NAVER_CLIENT_ID/SECRET` | 네이버 소셜 로그인 |
| `GOOGLE_CLIENT_ID/SECRET` | 구글 소셜 로그인 |
| `BETTER_AUTH_SECRET` | 인증 시크릿 (32자 이상) |
| `R2_*` | Cloudflare R2 스토리지 |
| `TOSS_*` | 토스페이먼츠 결제 |

## 🔐 역할

| 역할 | 권한 |
|------|------|
| **제보자** | 제보 작성, 본인 제보 조회 |
| **기자** | 피드 열람, Pick, 기사화 |
| **관리자** | 심사, 인증, 평판 관리 |

## 🚢 배포

```bash
npm run build
```

Cloudflare Pages에서 Git 연동 후 자동 배포.

© 2024 제보로. All rights reserved.
