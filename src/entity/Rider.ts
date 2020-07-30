import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Route } from "./Route";
import { Feedback } from "./Feedback";
import { Pack } from "./Pack";
import { Role } from "./Role";

@Entity()
export class Rider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  phone: string;

  @UpdateDateColumn()
  modifiedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany((type) => Feedback, (feedback) => feedback.rider)
  feedbacks: Feedback[];

  @OneToMany((type) => Pack, (pack) => pack.rider)
  myPacks: Pack[];

  @ManyToOne((type) => Role, (role) => role.riders)
  role: Role;

  @ManyToMany((type) => Pack, (pack) => pack.riders, {
    cascade: true,
  })
  @JoinTable()
  packs: Pack[];

  @ManyToMany((type) => Route, (route) => route.riders, {
    cascade: true,
  })
  @JoinTable()
  routes: Route[];
}
