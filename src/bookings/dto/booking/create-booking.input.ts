import { InputType, Field } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty, IsPositive } from 'class-validator';

@InputType()
export class CreateBookingInput {
  @IsNotEmpty()
  @IsPositive()
  @Field(() => Number)
  readonly attendees: number;

  @IsDateString()
  @Field(() => Date)
  readonly date: Date;
}
