import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn
} from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import Student from "../students/entity";
import Classes from "../class/entity";

@Entity()
export default class Evaluation extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @Column("text")
  dailyEvaluation: Date; //current date

  @Column("text", { nullable: true })
  studentName: Date;

  @Column("text", { nullable: true})
  studentLastName: Date;

  @Column("text", { nullable: true })
  profilePicture: Date;

  @Column("text") remark: string;

  @Column("text") color: string;

  @OneToOne(_ => Classes)
  @JoinColumn()
  classes: Classes;

  @ManyToOne(_ => Student, student => student.evaluation, {cascadeInsert: true})
   student: Student;

}
