import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { Rider } from "./Rider";

@Entity()
export class Pack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  packName: string;

  @ManyToOne((type) => Rider, (rider) => rider.myPacks)
  rider: Rider;

  @ManyToMany((type) => Rider, (rider) => rider.packs)
  riders: Rider[];

  @UpdateDateColumn()
  modifiedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
