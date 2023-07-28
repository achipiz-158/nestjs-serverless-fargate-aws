import { Field, ObjectType } from '@nestjs/graphql';
import { Tripp } from '../../experience/entities';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Host } from '../../profile/entities/host.entity';
import { Exclude } from 'class-transformer';

@ObjectType()
@Entity()
export class Language {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({
    type: 'varchar',
    length: 5,
  })
  @Field(() => String)
  sub: string;

  @Column({
    type: 'varchar',
    length: 30,
  })
  @Field(() => String)
  name: string;

  @ManyToMany(() => Host, (host) => host.languages)
  hosts: Host[];

  @OneToMany(() => Tripp, (tripp) => tripp.language)
  tripps: Tripp[];

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
