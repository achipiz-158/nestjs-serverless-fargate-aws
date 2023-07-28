import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsPositive,
  Min,
  Max,
} from 'class-validator';

@InputType()
export class RatingHostInput {
  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  @Field(() => String)
  readonly comment: string;

  @IsNotEmpty()
  @IsPositive()
  @Min(0)
  @Max(5)
  @Field(() => Number)
  readonly stars: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly hostId: string;
}
