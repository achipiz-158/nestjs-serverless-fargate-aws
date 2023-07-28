import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

@InputType()
export class CartInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly weekId: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Number)
  readonly attendees: number;

  @IsNotEmpty()
  @IsDate()
  @Field(() => Date)
  readonly date: Date;
}
