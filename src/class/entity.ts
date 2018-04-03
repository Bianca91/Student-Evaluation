import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import {IsDate} from "class-validator";

import Student from "../students/entity";

interface Date {
  new (): Date;
  toString(): string;
}

@Entity()
export default class Batches extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @Column("int") batchesNr: number;

  @Column("text", { nullable: false })
  @IsDate()
  startDate: Date;

  @Column("text", { nullable: false })
  @IsDate()
  endDate: Date;

  @OneToMany(_ => Student, students => students.batches)
  student: Student[];
}
