import { ObjectType, Field } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from '.';
import { TypeGalleryProfile } from '../../shared/enum/type_gallery_profile.enum';
import { Exclude } from 'class-transformer';

@ObjectType()
@Entity()
export class GalleryProfile {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  url: string;

  @Column({
    type: 'enum',
    enum: TypeGalleryProfile,
    default: TypeGalleryProfile.DEFAULT,
  })
  @Field(() => String)
  type: TypeGalleryProfile;

  @Column({
    type: 'text',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  key: string;

  @ManyToOne(() => Profile, (profile) => profile.gallery)
  @JoinColumn({ name: 'profile_id' })
  @Field(() => Profile)
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
}
