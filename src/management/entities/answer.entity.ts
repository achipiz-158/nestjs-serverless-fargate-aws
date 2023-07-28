import { Field, ObjectType } from '@nestjs/graphql';
import { Profile } from '../../profile/entities';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Procedure } from '../../complementary/entities';
import { Exclude } from 'class-transformer';

@ObjectType()
@Entity()
export class Answer {
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
  })
  @Field(() => String)
  description: string;

  @ManyToOne(() => Profile, (profile) => profile.procedures)
  @JoinColumn({
    name: 'manager',
  })
  @Field(() => Profile)
  manager: Profile;

  @ManyToOne(() => Procedure, (procedure) => procedure.answers)
  @JoinColumn({
    name: 'procedure_id',
  })
  @Field(() => Procedure)
  procedure: Procedure;

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
