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
//import Batches from '../class/entity'

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

  // @OneToOne(_ => Batches)
  // @JoinColumn()
  // batches: Batches;

  @OneToMany(_ => Evaluation, evaluations => evaluations.student)
  student: Student[];

}
