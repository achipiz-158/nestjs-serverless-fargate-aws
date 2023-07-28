import { InputType, Field } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Booking } from 'src/bookings/entities';

@InputType()
export class CreateCancellationHostInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly reason: string;

  @IsNotEmpty()
  @IsUUID()
  @Field(() => String)
  readonly trippId: string;

  // @IsString()
  // @Field(() => String)
  // readonly startTime: string;

  // @IsString()
  // @Field(() => String)
  // readonly endTime: string;

  // @IsDateString()
  // @Field(() => Date)
  // readonly date: Date;
}
