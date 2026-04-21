import { NextRequest, NextResponse } from "next/server";
import { getAllMaterials, getMaterialsBySubject, createMaterial, uploadFileToStorage } from "@/backend/services/uploadService";
import { extractTokenFromHeader, verifyToken } from "@/lib/jwt";

// GET /api/materials (Optionally filter by ?subject=)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get("subject");

    let materials;
    if (subject) {
      materials = await getMaterialsBySubject(subject);
    } else {
      materials = await getAllMaterials();
    }

    return NextResponse.json({ materials }, { status: 200 });
  } catch (error) {
    console.error("Error fetching materials:", error);
    return NextResponse.json({ error: "Failed to fetch materials" }, { status: 500 });
  }
}

// POST /api/materials
export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate user
    const authHeader = request.headers.get("authorization");
    const token = extractTokenFromHeader(authHeader);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized: Missing token" }, { status: 401 });
    }
    const decodedPayload = verifyToken(token);
    if (!decodedPayload) {
      return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
    }

    // 2. Parse FormData instead of JSON to support file uploads
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const subject = formData.get("subject") as string;
    const description = formData.get("description") as string;
    const branch = formData.get("branch") as string;
    const semester = formData.get("semester") as string;
    const file = formData.get("file") as File;

    if (!title || !subject || !file) {
      return NextResponse.json({ error: "Title, subject, and file are required" }, { status: 400 });
    }

    // 3. Upload file to Supabase Storage
    const { url: file_url, error: storageError } = await uploadFileToStorage(file, "study-materials");
    
    if (storageError || !file_url) {
       return NextResponse.json({ error: `Storage Error: ${storageError || "Unknown error"}` }, { status: 500 });
    }

    // 4. Create material record in Database
    const { data: material, error } = await createMaterial({
      title,
      subject,
      description,
      branch,
      semester,
      file_url,
      uploaded_by: decodedPayload.id,
    });

    if (error || !material) {
      return NextResponse.json({ error: error || "Failed to create material record" }, { status: 400 });
    }

    return NextResponse.json({ message: "Material uploaded successfully", material }, { status: 201 });
  } catch (error) {
    console.error("Error creating material:", error);
    return NextResponse.json({ error: "Failed to upload material" }, { status: 500 });
  }
}
