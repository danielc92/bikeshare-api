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
  BLUE = "BLUE",
  YELLOW = "YELLOW",
  RED = "RED",
  GREEN = "GREEN",
  NOT_SPECIFIED = "UNKNOWN",
}

export enum BikeForGenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
  NOT_SPECIFIED = "UNKNOWN",
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
    type: "enum",
    enum: BikeForGenderEnum,
    default: BikeForGenderEnum.NOT_SPECIFIED,
  })
  gender: BikeForGenderEnum;

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
