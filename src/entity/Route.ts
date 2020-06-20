import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Route {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalDistance: number;

  @Column()
  area: string;

  @Column()
  difficulty: string;

  @UpdateDateColumn()
  modifiedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
