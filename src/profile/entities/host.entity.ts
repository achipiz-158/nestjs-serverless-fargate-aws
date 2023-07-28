import { Field, ObjectType } from '@nestjs/graphql';
import { DocumentType } from '../../shared';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Language } from '../../complementary/entities/language.entity';
import { Profile } from './profile.entity';
import { Exclude, Expose } from 'class-transformer';
import { Rating } from '../../complementary/entities';

@ObjectType()
@Entity()
export class Host {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 0,
    nullable: true,
  })
  @Field(() => Number, { nullable: true })
  nequi: number;

  @Column({
    type: 'text',
    name: 'front_identify',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  frontIdentify: string;

  @Column({
    type: 'text',
    name: 'front_identify_key',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  frontIdentifyKey: string;

  @Column({
    type: 'text',
    name: 'back_identify',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  backIdentify: string;

  @Column({
    type: 'text',
    name: 'back_identify_key',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  backIdentifyKey: string;

  @Column({
    type: 'enum',
    enum: DocumentType,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  documentType: string;

  @Column({
    type: 'int',
    unique: true,
    nullable: true,
  })
  @Field(() => Number, { nullable: true })
  document: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  company?: string;

  @Column({
    type: 'integer',
    nullable: true,
  })
  @Field(() => Number, { nullable: true })
  NIT?: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  RUT?: string;

  @Column({
    type: 'text',
    name: 'RUT_key',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  RUTKey?: string;

  @Expose()
  @Field(() => Number)
  get ratingAverage(): number {
    if (!this.rating) return 0;
    const ratings = this.rating;
    if (ratings.length < 5 || !ratings) return 0;
    const sum = ratings.reduce((a, b) => a + b.rating, 0);
    return sum / ratings.length;
  }

  @ManyToMany(() => Rating, (rating) => rating.host)
  @Field(() => [Rating])
  @JoinTable({
    name: 'host_ratings',
    joinColumn: { name: 'host_id' },
    inverseJoinColumn: { name: 'rating_id' },
  })
  rating: Rating[];

  @ManyToMany(() => Language, (language) => language.hosts)
  @JoinTable({
    name: 'profile_languages',
    joinColumn: {
      name: 'profile_id',
    },
    inverseJoinColumn: {
      name: 'language_id',
    },
  })
  @Field(() => [Language])
  languages: Language[];

  @OneToOne(() => Profile, (profile) => profile.host)
  @JoinColumn({
    name: 'profile_id',
  })
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
