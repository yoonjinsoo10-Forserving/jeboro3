// 제보로 프로젝트 - 푸터 컴포넌트
// 핵심 규칙: 신뢰 배너, 파트너 언론사 노출

import Link from "next/link";
import { Mic, Shield, Clock, Lock } from "lucide-react";
import { PARTNER_PRESS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* 신뢰 배너 */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <Lock className="h-8 w-8 text-blue-400" />
              <h3 className="font-semibold text-white">음성 파일 비저장</h3>
              <p className="text-sm text-gray-400">
                음성은 브라우저에서만 처리되며,<br />서버에 저장되지 않습니다
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Shield className="h-8 w-8 text-green-400" />
              <h3 className="font-semibold text-white">Cloudflare 보안</h3>
              <p className="text-sm text-gray-400">
                글로벌 CDN과 보안 시스템으로<br />안전하게 보호됩니다
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Clock className="h-8 w-8 text-yellow-400" />
              <h3 className="font-semibold text-white">48시간 엠바고</h3>
              <p className="text-sm text-gray-400">
                독점 제보는 48시간 동안<br />선택한 기자에게만 공개됩니다
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 파트너 언론사 */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <h3 className="text-center text-lg font-semibold text-white mb-6">
            50+ 파트너 언론사
          </h3>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-500">
            {PARTNER_PRESS.slice(0, 20).map((press) => (
              <span key={press} className="hover:text-gray-300 transition-colors">
                {press}
              </span>
            ))}
            <span className="text-gray-400">외 30개 언론사</span>
          </div>
        </div>
      </div>

      {/* 메인 푸터 */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 로고 & 설명 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-indigo-600">
                <Mic className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">제보로</span>
            </div>
            <p className="text-sm text-gray-400">
              음성으로 쉽게, 기사로 빠르게.<br />
              소상공인과 개인의 목소리를 세상에 전합니다.
            </p>
          </div>

          {/* 서비스 */}
          <div>
            <h4 className="font-semibold text-white mb-4">서비스</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/report/new" className="hover:text-white transition-colors">제보하기</Link></li>
              <li><Link href="/for-reporters" className="hover:text-white transition-colors">기자 가입</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">요금제</Link></li>
              <li><Link href="/enterprise" className="hover:text-white transition-colors">기업 서비스</Link></li>
            </ul>
          </div>

          {/* 지원 */}
          <div>
            <h4 className="font-semibold text-white mb-4">지원</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="hover:text-white transition-colors">자주 묻는 질문</Link></li>
              <li><Link href="/guide" className="hover:text-white transition-colors">이용 가이드</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">문의하기</Link></li>
              <li><Link href="/report-issue" className="hover:text-white transition-colors">신고하기</Link></li>
            </ul>
          </div>

          {/* 법적 */}
          <div>
            <h4 className="font-semibold text-white mb-4">법적 고지</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="hover:text-white transition-colors">이용약관</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link></li>
              <li><Link href="/defamation" className="hover:text-white transition-colors">명예훼손 정책</Link></li>
            </ul>
          </div>
        </div>

        {/* 저작권 */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© 2024 제보로. All rights reserved.</p>
          <p className="mt-2">
            개인정보보호법을 준수하며, 음성 데이터는 서버에 저장하지 않습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}

