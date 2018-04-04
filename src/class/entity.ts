import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
//import {IsDate} from "class-validator";
import Student from "../students/entity";

// Need tovalidate Date

interface Date {
  new (): Date;
  toString(): string;
}

@Entity()
export default class Classes extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @Column("int") batchNr: number;

  @Column("text", { nullable: false })
//  @IsDate()
  startDate: Date;

  @Column("text", { nullable: false })
//  @IsDate()
  endDate: Date;

  @OneToMany(_ => Student, students => students.classes)
  student: Student[];
}
