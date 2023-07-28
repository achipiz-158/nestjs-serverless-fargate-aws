import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Customer {
  @Field(() => String)
  readonly docType: string;
  @Field(() => String)
  readonly docNumber: string;
  @Field(() => String)
  readonly name: string;
  @Field(() => String)
  readonly lastName: string;
  @Field(() => String)
  readonly email: string;
  @Field(() => String)
  readonly cellPhone: string;
  @Field(() => String)
  readonly phone: string;
}
