import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import Student from "../students/entity";


@Entity()
export default class Color extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @Column("text", { default: null })
  colors: string;

  @ManyToOne(_ => Student, student => student.colors)
    student: Student;
}
