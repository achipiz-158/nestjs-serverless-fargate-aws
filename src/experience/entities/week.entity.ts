import { Field, ObjectType } from '@nestjs/graphql';
import { Booking } from '../../bookings/entities/booking.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Schedule } from './schedule.entity';
import { Exclude } from 'class-transformer';
import { Cart } from '.';

@ObjectType()
@Entity()
export class Week {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({
    type: 'time',
  })
  @Field(() => String)
  hour: string;

  @Column({
    type: 'int',
  })
  @Field(() => Number)
  day: number;

  @Column({
    type: 'int',
  })
  @Field(() => Number)
  quotas: number;

  @OneToMany(() => Booking, (booking) => booking.hour)
  @Field(() => [Booking])
  bookings: Booking[];

  @ManyToOne(() => Schedule, (schedule) => schedule.hours)
  @JoinColumn({
    name: 'schedule',
  })
  @Field(() => Schedule)
  schedule: Schedule;

  @OneToMany(() => Cart, (cart) => cart.hour)
  @Field(() => [Cart])
  cart: Cart[];

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
