import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExistRateResponse {
  @Field(() => Boolean)
  tripp: boolean;

  @Field(() => Boolean)
  host: boolean;
}
