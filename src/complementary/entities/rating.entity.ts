import { Field, ObjectType } from '@nestjs/graphql';
import { Tripp } from '../../experience/entities';
import { Host, Profile } from '../../profile/entities';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({
    type: 'varchar',
  })
  @Field(() => String)
  comment: string;

  @Column({
    type: 'int',
  })
  @Field(() => Number)
  rating: number;

  @ManyToOne(() => Profile, (profile) => profile.ratings)
  @Field(() => Profile)
  profile: Profile;

  @ManyToMany(() => Tripp, (tripp) => tripp.rating)
  tripp: Tripp[];

  @ManyToMany(() => Host, (host) => host.rating)
  host: Host[];
}
