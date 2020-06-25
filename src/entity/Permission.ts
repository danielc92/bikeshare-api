import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { Role } from "./Role";

export enum MethodEnum {
  GET = "get",
  PATCH = "patch",
  POST = "post",
  DELETE = "delete",
}

export enum ApiRouteEnum {
  RIDER = "/rider",
  RIDER_DETAIL = "/rider/detail",
  BIKE = "/bike",
  BIKE_DETAIL = "/bike/detail",
  BRAND = "/brand",
  BRAND_DETAIL = "/brand/detail",
  ROUTE = "/route",
  ROUTE_DETAIL = "/route/detail",
  AUTH_LOGIN = "/auth/login",
  CONTACT = "/contact",
  CONTACT_DETAIL = "/contact/detail",
  PACK = "/pack",
  PACK_DETAIL = "/pack",
}
@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: ApiRouteEnum,
  })
  apiRoute: ApiRouteEnum;

  @Column({
    type: "enum",
    enum: MethodEnum,
  })
  requestMethod: MethodEnum;

  @ManyToMany((type) => Role, (role) => role.permissions)
  roles: Role[];

  @UpdateDateColumn()
  modifiedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
