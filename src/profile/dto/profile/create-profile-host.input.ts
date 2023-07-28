import { InputType, Field, Int, registerEnumType } from '@nestjs/graphql';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { DocumentType, Gender } from 'src/shared';

registerEnumType(DocumentType, {
  name: 'DocumentType',
});

registerEnumType(Gender, {
  name: 'Gender',
});

@InputType()
export class CreateProfileHostInput {
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
  @IsEnum(DocumentType)
  @Field(() => DocumentType)
  readonly documentType: string;

  @IsNotEmpty()
  @IsPositive()
  @Field(() => Int)
  readonly document: number;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @Field(() => String)
  readonly countryId: string;

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
