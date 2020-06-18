import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { Brand } from "./Brand";

@Entity()
export class Bike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isAvailable: boolean;

  @Column({ unique: true })
  modelCode: string;

  @Column({
    enum: ["MALE", "FEMALE"],
  })
  gender: string;

  @Column({
    enum: ["BLUE", "RED", "YELLOW", "PURPLE"],
  })
  colour: string;

  @ManyToOne((type) => Brand, (brand) => brand.bikes)
  brand: Brand;

  @UpdateDateColumn()
  modifiedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
