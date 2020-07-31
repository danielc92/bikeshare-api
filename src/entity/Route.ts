import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
} from "typeorm";
import { Rider } from "./Rider";

export enum RouteDifficultyEnum {
  HARD = "Hard",
  MEDIUM = "Medium",
  BEGINNER = "Beginner",
}

@Entity()
export class Route {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalDistance: number;

  @Column()
  area: string;

  @Column({
    type: "enum",
    enum: RouteDifficultyEnum,
    default: RouteDifficultyEnum.MEDIUM,
  })
  difficulty: RouteDifficultyEnum;

  @ManyToMany((type) => Rider, (rider) => rider.routes)
  riders: Rider[];

  @UpdateDateColumn()
  modifiedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
