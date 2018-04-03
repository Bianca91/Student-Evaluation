import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import Student from '../students/entity'

@Entity()
export default class Class extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable:false})
  batchNr: number

  @Column('text', {nullable:false})
  startDate: Date

  @Column('text', {nullable:false})
  endDate: Date

  @OneToMany(_ => Student, students => students.class, { eager: true })
  student: Student[];
}
