import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from './message.entity';
import { TypeChat } from '../../shared/enum/type_chat.enum';
import { Member } from './member.entity';

@ObjectType()
@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({
    type: 'enum',
    enum: TypeChat,
    default: TypeChat.P2P,
  })
  @Field(() => String)
  type: TypeChat;

  @OneToMany(() => Message, (message) => message.chat)
  @Field(() => [Message])
  messages: Message[];

  @OneToMany(() => Member, (members) => members.chat)
  @Field(() => [Member], { nullable: true })
  members: Member[];

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
