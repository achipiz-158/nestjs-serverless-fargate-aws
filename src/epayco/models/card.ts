import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Card {
  @Field(() => String)
  readonly cardNumber: string;
  @Field(() => String)
  readonly cardExpMonth: string;
  @Field(() => String)
  readonly cardExpYear: string;
  @Field(() => String)
  readonly cardCvc: string;
  @Field(() => String)
  readonly dues: string;
}
