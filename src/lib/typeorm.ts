import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "@/backend/entities/User";
import { Material } from "@/backend/entities/Material";
import { DownloadHistory } from "@/backend/entities/DownloadHistory";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_DATABASE || "postgres",
  ssl: {
    rejectUnauthorized: false, // Required for Supabase external connections
  },
  synchronize: process.env.NODE_ENV !== "production", // Auto-create tables in dev. In production, use migrations!
  logging: process.env.NODE_ENV !== "production",
  entities: [User, Material, DownloadHistory],
  subscribers: [],
  migrations: [],
});

// Helper to ensure connection is initialized, especially useful in Serverless/Next.js environments
export async function getDataSource() {
  if (AppDataSource.isInitialized) {
    return AppDataSource;
  }
  await AppDataSource.initialize();
  return AppDataSource;
}
