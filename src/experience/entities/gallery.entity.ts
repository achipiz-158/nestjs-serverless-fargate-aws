import { Field, ObjectType } from '@nestjs/graphql';
import { TypeGallery } from '../../shared/enum/type_gallery.enum';
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

import { Tripp } from './tripp.entity';
import { Exclude } from 'class-transformer';

@ObjectType()
@Entity()
export class Gallery {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({
    type: 'enum',
    enum: TypeGallery,
    default: TypeGallery.DEFAULT,
  })
  @Field(() => String)
  type: TypeGallery;

  @Column({
    type: 'text',
  })
  @Field(() => String)
  url: string;

  @Column({
    type: 'text',
  })
  @Field(() => String)
  mimeType: string;

  @Field(() => Tripp)
  @ManyToOne(() => Tripp, (tripp) => tripp.gallery)
  @JoinColumn({
    name: 'tripp',
  })
  tripp: Tripp;

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
