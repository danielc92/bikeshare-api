import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Brand } from "./Brand";

@Entity()
export class Bike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isAvailable: boolean;

  @Column()
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
}
