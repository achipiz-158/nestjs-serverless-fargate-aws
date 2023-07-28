import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateCancellationInput } from './create-cancellation.input';
import { IsNotEmpty, IsString } from 'class-validator';
import { Booking } from 'src/bookings/entities';

@InputType()
export class CancellationInput  {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly state: string;

  @IsNotEmpty()
  @Field(() => String)
  readonly booking: Booking;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly reason: string;
}
