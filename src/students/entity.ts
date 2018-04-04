import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import Classes from "../class/entity";

@Entity()
export default class Student extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @Column("text", { nullable: false })
  firstName: string;

  @Column("text", { nullable: false })
  lastName: string;

  @Column("text", { nullable: false})
  color: string;

  @Column("text", { nullable: false })
  profilePicture: string;

  @ManyToOne(_ => Classes, classes => classes.student)
  classes: Classes;
}
