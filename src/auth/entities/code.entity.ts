import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from '../../profile/entities/profile.entity';
import { Exclude } from 'class-transformer';
import { TypeCode } from '../../shared/enum/state/code.enum';

@ObjectType()
@Entity()
export class Code {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({
    type: 'int',
    unique: true,
  })
  @Field(() => Number)
  code: number;

  @ManyToOne(() => Profile, (profile) => profile.code)
  @JoinColumn({
    name: 'profile_id',
  })
  @Field(() => Profile)
  profile: Profile;

  @Column({
    type: 'enum',
    enum: TypeCode,
    default: TypeCode.EMAIL,
  })
  @Field(() => String)
  type: string;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
