// 제보로 프로젝트 - Whisper 음성 인식 훅
// 핵심 규칙: 음성 파일 서버 전송 금지, 브라우저에서만 처리
// Transformers.js + Whisper Tiny 모델 사용

"use client";

import { useState, useRef, useCallback, useEffect } from "react";

// Whisper 모델 상태
type ModelStatus = "idle" | "loading" | "ready" | "error";
type RecordingStatus = "idle" | "recording" | "processing";

interface UseWhisperOptions {
  language?: string;
  onTranscript?: (text: string) => void;
}

interface UseWhisperReturn {
  // 상태
  modelStatus: ModelStatus;
  recordingStatus: RecordingStatus;
  transcript: string;
  error: string | null;
  loadingProgress: number;
  
  // 액션
  loadModel: () => Promise<void>;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  resetTranscript: () => void;
}

// 전역 모델 캐시 (페이지 전환 시에도 유지)
let cachedPipeline: unknown = null;
let isModelLoading = false;

export function useWhisper(options: UseWhisperOptions = {}): UseWhisperReturn {
  const { language = "korean", onTranscript } = options;

  const [modelStatus, setModelStatus] = useState<ModelStatus>(
    cachedPipeline ? "ready" : "idle"
  );
  const [recordingStatus, setRecordingStatus] = useState<RecordingStatus>("idle");
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const pipelineRef = useRef<unknown>(cachedPipeline);
  const streamRef = useRef<MediaStream | null>(null);

  // 모델 로드
  const loadModel = useCallback(async () => {
    if (pipelineRef.current || isModelLoading) {
      setModelStatus("ready");
      return;
    }

    try {
      isModelLoading = true;
      setModelStatus("loading");
      setError(null);
      setLoadingProgress(0);

      // 동적 import로 Transformers.js 로드
      const { pipeline } = await import("@huggingface/transformers");

      // Whisper Tiny 모델 로드 (가장 작고 빠름)
      const transcriber = await pipeline(
        "automatic-speech-recognition",
        "onnx-community/whisper-tiny",
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          progress_callback: (progress: any) => {
            if (progress && typeof progress.progress === "number") {
              setLoadingProgress(Math.round(progress.progress));
            }
          },
        }
      );

      pipelineRef.current = transcriber;
      cachedPipeline = transcriber;
      setModelStatus("ready");
      setLoadingProgress(100);
    } catch (err) {
      console.error("Whisper 모델 로드 실패:", err);
      setError("음성 인식 모델을 불러오지 못했습니다. 네트워크를 확인해주세요.");
      setModelStatus("error");
    } finally {
      isModelLoading = false;
    }
  }, []);

  // 녹음 시작
  const startRecording = useCallback(async () => {
    if (recordingStatus !== "idle") return;

    // 모델이 로드되지 않았으면 먼저 로드
    if (!pipelineRef.current) {
      await loadModel();
      if (!pipelineRef.current) return;
    }

    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : "audio/mp4",
      });

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        setRecordingStatus("processing");
        
        try {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          const arrayBuffer = await audioBlob.arrayBuffer();
          
          // Whisper로 음성 인식
          const transcriber = pipelineRef.current as (
            input: ArrayBuffer,
            options?: { language?: string; task?: string }
          ) => Promise<{ text: string }>;
          
          const result = await transcriber(arrayBuffer, {
            language,
            task: "transcribe",
          });

          const text = result.text.trim();
          if (text) {
            setTranscript((prev) => prev + (prev ? " " : "") + text);
            onTranscript?.(text);
          }
        } catch (err) {
          console.error("음성 인식 실패:", err);
          setError("음성 인식에 실패했습니다. 다시 시도해주세요.");
        } finally {
          setRecordingStatus("idle");
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setRecordingStatus("recording");
    } catch (err) {
      console.error("마이크 접근 실패:", err);
      setError("마이크 권한이 필요합니다. 브라우저 설정에서 허용해주세요.");
      setRecordingStatus("idle");
    }
  }, [recordingStatus, loadModel, language, onTranscript]);

  // 녹음 중지
  const stopRecording = useCallback(async () => {
    if (mediaRecorderRef.current && recordingStatus === "recording") {
      mediaRecorderRef.current.stop();
      
      // 스트림 정리
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    }
  }, [recordingStatus]);

  // 텍스트 초기화
  const resetTranscript = useCallback(() => {
    setTranscript("");
    setError(null);
  }, []);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return {
    modelStatus,
    recordingStatus,
    transcript,
    error,
    loadingProgress,
    loadModel,
    startRecording,
    stopRecording,
    resetTranscript,
  };
}

