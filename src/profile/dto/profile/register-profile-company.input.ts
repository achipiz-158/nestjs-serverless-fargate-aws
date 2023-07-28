import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsPositive,
  IsUUID,
  IsEmail,
} from 'class-validator';

@InputType()
export class RegisterProfileCompany {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @Field(() => String)
  readonly profileId: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly name: string;

  @IsNotEmpty()
  @IsPositive()
  @Field(() => Number)
  readonly NIT: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly RUT: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly prefix: string;

  @IsNotEmpty()
  @IsPositive()
  @Field(() => Number)
  readonly phone: number;

  @IsNotEmpty()
  @IsPositive()
  @Field(() => Number)
  readonly nequi: number;

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  readonly emailCompany: string;
}
