import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'

@Entity()
export default class Color extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  red: number

  @Column()
  yellow: number

  @Column()
  green: number

}
