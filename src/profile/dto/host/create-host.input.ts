import { Field } from '@nestjs/graphql';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { DocumentType } from 'src/shared';

export class CreateHostInput {
  @IsNotEmpty()
  @IsEnum(DocumentType)
  readonly documentType: string;

  @IsNotEmpty()
  @IsPositive()
  readonly document: number;

  @IsNotEmpty()
  @IsString({ each: true })
  @IsUUID('4', { each: true })
  readonly languagesIds: string[];

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly company?: string;

  @IsOptional()
  @IsPositive()
  @Field(() => Number, { nullable: true })
  readonly NIT?: number;
}
