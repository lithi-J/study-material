import "dotenv/config";
import { deleteMaterial } from "../src/backend/services/uploadService";
import { getDataSource } from "../src/lib/typeorm";

async function cleanup() {
  const ids = [
    "d7788b44-c336-4bd3-9341-71e345c94718",
    "0f913bc4-f18a-4a89-ac2a-97227db5954d",
    "57d818d6-f397-4114-89ce-a8e84633dc5c"
  ];

  console.log(`Starting cleanup of ${ids.length} notes...`);

  try {
    for (const id of ids) {
      const { success, error } = await deleteMaterial(id);
      if (success) {
        console.log(`✅ Deleted: ${id}`);
      } else {
        console.log(`❌ Failed: ${id} - ${error}`);
      }
    }
  } catch (err: any) {
    console.error("Cleanup error:", err.message);
  } finally {
    const ds = await getDataSource();
    if (ds.isInitialized) {
        await ds.destroy();
    }
    process.exit(0);
  }
}

cleanup();
