import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Media } from '../entities/media.entity';
import { Profile } from '../../profile/entities/profile.entity';
import { LikePublication } from './like-publication.entity';
import { Comment } from './comment.entity';
import { Point } from 'geojson';
import { Tag } from './tag.entity';
@ObjectType()
@Entity()
export class Publication {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String)
  description: string;

  @OneToMany(() => Media, (media) => media.publication)
  @Field(() => [Media])
  media: Media[];

  @ManyToOne(() => Profile, (profile) => profile.publications)
  @JoinColumn({
    name: 'author_id',
  })
  @Field(() => Profile)
  profile: Profile;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    name: 'meeting_point',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  meetingPoint: Point;

  @Expose()
  @Field(() => Number)
  get latitude(): number {
    return this.meetingPoint.coordinates[0];
  }

  @Expose()
  @Field(() => Number)
  get longitude(): number {
    return this.meetingPoint.coordinates[1];
  }

  @OneToMany(
    () => LikePublication,
    (likePublication) => likePublication.publication
  )
  @Field(() => [LikePublication])
  likesPublications: LikePublication[];

  @OneToMany(() => Comment, (comment) => comment.publication
  )
  @Field(() => [Comment])
  comments: Comment[];

  @OneToMany(() => Tag, (tag) => tag.publication
  )
  @Field(() => [Tag])
  tags: Tag[];

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

  @Field(() => Int)
  numLikes?: number;

  @Field(() => Int)
  numComments?: number;
}
