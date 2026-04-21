import { NextRequest, NextResponse } from "next/server";
import { recordDownload } from "@/backend/services/downloadService";
import { extractTokenFromHeader, verifyToken } from "@/lib/jwt";

// POST /api/materials/[id]/download
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Authenticate user (who is downloading)
    const authHeader = request.headers.get("authorization");
    const token = extractTokenFromHeader(authHeader);
    if (!token) return NextResponse.json({ error: "Unauthorized: Missing token" }, { status: 401 });
    
    const decodedPayload = verifyToken(token);
    if (!decodedPayload) return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });

    const { id: materialId } = await params;
    const userId = decodedPayload.id;

    // 2. Record download
    const { success, error } = await recordDownload(materialId, userId);

    if (!success) {
      return NextResponse.json({ error: error || "Failed to record download" }, { status: 400 });
    }

    return NextResponse.json({ message: "Download recorded successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error recording download:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
