import { Field, ObjectType } from '@nestjs/graphql';
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

import { Profile } from './profile.entity';
import { Exclude } from 'class-transformer';
import { Transaction } from './transaction.entity';

@ObjectType()
@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({
    type: 'int',
    default: 0,
  })
  @Field(() => Number)
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.wallet)
  @Field(() => [Transaction])
  transactions: Transaction[];

  @OneToOne(() => Profile, (profile) => profile.wallet)
  @JoinColumn({
    name: 'profile_id',
  })
  @Field(() => Profile, { nullable: false })
  profile: Profile;

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
