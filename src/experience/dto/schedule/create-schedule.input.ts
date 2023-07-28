import { InputType, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

@InputType()
export class CreateScheduleInput {
  @IsNotEmpty()
  @IsDate()
  @Field(() => Date)
  readonly startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Field(() => Date)
  readonly endDate: Date;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly duration: string;

  @IsOptional()
  @IsArray()
  @Field(() => [String], { nullable: true })
  readonly monday: string[];

  @IsOptional()
  @IsPositive()
  @Field(() => Number, { nullable: true })
  readonly mondayQuotas: number;

  @IsOptional()
  @IsArray()
  @Field(() => [String], { nullable: true })
  readonly tuesday: string[];

  @IsOptional()
  @IsPositive()
  @Field(() => Number, { nullable: true })
  readonly tuesdayQuotas: number;

  @IsOptional()
  @IsArray()
  @Field(() => [String], { nullable: true })
  readonly wednesday: string[];

  @IsOptional()
  @IsPositive()
  @Field(() => Number, { nullable: true })
  readonly wednesdayQuotas: number;

  @IsOptional()
  @IsArray()
  @Field(() => [String], { nullable: true })
  readonly thursday: string[];

  @IsOptional()
  @IsPositive()
  @Field(() => Number, { nullable: true })
  readonly thursdayQuotas: number;

  @IsOptional()
  @IsArray()
  @Field(() => [String], { nullable: true })
  readonly friday: string[];

  @IsOptional()
  @IsPositive()
  @Field(() => Number, { nullable: true })
  readonly fridayQuotas: number;

  @IsOptional()
  @IsArray()
  @Field(() => [String], { nullable: true })
  readonly saturday: string[];

  @IsOptional()
  @IsPositive()
  @Field(() => Number, { nullable: true })
  readonly saturdayQuotas: number;

  @IsOptional()
  @IsArray()
  @Field(() => [String], { nullable: true })
  readonly sunday: string[];

  @IsOptional()
  @IsPositive()
  @Field(() => Number, { nullable: true })
  readonly sundayQuotas: number;

  @IsNotEmpty()
  @IsUUID()
  @Field(() => String)
  readonly trippId: string;
}
