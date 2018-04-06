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
import Classes from '../class/entity'

@Entity()
export default class Evaluation extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @Column("text")
  dailyEvaluation: Date; //current date

  @Column("text")
  remark: string;

  @OneToOne(_ => Color)
  @JoinColumn()
  colors: Color;

  @OneToOne(_ => Classes)
  @JoinColumn()
  classes: Classes;

  @OneToMany(_ => Evaluation, evaluations => evaluations.student)
  student: Student[];

}
