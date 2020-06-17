import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}
