import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from "typeorm";

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
}
