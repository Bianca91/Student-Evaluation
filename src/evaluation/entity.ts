import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn
} from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import Student from "../students/entity";
import Classes from '../class/entity'

@Entity()
export default class Evaluation extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @Column("text", {default: new Date()})
  dailyEvaluation: Date; //current date

  @Column("text")
  remark: string;

  @Column("text")
  color: string

  @OneToOne(_ => Classes)
  @JoinColumn()
  classes: Classes;

  @OneToMany(_ => Evaluation, evaluations => evaluations.student)
  student: Student[];

}
