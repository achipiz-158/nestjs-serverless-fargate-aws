import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';
import { Gender } from '../../shared';
import {
  Blocked,
  Follow,
  Host,
  Message,
  Role,
  Wallet,
  GalleryProfile,
} from './';
import { Country, Procedure, Rating } from '../../complementary/entities';
import { Booking } from '../../bookings/entities/booking.entity';
import { Code } from '../../auth/entities/code.entity';
import { Billing } from '../../epayco/entities/billing.entity';
import { Answer } from '../../management/entities';
import { Favorite, Cart, Tripp } from '../../experience/entities';
import { Publication } from '../../my-world/entities/publication.entity';
import { LikePublication } from '../../my-world/entities/like-publication.entity';
import { Comment } from '../../my-world/entities/comment.entity';
import { Member } from './member.entity';

@ObjectType()
@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({
    type: 'text',
    unique: true,
  })
  @Field(() => String)
  email: string;

  @Column({
    type: 'text',
  })
  @Exclude()
  password: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  @Field(() => String)
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  @Field(() => String)
  lastname: string;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  @Field(() => String)
  gender: string;

  @Column({
    type: 'timestamptz',
    name: 'date_of_birth',
    nullable: true,
  })
  @Field(() => Date)
  dateOfBirth: Date;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @Field(() => String)
  prefix: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 0,
    nullable: true,
  })
  @Field(() => Number)
  phone: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  img: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  imgKey: string;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  @Field(() => String)
  profession: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  bio: string;

  @Column({
    default: false,
    name: 'verified_host',
  })
  @Field(() => Boolean)
  verifiedHost: boolean;

  @Column({
    default: false,
    name: 'verified_email',
  })
  @Field(() => Boolean)
  verifiedEmail: boolean;

  @Column({
    default: false,
    name: 'verified_phone',
  })
  @Field(() => Boolean)
  verifiedPhone: boolean;

  @Expose()
  @Field(() => Number)
  get totalFollows(): number {
    if (!this.follows || !this.followers) return 0;
    return this.followers.length + this.follows.length;
  }

  @Expose()
  @Field(() => Number)
  get totalFavorites(): number {
    if (!this.favorites) return 0;
    return this.favorites.length;
  }

  @Expose()
  @Field(() => Number)
  get totalPublications(): number {
    if (!this.publications) return 0;
    return this.publications.length;
  }

  @OneToMany(() => Message, (message) => message.profile)
  messages: Message[];

  @OneToMany(() => Member, (members) => members.member)
  members: Member[];

  @OneToMany(() => GalleryProfile, (gallery) => gallery.profile)
  @Field(() => [GalleryProfile])
  gallery: GalleryProfile[];

  @OneToMany(() => Cart, (cart) => cart.profile)
  cart: Cart;

  @OneToMany(() => Billing, (billing) => billing.profile)
  @Field(() => [Billing])
  billing: Billing[];

  @OneToMany(() => Tripp, (tripp) => tripp.host)
  @Field(() => [Tripp])
  tripps: Tripp[];

  @OneToMany(() => Booking, (booking) => booking.user)
  @Field(() => [Booking])
  bookings: Booking[];

  @OneToMany(() => Publication, (publication) => publication.profile)
  @Field(() => [Publication])
  publications: Publication[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  @Field(() => [Follow])
  follows: Follow[];

  @OneToMany(() => Follow, (follow) => follow.followed)
  @Field(() => [Follow])
  followers: Follow[];

  @OneToMany(() => Blocked, (blocked) => blocked.blocker)
  @Field(() => [Blocked])
  blocker: Blocked[];

  @OneToMany(() => Blocked, (blocked) => blocked.blocked)
  @Field(() => [Blocked])
  blocked: Blocked[];

  @OneToMany(() => Favorite, (favorite) => favorite.profile)
  @Field(() => [Favorite])
  favorites: Favorite[];

  @OneToMany(() => Answer, (answer) => answer.manager)
  @Field(() => [Answer])
  procedures: Answer[];

  @OneToMany(() => Procedure, (procedure) => procedure.applicant)
  @Field(() => [Procedure])
  requests: Procedure[];

  @OneToMany(() => Rating, (rating) => rating.profile)
  @Field(() => [Rating])
  ratings: Rating[];

  @ManyToMany(() => Role, (role) => role.profile)
  @Field(() => [Role])
  @JoinTable({
    name: 'profile_role',
    joinColumn: { name: 'profile_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: Role[];

  @ManyToOne(() => Country, (country) => country.profiles)
  @JoinColumn({
    name: 'country',
  })
  @Field(() => Country)
  country: Country;

  @OneToOne(() => Host, (host) => host.profile)
  @Field(() => Host, { nullable: true })
  host: Host;

  @OneToMany(() => Code, (code) => code.profile)
  @Field(() => Code)
  code: Code;

  @OneToOne(() => Wallet, (wallet) => wallet.profile)
  @Field(() => Wallet)
  wallet: Wallet;

  @OneToMany(
    () => LikePublication,
    (likePublication) => likePublication.profile,
  )
  @Field(() => [LikePublication])
  likePublications: LikePublication[];

  @OneToMany(() => Comment, (comment) => comment.profile)
  @Field(() => [Comment])
  comments: Comment[];

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
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
