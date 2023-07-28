import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  IsNumber,
} from 'class-validator';

@InputType()
export class QualifyTrippInput {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @Field(() => String)
  readonly tripp?: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Number)
  readonly scoreTripp?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(400)
  @Field(() => String)
  readonly commentTripp: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Number)
  readonly scoreHost?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(400)
  @Field(() => String)
  readonly commentHost: string;
}
