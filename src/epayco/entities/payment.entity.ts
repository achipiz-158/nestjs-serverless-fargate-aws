import { Booking } from '../../bookings/entities';
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
import { Epayco } from './epayco.entity';
import { EpaycoStatus } from '../../shared/enum/epaycoStatus.enum';
import { Exclude } from 'class-transformer';

@Entity()
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({
    type: 'enum',
    enum: EpaycoStatus,
    default: EpaycoStatus.PENDING,
  })
  @Field(() =>String)
  state: EpaycoStatus;

  @OneToMany(() => Booking, (booking) => booking.payment)
  @Field(() => [Booking])
  bookings: Booking[];

  @OneToOne(() => Epayco, (epayco) => epayco.payment)
  @JoinColumn({
    name: 'epayco',
  })
  @Field(() => Epayco)
  epayco: Epayco;

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
