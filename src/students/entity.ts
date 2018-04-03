import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import Batches from "../class/entity";
import Color from "../colors/entity";

@Entity()
export default class Student extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @Column("text", { nullable: false })
  firstName: string;

  @Column("text", { nullable: false })
  lastName: string;

  @Column("text", { nullable: false })
  profilePicture: string;

  @ManyToOne(_ => Batches, batches => batches.student)
  batches: Batches;

  @OneToMany(_ => Color, color => color.student,{eager: true})
  colors: Color[];
}
