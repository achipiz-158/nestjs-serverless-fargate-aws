import { Field, ObjectType } from '@nestjs/graphql';
import { Profile } from '../../profile/entities/profile.entity';
import { StateBooking } from '../../shared';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cancellation } from './cancellation.entity';
import { Payment } from '../../epayco/entities/payment.entity';
import { Week } from '../../experience/entities/week.entity';
import { Exclude } from 'class-transformer';

@Entity()
@ObjectType()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({
    type: 'enum',
    enum: StateBooking,
    default: StateBooking.PREBOOKED,
  })
  @Field(() => String)
  state: string;

  @Column({
    type: 'int',
  })
  @Field(() => Number)
  attendees: number;

  @Column({
    type: 'timestamptz',
    name: 'date',
  })
  @Field(() => Date)
  date: Date;

  @OneToOne(() => Cancellation, (cancellation) => cancellation.booking, {
    nullable: true,
  })
  @JoinColumn({
    name: 'cancellation_id',
  })
  @Field(() => Cancellation)
  cancellation: Cancellation;

  @ManyToOne(() => Week, (week) => week.bookings)
  @JoinColumn({
    name: 'week',
  })
  @Field(() => Week)
  hour: Week;

  @ManyToOne(() => Profile, (profile) => profile.bookings)
  @JoinColumn({
    name: 'user',
  })
  @Field(() => Profile)
  user: Profile;

  @ManyToOne(() => Payment, (payment) => payment)
  @JoinColumn({
    name: 'payment',
  })
  @Field(() => Payment)
  payment: Payment;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @DeleteDateColumn({
    type: 'timestamptz',
    name: 'deleted_at',
  })
  deletedAt: Date;
}
