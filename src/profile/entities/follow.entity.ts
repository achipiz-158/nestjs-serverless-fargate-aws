import { Profile } from '../../profile/entities/profile.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Tag } from '../../my-world/entities/tag.entity';

@ObjectType()
@Entity()
export class Follow {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @ManyToOne(() => Profile, (profile) => profile.follows)
  @JoinColumn({
    name: 'follower',
  })
  @Field(() => Profile)
  follower: Profile;

  @ManyToOne(() => Profile, (profile) => profile.followers)
  @JoinColumn({
    name: 'followed',
  })
  @Field(() => Profile)
  followed: Profile;

  @OneToMany(() => Tag, (tag) => tag.follow)
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
