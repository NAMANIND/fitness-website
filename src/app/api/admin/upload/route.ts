import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { isValidUsername, normalizeUsername } from "@/lib/profile";
import { uploadProfileFile } from "@/lib/supabaseStorage";

export const runtime = "nodejs";

const MAX_BYTES = 20 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const username = normalizeUsername(String(form.get("username") ?? ""));
  if (!(file instanceof File) || !isValidUsername(username)) {
    return NextResponse.json({ error: "Invalid upload" }, { status: 400 });
  }
  if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large" }, { status: 400 });
  }

  const result = await uploadProfileFile(username, file);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ url: result.url });
}
