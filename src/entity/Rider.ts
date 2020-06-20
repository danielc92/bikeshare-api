import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { Route } from "./Route";
import { Feedback } from "./Feedback";
import { Pack } from "./Pack";

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

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany((type) => Feedback, (feedback) => feedback.rider)
  feedbacks: Feedback[];

  @OneToMany((type) => Pack, (pack) => pack.rider)
  myPacks: Pack[];

  @ManyToMany((type) => Pack, (pack) => pack.riders)
  @JoinTable()
  packs: Pack[];

  @ManyToMany((type) => Route)
  @JoinTable()
  routes: Route[];
}
