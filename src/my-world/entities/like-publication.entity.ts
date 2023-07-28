import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  Column,
} from 'typeorm';
import { Publication } from './publication.entity';
import { Profile } from '../../profile/entities/profile.entity';

@ObjectType()
@Entity()
export class LikePublication {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  publication_id: string;

  @ManyToOne(() => Publication, (publication) => publication.likesPublications,{onDelete:"CASCADE"})
  @JoinColumn({
    name: 'publication_id',
  })
  @Field(() => Publication)
  publication: Publication;

  @Column()
  @Field(() => String)
  profile_id: string;

  @ManyToOne(() => Profile, (profile) => profile.likePublications)
  @JoinColumn({
    name: 'profile_id',
  })
  @Field(() => Profile)
  profile: Profile;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  createdAt: Date;
}
