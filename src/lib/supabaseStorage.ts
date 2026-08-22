import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import path from "node:path";

type StorageConfig = {
  endpoint: string;
  bucket: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
};

function storageConfig(): StorageConfig | null {
  const endpoint = process.env.SUPABASE_URL?.trim();
  const accessKeyId = process.env.SUPABASE_ACCESS_ID?.trim();
  const secretAccessKey = process.env.SUPABASE_ACCESS_SECRET_KEY?.trim();
  if (!endpoint || !accessKeyId || !secretAccessKey) return null;
  return {
    endpoint,
    bucket: process.env.SUPABASE_STORAGE_BUCKET?.trim() || "media",
    region: process.env.SUPABASE_S3_REGION?.trim() || "ap-south-1",
    accessKeyId,
    secretAccessKey,
  };
}

function projectRef(endpoint: string) {
  const match = endpoint.match(/https:\/\/([^.]+)\.storage\.supabase\.co/);
  return match?.[1] ?? null;
}

function publicObjectUrl(endpoint: string, bucket: string, objectPath: string) {
  const ref = projectRef(endpoint);
  if (!ref) return null;
  return `https://${ref}.supabase.co/storage/v1/object/public/${bucket}/${objectPath}`;
}

function s3Client(config: StorageConfig) {
  return new S3Client({
    forcePathStyle: true,
    region: config.region,
    endpoint: config.endpoint,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
}

export function storageBucket() {
  return process.env.SUPABASE_STORAGE_BUCKET?.trim() || "media";
}

export async function uploadProfileFile(username: string, file: File) {
  const config = storageConfig();
  if (!config) return { error: "Supabase storage is not configured" as const };

  const ext =
    path.extname(file.name) ||
    (file.type.startsWith("video/") ? ".mp4" : ".jpg");
  const objectPath = `${username}/${Date.now()}${ext}`;
  const body = Buffer.from(await file.arrayBuffer());

  try {
    await s3Client(config).send(
      new PutObjectCommand({
        Bucket: config.bucket,
        Key: objectPath,
        Body: body,
        ContentType: file.type || "application/octet-stream",
      }),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return { error: message };
  }

  const url = publicObjectUrl(config.endpoint, config.bucket, objectPath);
  if (!url) return { error: "Could not build public URL" as const };
  return { url };
}
