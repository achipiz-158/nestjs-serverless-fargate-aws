import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';
import { Tripp } from './tripp.entity';
import { Week } from './week.entity';
import { Exclude } from 'class-transformer';

@ObjectType()
@Entity()
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({
    type: 'date',
    name: 'start_date',
  })
  @Field(() => String)
  startDate: Date;

  @Column({
    type: 'date',
    name: 'end_date',
  })
  @Field(() => String)
  endDate: Date;

  @Column({
    type: 'time',
  })
  @Field(() => String)
  duration: string;

  @OneToOne(() => Tripp, (tripp) => tripp.schedule)
  @JoinColumn({
    name: 'tripp',
  })
  @Field(() => Tripp)
  tripp: Tripp;

  @OneToMany(() => Week, (week) => week.schedule)
  @Field(() => [Week])
  hours: Week[];

  @Exclude()
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({
    type: 'timestamptz',
    name: 'deleted_at',
  })
  deletedAt: Date;
}
