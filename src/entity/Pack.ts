import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Pack {
  @PrimaryGeneratedColumn()
  id: number;

  @UpdateDateColumn()
  modifiedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
