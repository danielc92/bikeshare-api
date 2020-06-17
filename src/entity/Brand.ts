import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Bike } from "./Bike";

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany((type) => Bike, (bike) => bike.id)
  bikes: Bike[];
}
