import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { User } from "./User";
import { Material } from "./Material";

@Entity("download_history")
export class DownloadHistory {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column()
  user_id!: string;

  @ManyToOne(() => Material, { onDelete: "CASCADE" })
  @JoinColumn({ name: "material_id" })
  material!: Material;

  @Column()
  material_id!: string;

  @CreateDateColumn()
  downloadedAt!: Date;
}
