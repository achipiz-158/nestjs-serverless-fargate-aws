import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Bookigs {
  @Field(() => Date)
  date: Date;

  @Field(() => Number)
  reservas: number;

  @Field(() => String)
  hour: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  country: string;

  @Field(() => Number)
  price: number;

  @Field(() => String)
  language: string;

  @Field(() => String)
  url: string;

  @Field(() => [User])
  users: User[];
}

@ObjectType()
export class User {
  @Field(() => String, { nullable: true })
  image: string;

  @Field(() => Boolean)
  host: boolean;
}
