import { Field, ObjectType } from '@nestjs/graphql';
import { Tripp } from '../../experience/entities';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Country } from './country.entity';
import { Exclude } from 'class-transformer';

@ObjectType()
@Entity()
export class City {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({
    type: 'text',
  })
  @Field(() => String)
  name: string;

  @ManyToOne(() => Country, (country) => country.cities)
  @JoinColumn({
    name: 'country_id',
  })
  @Field(() => Country)
  country: Country;

  @OneToMany(() => Tripp, (tripp) => tripp.city)
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
