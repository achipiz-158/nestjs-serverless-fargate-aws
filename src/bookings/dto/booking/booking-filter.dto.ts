import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BookingFilterDTO {
  @Field(() => String)
  trippId: string;
  
  @Field(() => Date)
  date?: Date;

  @Field(() => Date)
  startTime?: Date;

  @Field(() => Date)
  endTime?: Date;

  @Field(() => Boolean)
  published?: boolean;

  @Field(() => Boolean)
  order?: boolean;

  @Field(() => Date)
  today?: Date;

  @Field(() => [String])
  states?: string[];

}


