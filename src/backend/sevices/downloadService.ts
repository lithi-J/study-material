import { getDataSource } from "@/lib/typeorm";
import { DownloadHistory } from "@/backend/entities/DownloadHistory";
import { Material } from "@/backend/entities/Material";

/**
 * Record a download action in the database
 * This creates a log in the 'download_history' table and increments the counter on the material
 */
export async function recordDownload(materialId: string, userId: string) {
  try {
    const dataSource = await getDataSource();
    const historyRepo = dataSource.getRepository(DownloadHistory);
    const materialRepo = dataSource.getRepository(Material);

    // Run within a transaction for safety
    await dataSource.transaction(async (transactionalEntityManager) => {
      // 1. Log the history
      const history = historyRepo.create({
        material_id: materialId,
        user_id: userId,
      });
      await transactionalEntityManager.save(history);

      // 2. Increment download count securely
      await transactionalEntityManager.increment(Material, { id: materialId }, "downloads_count", 1);
    });

    return { success: true, error: null };
  } catch (error: any) {
    console.error("Error recording download:", error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Get popular materials based on download count
 */
export async function getPopularMaterials(limit: number = 5) {
  try {
    const dataSource = await getDataSource();
    const materialRepo = dataSource.getRepository(Material);
    
    return await materialRepo.find({
      order: { downloads_count: "DESC" },
      take: limit,
      relations: ["uploadedBy"],
    });
  } catch (error) {
    console.error("Error fetching popular materials:", error);
    throw error;
  }
}

/**
 * Get the download history for a specific user
 */
export async function getUserDownloadHistory(userId: string) {
  try {
    const dataSource = await getDataSource();
    const historyRepo = dataSource.getRepository(DownloadHistory);
    
    return await historyRepo.find({
      where: { user_id: userId },
      order: { downloadedAt: "DESC" },
      relations: ["material"], // Join the material info
    });
  } catch (error) {
    console.error("Error fetching user download history:", error);
    throw error;
  }
}
