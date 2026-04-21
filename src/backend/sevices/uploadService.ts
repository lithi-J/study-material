import { getDataSource } from "@/lib/typeorm";
import { Material } from "@/backend/entities/Material";
import { supabase } from "@/lib/supabase";

export interface UploadData {
    title: string;
    subject: string;
    description?: string;
    branch?: string;
    semester?: string;
    file_url: string;
    uploaded_by: string;
}

/**
 * Fetch all study materials, ordered by newest first
 */
export async function getAllMaterials() {
    const dataSource = await getDataSource();
    const materialRepo = dataSource.getRepository(Material);
    return await materialRepo.find({
        order: { createdAt: "DESC" },
        relations: ["uploadedBy"],
    });
}

/**
 * Fetch a specific study material by its ID
 */
export async function getMaterialById(id: string) {
    const dataSource = await getDataSource();
    const materialRepo = dataSource.getRepository(Material);
    return await materialRepo.findOne({
        where: { id },
        relations: ["uploadedBy"],
    });
}

/**
 * Fetch materials filtered by subject
 */
export async function getMaterialsBySubject(subject: string) {
    const dataSource = await getDataSource();
    const materialRepo = dataSource.getRepository(Material);
    return await materialRepo.find({
        where: { subject },
        order: { createdAt: "DESC" },
        relations: ["uploadedBy"],
    });
}

/**
 * Create a new study material entry
 */
export async function createMaterial(data: UploadData) {
    try {
        const dataSource = await getDataSource();
        const materialRepo = dataSource.getRepository(Material);

        const material = materialRepo.create({
            title: data.title,
            subject: data.subject,
            description: data.description,
            branch: data.branch,
            semester: data.semester,
            file_url: data.file_url,
            uploaded_by: data.uploaded_by,
            downloads_count: 0
        });

        const saved = await materialRepo.save(material);
        return { data: saved, error: null };
    } catch (error: any) {
        console.error("Error creating material:", error.message);
        return { data: null, error: error.message };
    }
}

/**
 * Delete a study material by ID
 */
export async function deleteMaterial(id: string) {
    try {
        const dataSource = await getDataSource();
        const materialRepo = dataSource.getRepository(Material);

        await materialRepo.delete(id);
        return { success: true, error: null };
    } catch (error: any) {
        console.error("Error deleting material:", error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Upload a file directly to Supabase Storage
 * Returns the public URL of the uploaded file
 */
export async function uploadFileToStorage(file: File, bucketName: string = "study-materials"): Promise<{ url: string | null, error: string | null }> {
    try {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        // Convert Next.js File to ArrayBuffer for Supabase Node.js upload compatibility
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const { error: uploadError } = await supabase.storage
            .from(bucketName)
            .upload(filePath, buffer, {
                contentType: file.type,
            });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
        return { url: data.publicUrl, error: null };
    } catch (error: any) {
        console.error("Error uploading file to storage:", error.message);
        return { url: null, error: error.message };
    }
}
