import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import Classes from "../class/entity";
import Evaluation from "../evaluation/entity";

@Entity()
export default class Student extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @Column("text", {nullable: true})
  firstName: string;

  @Column("text", {nullable: true})
  lastName: string;

  @Column("text", {nullable: true})
  profilePicture: string;

  @ManyToOne(_ => Classes, classes => classes.students)
  classes: Classes;

  @OneToMany(_ => Evaluation, evaluation => evaluation.student)
  evaluation: Evaluation[];
}
