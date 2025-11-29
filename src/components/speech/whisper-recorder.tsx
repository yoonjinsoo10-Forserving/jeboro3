// 제보로 프로젝트 - Whisper 음성 녹음 컴포넌트
// 핵심 규칙: 음성 파일 서버 전송 금지, 브라우저에서만 처리

"use client";

import { useEffect } from "react";
import { Mic, MicOff, Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useWhisper } from "@/hooks/useWhisper";

interface WhisperRecorderProps {
  onTranscript?: (text: string) => void;
  className?: string;
}

export function WhisperRecorder({ onTranscript, className }: WhisperRecorderProps) {
  const {
    modelStatus,
    recordingStatus,
    error,
    loadingProgress,
    loadModel,
    startRecording,
    stopRecording,
  } = useWhisper({ onTranscript });

  // 컴포넌트 마운트 시 모델 미리 로드
  useEffect(() => {
    if (modelStatus === "idle") {
      loadModel();
    }
  }, [modelStatus, loadModel]);

  const handleClick = async () => {
    if (recordingStatus === "recording") {
      await stopRecording();
    } else if (recordingStatus === "idle" && modelStatus === "ready") {
      await startRecording();
    }
  };

  const isLoading = modelStatus === "loading";
  const isRecording = recordingStatus === "recording";
  const isProcessing = recordingStatus === "processing";
  const isDisabled = isLoading || isProcessing || modelStatus === "error";

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {/* 모델 로딩 중 프로그레스 바 */}
      {isLoading && (
        <div className="w-full max-w-xs space-y-2">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Download className="h-4 w-4 animate-bounce" />
            <span>음성 인식 모델 로딩 중...</span>
          </div>
          <Progress value={loadingProgress} className="h-2" />
          <p className="text-xs text-center text-gray-500">{loadingProgress}%</p>
        </div>
      )}

      {/* 마이크 버튼 */}
      <Button
        type="button"
        onClick={handleClick}
        disabled={isDisabled}
        className={`rounded-full w-16 h-16 transition-all ${
          isRecording
            ? "bg-red-500 hover:bg-red-600 animate-pulse shadow-lg shadow-red-500/50"
            : isProcessing
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        }`}
      >
        {isLoading ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : isProcessing ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : isRecording ? (
          <MicOff className="h-6 w-6" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </Button>

      {/* 상태 텍스트 */}
      <p className="text-xs text-center text-gray-500">
        {isLoading
          ? "모델을 불러오는 중..."
          : isRecording
          ? "🔴 녹음 중... 버튼을 눌러 중지"
          : isProcessing
          ? "🔄 음성을 텍스트로 변환 중..."
          : modelStatus === "error"
          ? "❌ 모델 로드 실패"
          : "🎤 버튼을 눌러 음성 입력"}
      </p>

      {/* 에러 메시지 */}
      {error && (
        <p className="text-xs text-center text-red-500 max-w-xs">{error}</p>
      )}

      {/* 안내 문구 */}
      <p className="text-xs text-center text-gray-400 max-w-xs">
        🔒 음성은 서버에 전송되지 않습니다. 브라우저에서 직접 처리됩니다.
      </p>
    </div>
  );
}

