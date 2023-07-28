import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Nearby {
  @Field(() => String)
  city: string;

  @Field(() => String)
  name: string;

  @Field(() => [String])
  images: string[];
}
