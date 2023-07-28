import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Booking } from './booking.entity';
import { StateCancellation } from '../../shared';
import { Exclude } from 'class-transformer';

@ObjectType()
@Entity()
export class Cancellation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: StateCancellation,
    default: null,
  })
  @Field(() => String)
  state: string;

  @Column({
    type: 'text',
  })
  @Field(() => String)
  reason: string;

  @OneToOne(() => Booking, (booking) => booking.cancellation)
  @JoinColumn({
    name: 'booking_id',
  })
  @Field(() => Booking)
  booking: Booking;

  @Column({
    type: 'timestamptz',
    nullable: true,
    name: 'date',
    default: null,
  })
  @Field(() => String)
  date: string;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({
    type: 'timestamptz',
    name: 'deleted_at',
  })
  deletedAt: Date;
}
