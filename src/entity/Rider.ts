import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Route } from "./Route";
import { Feedback } from "./Feedback";

@Entity()
export class Rider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  city: string;

  @Column()
  phone: string;

  @UpdateDateColumn()
  modifiedAt: Date;

  @UpdateDateColumn()
  createdAt: Date;

  @OneToMany((type) => Feedback, (feedback) => feedback.rider)
  feedbacks: Feedback[];

  @ManyToMany((type) => Route)
  @JoinTable()
  routes: Route[];
}
