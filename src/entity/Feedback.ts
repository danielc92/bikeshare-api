import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Rider } from "./Rider";

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    length: 200,
  })
  content: string;

  @ManyToOne((type) => Rider, (rider) => rider.feedbacks)
  rider: Rider;

  @UpdateDateColumn()
  modifiedAt: Date;

  @UpdateDateColumn()
  createdAt: Date;
}
