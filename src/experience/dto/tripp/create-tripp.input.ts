import { InputType, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
@InputType()
export class CreateTrippInput {
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  @Field(() => String)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly languageId: string;

  @IsNotEmpty()
  @IsPositive()
  @Field(() => Number)
  readonly price: number;

  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  @Field(() => [String])
  readonly contents: string[];

  @IsString({ each: true })
  @IsArray()
  @IsNotEmpty()
  @Field(() => [String])
  readonly recommendations: string[];

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly categoryId: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly trippId?: string;
}
