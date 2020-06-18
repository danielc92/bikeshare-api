import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Route } from "./Route";

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

  @ManyToMany((type) => Route)
  @JoinTable()
  routes: Route[];
}
