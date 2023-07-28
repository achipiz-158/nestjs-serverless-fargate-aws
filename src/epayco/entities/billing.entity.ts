import { Field, ObjectType } from '@nestjs/graphql';
import { Profile } from '../../profile/entities/profile.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
@ObjectType()
export class Billing {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({
    name: 'doc_type',
  })
  @Field(() => String)
  docType: string;

  @Column({
    name: 'doc_number',
  })
  @Field(() => String)
  docNumber: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column({
    name: 'last_name',
  })
  @Field(() => String)
  lastName: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  phone: string;

  @Column({
    name: 'card_token_id',
  })
  @Field(() => String)
  cardTokenId: string;

  @ManyToOne(() => Profile, (user) => user.billing)
  profile: Profile;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({
    type: 'timestamptz',
    name: 'deleted_at',
  })
  deletedAt: Date;
}
