import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Publication } from './publication.entity';
import { Profile } from '../../profile/entities/profile.entity';
import { Length } from 'class-validator';

@ObjectType()
@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column('text')
  @Length(0, 800)
  @Field(() => String)
  content: string;

  @Column()
  @Field(() => String)
  publication_id: string;

  @ManyToOne(() => Publication, (publication) => publication.comments,{onDelete:"CASCADE"})
  @JoinColumn({
    name: 'publication_id',
  })
  @Field(() => Publication)
  publication: Publication;

  @Column()
  @Field(() => String)
  profile_id: string;

  @ManyToOne(() => Profile, (profile) => profile.comments)
  @JoinColumn({
    name: 'profile_id',
  })
  @Field(() => Profile)
  profile: Profile;

  @Column()
  @Field({ nullable: true })
  comment_id?: string;

  @ManyToOne(() => Comment, (comment) => comment.replys,{nullable:true})
  @JoinColumn({
    name: 'comment_id',
  })
  @Field(() => Comment)
  comment?: Comment;

  @OneToMany(() => Comment, (comment) => comment.comment)
  @Field(() => [Comment])
  replys: Comment[];

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  createdAt: Date;

  @Field(() => Int)
  numComments?: number;
}
