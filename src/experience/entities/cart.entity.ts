import { Field, ObjectType } from '@nestjs/graphql';
import { Profile } from '../../profile/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Week } from '.';

@ObjectType()
@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @ManyToOne(() => Profile, (profile) => profile.cart)
  @JoinColumn({
    name: 'profile',
  })
  @Field(() => Profile)
  profile: Profile;

  @Column({ default: false })
  @Field(() => Boolean)
  isSelect: boolean;

  @ManyToOne(() => Week, (week) => week.cart)
  @JoinColumn({
    name: 'week',
  })
  @Field(() => Week)
  hour: Week;

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
}
