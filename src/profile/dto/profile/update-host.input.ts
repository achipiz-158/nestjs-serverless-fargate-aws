import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { UpdateProfileInput } from './update-profile.input';

@InputType()
export class UpdateHostInput extends UpdateProfileInput {
  @IsNotEmpty()
  @IsString({ each: true })
  @IsUUID('4', { each: true })
  @Field(() => [String])
  readonly languagesIds: string[];

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly company?: string;

  @IsOptional()
  @IsPositive()
  @Field(() => Int, { nullable: true })
  readonly NIT?: number;
}
