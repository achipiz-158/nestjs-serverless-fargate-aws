import { IsOptional, IsString, IsUUID } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FiltersTrippInput {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly searchParameter?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly startDate?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly endDate?: string;

  @IsUUID()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly cityId?: string;
}
