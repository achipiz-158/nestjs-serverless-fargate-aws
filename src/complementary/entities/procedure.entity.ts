import { Field, ObjectType } from '@nestjs/graphql';
import { Cancellation } from '../../bookings/entities';
import { Tripp } from '../../experience/entities';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Answer } from '../../management/entities';
import { Profile } from '../../profile/entities';
import { Exclude } from 'class-transformer';

@ObjectType()
@Entity()
export class Procedure {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({
    type: 'varchar',
  })
  @Field(() => String)
  type: string;

  @Column({
    type: 'varchar',
    default: 'pending',
  })
  @Field(() => String)
  state: string;

  @Column({
    type: 'varchar',
  })
  @Field(() => String)
  affair: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @Field(() => String)
  description: string;

  @ManyToOne(() => Profile, (profile) => profile.requests)
  @JoinColumn({
    name: 'applicant_id',
  })
  @Field(() => Profile)
  applicant: Profile;

  @OneToMany(() => Answer, (Answer) => Answer.procedure)
  @Field(() => [Answer])
  answers: Answer[];

  @ManyToOne(() => Tripp, (tripp) => tripp.procedures)
  @JoinColumn({
    name: 'tripp',
  })
  @Field(() => Tripp)
  tripp: Tripp;

  @OneToOne(() => Cancellation, (cancellation) => cancellation, {
    nullable: true,
  })
  @JoinColumn({
    name: 'cancellation',
  })
  @Field(() => Cancellation)
  cancellation: Cancellation;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
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
