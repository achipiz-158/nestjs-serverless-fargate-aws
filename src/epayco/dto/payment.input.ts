import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsCreditCard,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class CreatePaymentInput {
  @IsNotEmpty()
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Field(() => Number)
  readonly value: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(4)
  @Field(() => Number)
  readonly docType: string;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(1)
  @MaxLength(20)
  @Field(() => String)
  readonly docNumber: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @Field(() => String)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @Field(() => String)
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @IsEmail()
  @Field(() => String)
  readonly email: string;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(1)
  @MaxLength(10)
  @Field(() => String)
  readonly cellPhone: string;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(1)
  @MaxLength(10)
  @Field(() => String)
  readonly phone: string;

  @IsNotEmpty()
  @IsCreditCard()
  @Field(() => String)
  readonly cardNumber: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(12)
  @Field(() => Int)
  readonly cardExpMonth: number;

  @IsNotEmpty()
  @IsInt()
  @Min(new Date().getFullYear())
  @Field(() => Int)
  readonly cardExpYear: number;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(1)
  @MaxLength(3)
  @Field(() => String)
  readonly cardCvc: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(36)
  @Field(() => Int)
  readonly dues: number;
}
