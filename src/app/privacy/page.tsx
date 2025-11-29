// 제보로 프로젝트 - 개인정보처리방침 페이지
// 핵심 규칙: 음성 파일 비저장, 개인정보보호법 준수

import { Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">개인정보처리방침</h1>
            <p className="text-gray-600">최종 수정일: 2024년 1월 1일</p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="prose prose-gray max-w-none pt-6">
              <h2 className="text-xl font-bold mt-6 mb-4">1. 개인정보의 수집 항목</h2>
              <p className="text-gray-600 mb-2">제보로는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li><strong>필수 항목:</strong> 이메일 주소, 소셜 로그인 식별자(카카오/네이버/구글)</li>
                <li><strong>선택 항목:</strong> 이름, 프로필 사진</li>
                <li><strong>기자 인증 시:</strong> 기자증 또는 재직증명서 이미지</li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
                <h3 className="font-bold text-blue-800 mb-2">🔒 음성 데이터 비저장 원칙</h3>
                <p className="text-blue-700 text-sm">
                  <strong>제보로는 음성 파일을 서버에 저장하지 않습니다.</strong><br />
                  음성은 사용자의 브라우저 내 Web Speech API를 통해 텍스트로 변환되며, 
                  변환된 텍스트만 서버로 전송됩니다. 음성 원본 파일은 어떠한 형태로도 수집, 저장, 전송되지 않습니다.
                </p>
              </div>

              <h2 className="text-xl font-bold mt-6 mb-4">2. 개인정보의 수집 방법</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li>소셜 로그인(카카오, 네이버, 구글)을 통한 회원가입</li>
                <li>기자 인증을 위한 문서 업로드</li>
                <li>서비스 이용 과정에서 자동 생성되는 정보(접속 로그, 쿠키 등)</li>
              </ul>

              <h2 className="text-xl font-bold mt-6 mb-4">3. 개인정보의 이용 목적</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li>회원 식별 및 서비스 제공</li>
                <li>제보 작성 및 관리</li>
                <li>기자 인증 및 권한 부여</li>
                <li>고객 문의 응대</li>
                <li>서비스 개선 및 통계 분석</li>
              </ul>

              <h2 className="text-xl font-bold mt-6 mb-4">4. 개인정보의 보유 및 이용 기간</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li>회원 정보: 회원 탈퇴 시까지</li>
                <li>기자 인증 문서: 인증 완료 후 1년</li>
                <li>제보 내용: 제보 삭제 요청 시까지</li>
                <li>결제 기록: 관련 법령에 따라 5년</li>
              </ul>

              <h2 className="text-xl font-bold mt-6 mb-4">5. 개인정보의 제3자 제공</h2>
              <p className="text-gray-600 mb-4">
                제보로는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 
                다만, 법령에 의해 요구되는 경우는 예외로 합니다.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-4">6. 개인정보의 위탁</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li>Cloudflare: 웹 호스팅 및 CDN 서비스</li>
                <li>Cloudflare R2: 파일 저장 서비스</li>
                <li>토스페이먼츠: 결제 처리</li>
              </ul>

              <h2 className="text-xl font-bold mt-6 mb-4">7. 이용자의 권리</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                <li>개인정보 열람 요청</li>
                <li>개인정보 정정 요청</li>
                <li>개인정보 삭제 요청</li>
                <li>개인정보 처리 정지 요청</li>
              </ul>

              <h2 className="text-xl font-bold mt-6 mb-4">8. 개인정보보호 책임자</h2>
              <p className="text-gray-600 mb-4">
                이름: 개인정보보호 담당자<br />
                이메일: privacy@jeboro.com
              </p>

              <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-600">
                  본 개인정보처리방침은 2024년 1월 1일부터 시행됩니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

