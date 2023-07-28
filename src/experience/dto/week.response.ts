import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WeekResponse {
  @Field(() => Number)
  day: number;

  @Field(() => [String])
  hours: string[];

  @Field(() => [String])
  ids: string[];

  @Field(() => [Number])
  quotas: number[];
}
