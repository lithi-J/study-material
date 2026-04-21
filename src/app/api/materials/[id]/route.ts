import { NextRequest, NextResponse } from "next/server";
import { getMaterialById, deleteMaterial } from "@/backend/sevices/uploadService";
import { extractTokenFromHeader, verifyToken } from "@/lib/jwt";

// GET /api/materials/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const material = await getMaterialById(id);

    if (!material) {
      return NextResponse.json({ error: "Material not found" }, { status: 404 });
    }

    return NextResponse.json({ material }, { status: 200 });
  } catch (error) {
    console.error("Error fetching material:", error);
    return NextResponse.json({ error: "Failed to fetch material" }, { status: 500 });
  }
}

// DELETE /api/materials/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Authenticate user
    const authHeader = request.headers.get("authorization");
    const token = extractTokenFromHeader(authHeader);
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const decodedPayload = verifyToken(token);
    if (!decodedPayload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    // Validate UUID format to prevent DB errors
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return NextResponse.json({ error: "Invalid ID format. Please use a valid UUID from the materials list." }, { status: 400 });
    }

    // 2. Check if material exists and user owns it
    const material = await getMaterialById(id);
    if (!material) {
      return NextResponse.json({ error: "Material not found" }, { status: 404 });
    }

    // Ensure the user trying to delete is the uploader
    if (material.uploaded_by !== decodedPayload.id) {
      return NextResponse.json({ error: "Forbidden: You can only delete your own materials" }, { status: 403 });
    }

    // 3. Delete material
    const { success, error } = await deleteMaterial(id);
    if (!success) {
      return NextResponse.json({ error: error || "Failed to delete material" }, { status: 400 });
    }

    return NextResponse.json({ message: "Material deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting material:", error);
    return NextResponse.json({ error: "Failed to delete material" }, { status: 500 });
  }
}
