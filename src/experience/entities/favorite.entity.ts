import { Field, ObjectType } from '@nestjs/graphql';
import { Profile } from '../../profile/entities';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tripp } from './tripp.entity';
import { Exclude } from 'class-transformer';

@ObjectType()
@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @ManyToOne(() => Profile, (profile) => profile.favorites)
  @JoinColumn({
    name: 'profile',
  })
  @Field(() => Profile)
  profile: Profile;

  @ManyToOne(() => Tripp, (tripp) => tripp.favorites)
  @JoinColumn({
    name: 'tripp',
  })
  @Field(() => Tripp)
  tripp: Tripp;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamptz',
    name: 'deleted_at',
  })
  @Exclude()
  deletedAt: Date;
}
