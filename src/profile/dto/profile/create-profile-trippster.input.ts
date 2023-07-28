import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { Gender } from 'src/shared';

registerEnumType(Gender, {
  name: 'Gender',
});

@InputType()
export class CreateProfileTrippsterInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly lastname: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  @Field(() => Gender)
  readonly gender: string;

  @IsNotEmpty()
  @IsDate()
  @Field(() => Date)
  readonly dateOfBirth: Date;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @Field(() => String)
  readonly countryId: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly prefix: string;

  @IsNotEmpty()
  @IsPositive()
  @Field(() => Number)
  readonly phone: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly profession: string;
}
