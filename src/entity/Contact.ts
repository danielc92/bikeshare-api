import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
} from "typeorm";

enum EnquiryTypeEnum {
  COMPLAINT = "Complaint",
  PRAISE = "Praise",
  SUGGESTION = "Suggestion",
  OTHER = "Other",
}

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  enquiryContent: string;

  @Column({
    type: "enum",
    enum: EnquiryTypeEnum,
    default: EnquiryTypeEnum.OTHER,
  })
  enquiryType: EnquiryTypeEnum;

  @UpdateDateColumn()
  modifiedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
