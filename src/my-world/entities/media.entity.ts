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
import { Publication } from './publication.entity';
import { Exclude } from 'class-transformer';

@Entity()
@ObjectType()
export class Media {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'enum', enum: TypeGallery, default: TypeGallery.DEFAULT })
  @Field(() => String)
  type: TypeGallery;

  @Column({ type: 'text' })
  @Field(() => String)
  url: string;

  @Column({ type: 'text' })
  @Field(() => String)
  mimeType: string;

  @Field(() => Publication)
  @ManyToOne(() => Publication, (publication) => publication.media,{onDelete:"CASCADE"})
  @JoinColumn({
    name: 'publication',
  })
  @Field(() => Publication)
  publication: Publication;

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
