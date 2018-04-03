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
import Color from "../colors/entity";
import Class from '../class/entity'

@Entity()
export default class Evaluation extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @Column("text", { nullable: false })
  dailyEvaluation: Date; //current date

  @Column("text", { nullable: false })
  remark: string;

  @OneToOne(_ => Color)
  @JoinColumn()
  colors: Color;

  @OneToOne(_ => Class)
  @JoinColumn()
  class: Class;

  @OneToMany(_ => Evaluation, evaluations => evaluations.student, {
    eager: true
  })
  student: Student[];




}
