// 제보로 프로젝트 - Web Speech API 데모 컴포넌트
// 핵심 규칙: 음성 파일 서버 전송 금지, 브라우저에서만 처리

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Mic, MicOff, RotateCcw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

export function SpeechDemo() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Web Speech API 지원 확인
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setIsSupported(false);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "ko-KR";

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimText = "";
        let finalText = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalText += result[0].transcript;
          } else {
            interimText += result[0].transcript;
          }
        }

        if (finalText) {
          setTranscript((prev) => prev + finalText);
        }
        setInterimTranscript(interimText);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === "not-allowed") {
          setError("마이크 권한이 필요합니다. 브라우저 설정에서 허용해주세요.");
        } else if (event.error === "no-speech") {
          setError("음성이 감지되지 않았습니다. 다시 시도해주세요.");
        } else {
          setError(`오류가 발생했습니다: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        if (isListening) {
          recognition.start();
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;

    setError(null);

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setInterimTranscript("");
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Failed to start recognition:", err);
        setError("음성 인식을 시작할 수 없습니다.");
      }
    }
  }, [isListening]);

  const resetTranscript = () => {
    setTranscript("");
    setInterimTranscript("");
    setError(null);
  };

  if (!isSupported) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              이 브라우저는 음성 인식을 지원하지 않습니다.
              Chrome, Edge, Safari 최신 버전을 사용해주세요.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-2 border-dashed border-gray-200">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Mic className="h-5 w-5 text-blue-600" />
          음성→텍스트 데모
          <Badge variant="secondary" className="ml-2">
            브라우저 전용
          </Badge>
        </CardTitle>
        <p className="text-sm text-gray-500 mt-2">
          🔒 음성은 서버에 전송되지 않습니다. 브라우저에서만 처리됩니다.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* 텍스트 표시 영역 */}
        <div className="min-h-[150px] p-4 bg-gray-50 rounded-lg border">
          {transcript || interimTranscript ? (
            <p className="text-gray-900 whitespace-pre-wrap">
              {transcript}
              <span className="text-gray-400">{interimTranscript}</span>
            </p>
          ) : (
            <p className="text-gray-400 text-center">
              마이크 버튼을 눌러 음성 인식을 시작하세요
            </p>
          )}
        </div>
        {/* 컨트롤 버튼 */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={toggleListening}
            size="lg"
            className={`rounded-full w-16 h-16 ${
              isListening
                ? "bg-red-500 hover:bg-red-600 animate-pulse"
                : "bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            }`}
          >
            {isListening ? (
              <MicOff className="h-6 w-6" />
            ) : (
              <Mic className="h-6 w-6" />
            )}
          </Button>
          <Button
            onClick={resetTranscript}
            variant="outline"
            size="lg"
            className="rounded-full w-16 h-16"
            disabled={!transcript && !interimTranscript}
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>

        <p className="text-xs text-center text-gray-400">
          {isListening ? "듣고 있습니다..." : "마이크 버튼을 눌러 시작하세요"}
        </p>
      </CardContent>
    </Card>
  );
}

