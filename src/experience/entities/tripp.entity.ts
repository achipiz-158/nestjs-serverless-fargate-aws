import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Point } from 'geojson';

import { Gallery } from './gallery.entity';
import { Schedule } from './schedule.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Profile } from '../../profile/entities/profile.entity';
import { Category } from '../../complementary/entities/category.entity';
import { City } from '../../complementary/entities/city.entity';
import { Language } from '../../complementary/entities/language.entity';
import { Procedure } from '../../complementary/entities/procedure.entity';
import { Favorite } from './favorite.entity';
import { Exclude, Expose } from 'class-transformer';
import { Rating } from '../../complementary/entities/rating.entity';

@ObjectType()
@Entity()
export class Tripp {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({
    type: 'varchar',
  })
  @Field(() => String)
  name: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  @Field(() => Boolean)
  published: boolean;

  @ManyToOne(() => Language, (language) => language.tripps)
  @JoinColumn({
    name: 'language',
  })
  @Field(() => Language)
  language: Language;

  @Column({
    type: 'int',
  })
  @Field(() => Number)
  price: number;

  @Column({
    type: 'text',
  })
  @Field(() => String)
  contents: string[];

  @Column({
    type: 'text',
  })
  @Field(() => String)
  recommendations: string[];

  @Column({
    type: 'text',
    name: 'location_name',
    nullable: true,
  })
  @Field(() => String)
  locationName: string;

  @Column({
    type: 'text',
    name: 'location_description',
    nullable: true,
  })
  @Field(() => String)
  locationDescription: string;

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
    return this.meetingPoint.coordinates[1];
  }

  @Expose()
  @Field(() => Number)
  get longitude(): number {
    return this.meetingPoint.coordinates[0];
  }

  @ManyToOne(() => Profile, (profile) => profile.tripps)
  @JoinColumn({
    name: 'host',
  })
  @Field(() => Profile)
  host: Profile;

  @OneToMany(() => Favorite, (favorite) => favorite.tripp)
  @Field(() => [Favorite])
  favorites: Favorite[];

  @ManyToOne(() => Category, (category) => category.tripps)
  @JoinColumn({
    name: 'category',
  })
  @Field(() => Category)
  category: Category;

  @OneToMany(() => Gallery, (gallery) => gallery.tripp)
  @Field(() => [Gallery])
  gallery: Gallery[];

  @OneToOne(() => Schedule, (schedule) => schedule.tripp)
  @Field(() => Schedule)
  schedule: Schedule;

  @ManyToOne(() => City, (city) => city.tripps)
  @JoinColumn({
    name: 'city',
  })
  @Field(() => City)
  city: City;

  @ManyToMany(() => Rating, (rating) => rating.tripp)
  @Field(() => [Rating], { nullable: true })
  @JoinTable({
    name: 'tripp_rating',
    joinColumn: { name: 'tripp_id' },
    inverseJoinColumn: { name: 'rating_id' },
  })
  rating: Rating[];

  @OneToMany(() => Procedure, (procedure) => procedure.tripp)
  @Field(() => [Procedure], { nullable: true })
  procedures: Procedure[];

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  createdAt: Date;

  @Exclude()
  @DeleteDateColumn({
    type: 'timestamptz',
    name: 'deleted_at',
  })
  deletedAt: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
