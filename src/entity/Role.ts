import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Permission } from "./Permission";
import { Rider } from "./Rider";

export enum RoleEnum {
  ANON = "ANONYMOUS",
  RIDER = "RIDER",
  PREMIUM_RIDER = "RIDER_PREMIUM",
  ADMIN = "ADMINISTRATOR",
}
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: RoleEnum,
  })
  role: RoleEnum;

  @OneToMany((type) => Rider, (rider) => rider.role)
  riders: Rider[];

  @ManyToMany((type) => Permission, (permission) => permission.roles)
  @JoinTable()
  permissions: Permission[];

  @UpdateDateColumn()
  modifiedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
