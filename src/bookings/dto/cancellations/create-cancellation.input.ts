import { InputType, Field } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';


@InputType()
export class CreateCancellationInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly reason: string;

  @IsNotEmpty()
  @IsUUID()
  @Field(() => String)
  readonly bookingId: string;

 
}
