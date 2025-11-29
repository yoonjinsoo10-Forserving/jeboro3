// 제보로 프로젝트 - 이용약관 페이지
// 핵심 규칙: 음성 파일 비저장, 엠바고 규칙 명시

import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">이용약관</h1>
            <p className="text-gray-600">최종 수정일: 2024년 1월 1일</p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="prose prose-gray max-w-none pt-6">
              <h2 className="text-xl font-bold mt-6 mb-4">제1조 (목적)</h2>
              <p className="text-gray-600 mb-4">
                이 약관은 제보로(이하 &quot;회사&quot;)가 제공하는 음성 제보 플랫폼 서비스(이하 &quot;서비스&quot;)의 이용과 관련하여
                회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-4">제2조 (정의)</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>&quot;서비스&quot;란 회사가 제공하는 음성→텍스트 변환 제보 플랫폼을 의미합니다.</li>
                <li>&quot;제보자&quot;란 음성 또는 텍스트로 제보를 작성하는 이용자를 의미합니다.</li>
                <li>&quot;기자&quot;란 인증 절차를 거쳐 제보를 열람하고 기사화하는 이용자를 의미합니다.</li>
                <li>&quot;Pick&quot;이란 기자가 제보를 선택하여 기사화 의사를 표시하는 행위를 의미합니다.</li>
                <li>&quot;엠바고&quot;란 EXCLUSIVE 제보에 대해 48시간 동안 특정 기자에게만 독점 기회를 부여하는 것을 의미합니다.</li>
              </ul>

              <h2 className="text-xl font-bold mt-6 mb-4">제3조 (음성 데이터 처리)</h2>
              <p className="text-gray-600 mb-4">
                <strong>회사는 이용자의 음성 파일을 서버에 저장하지 않습니다.</strong> 음성은 이용자의 브라우저 내 
                Web Speech API를 통해 텍스트로 변환되며, 변환된 텍스트만 서버로 전송됩니다.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-4">제4조 (EXCLUSIVE 제보 및 엠바고)</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>제보자가 EXCLUSIVE를 선택한 제보는 기자가 Pick한 시점부터 48시간 동안 해당 기자에게만 독점 제공됩니다.</li>
                <li>48시간 내 기사화가 완료되지 않으면 해당 제보는 자동으로 OPEN으로 전환됩니다.</li>
                <li>엠바고 기간 중 다른 기자는 해당 제보에 접근할 수 없습니다.</li>
              </ul>

              <h2 className="text-xl font-bold mt-6 mb-4">제5조 (기자 인증)</h2>
              <p className="text-gray-600 mb-4">
                기자로 활동하기 위해서는 기자증 또는 재직증명서를 통한 인증이 필요합니다. 
                인증 문서는 Cloudflare R2에 안전하게 저장되며, 인증 완료 후에도 일정 기간 보관됩니다.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-4">제6조 (금지행위)</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>허위 또는 악의적인 제보 작성</li>
                <li>타인의 명예를 훼손하는 내용의 제보</li>
                <li>저작권을 침해하는 콘텐츠 게시</li>
                <li>기자 인증을 위한 허위 문서 제출</li>
                <li>엠바고 규정을 위반하는 행위</li>
                <li>서비스의 정상적인 운영을 방해하는 행위</li>
              </ul>

              <h2 className="text-xl font-bold mt-6 mb-4">제7조 (서비스 이용 제한)</h2>
              <p className="text-gray-600 mb-4">
                회사는 이용자가 본 약관을 위반하거나 서비스의 정상적인 운영을 방해한 경우, 
                사전 통지 없이 서비스 이용을 제한하거나 계정을 정지할 수 있습니다.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-4">제8조 (면책조항)</h2>
              <p className="text-gray-600 mb-4">
                회사는 제보의 내용에 대한 진실성, 정확성을 보증하지 않습니다. 
                제보 내용에 따른 기사화 및 그로 인한 결과에 대해 회사는 책임을 지지 않습니다.
              </p>

              <h2 className="text-xl font-bold mt-6 mb-4">제9조 (분쟁 해결)</h2>
              <p className="text-gray-600 mb-4">
                본 약관과 관련하여 분쟁이 발생한 경우, 당사자 간 협의로 해결하며, 
                협의가 이루어지지 않을 경우 관할 법원에서 해결합니다.
              </p>

              <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-600">
                  본 약관은 2024년 1월 1일부터 시행됩니다.
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

