import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

enum RouteDifficulty {
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
    enum: RouteDifficulty,
    default: RouteDifficulty.MEDIUM,
  })
  difficulty: RouteDifficulty;

  @UpdateDateColumn()
  modifiedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
