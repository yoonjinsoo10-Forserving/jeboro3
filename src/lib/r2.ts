// 제보로 프로젝트 - Cloudflare R2 연동
// 핵심 규칙: 기자 인증 문서 등 이미지만 저장 (음성 파일 저장 금지)

import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// R2 클라이언트 설정
const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || "jeboro-uploads";
const PUBLIC_URL = process.env.R2_PUBLIC_URL;

/**
 * 파일 업로드
 * @param file - 업로드할 파일 Buffer
 * @param key - 저장될 파일 경로/이름
 * @param contentType - MIME 타입
 * @returns 업로드된 파일의 URL
 */
export async function uploadFile(
  file: Buffer,
  key: string,
  contentType: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: contentType,
  });

  await r2Client.send(command);

  // 공개 URL 반환
  if (PUBLIC_URL) {
    return `${PUBLIC_URL}/${key}`;
  }

  return key;
}

/**
 * 파일 삭제
 * @param key - 삭제할 파일 경로/이름
 */
export async function deleteFile(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  await r2Client.send(command);
}

/**
 * 프리사인드 URL 생성 (업로드용)
 * @param key - 파일 경로/이름
 * @param contentType - MIME 타입
 * @param expiresIn - URL 만료 시간 (초)
 * @returns 프리사인드 업로드 URL
 */
export async function getUploadPresignedUrl(
  key: string,
  contentType: string,
  expiresIn: number = 3600
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  return getSignedUrl(r2Client, command, { expiresIn });
}

/**
 * 프리사인드 URL 생성 (다운로드용)
 * @param key - 파일 경로/이름
 * @param expiresIn - URL 만료 시간 (초)
 * @returns 프리사인드 다운로드 URL
 */
export async function getDownloadPresignedUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  return getSignedUrl(r2Client, command, { expiresIn });
}

/**
 * 파일 키 생성 (유니크한 파일명)
 * @param folder - 폴더 경로
 * @param originalName - 원본 파일명
 * @returns 유니크한 파일 키
 */
export function generateFileKey(folder: string, originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split(".").pop();
  return `${folder}/${timestamp}-${randomString}.${extension}`;
}

/**
 * 허용된 이미지 타입인지 확인
 * @param contentType - MIME 타입
 * @returns 허용 여부
 */
export function isAllowedImageType(contentType: string): boolean {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "application/pdf"];
  return allowedTypes.includes(contentType);
}

