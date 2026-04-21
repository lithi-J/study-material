import { NextRequest, NextResponse } from "next/server";
import { getUserDownloadHistory } from "@/backend/services/downloadService";
import { extractTokenFromHeader, verifyToken } from "@/lib/jwt";

// GET /api/auth/me/downloads
export async function GET(request: NextRequest) {
  try {
    // 1. Authenticate user
    const authHeader = request.headers.get("authorization");
    const token = extractTokenFromHeader(authHeader);
    if (!token) return NextResponse.json({ error: "Unauthorized: Missing token" }, { status: 401 });
    
    const decodedPayload = verifyToken(token);
    if (!decodedPayload) return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });

    const userId = decodedPayload.id;

    // 2. Get history
    const history = await getUserDownloadHistory(userId);

    return NextResponse.json({ history }, { status: 200 });
  } catch (error) {
    console.error("Error fetching download history:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
