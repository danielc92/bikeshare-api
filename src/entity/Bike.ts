import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { Brand } from "./Brand";

export enum BikeColourEnum {
  BLUE = "Blue",
  RED = "Red",
  NOT_SPECIFIED = "Unknown",
}

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
    type: "enum",
    enum: BikeColourEnum,
    default: BikeColourEnum.NOT_SPECIFIED,
  })
  colour: BikeColourEnum;

  @ManyToOne((type) => Brand, (brand) => brand.bikes)
  brand: Brand;

  @UpdateDateColumn()
  modifiedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
