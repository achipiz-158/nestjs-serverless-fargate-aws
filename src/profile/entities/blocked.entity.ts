import { Field, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Profile } from '../../profile/entities/profile.entity';
import { Exclude } from 'class-transformer';

@ObjectType()
@Entity()
export class Blocked {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @ManyToOne(() => Profile, (profile) => profile.blocked)
  @JoinColumn({
    name: 'blocked',
  })
  @Field(() => [Profile])
  blocked: Profile;

  @ManyToOne(() => Profile, (profile) => profile.blocked)
  @JoinColumn({
    name: 'blocker',
  })
  @Field(() => [Profile])
  blocker: Profile;

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
