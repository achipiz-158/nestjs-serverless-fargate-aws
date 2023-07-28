import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VerifyCode {
  @Field(() => String)
  message: string;

  @Field(() => Boolean)
  status: boolean;
}
