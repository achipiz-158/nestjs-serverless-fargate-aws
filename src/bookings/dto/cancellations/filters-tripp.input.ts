import { IsOptional, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FiltersCancellationInput {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly state: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly date: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly tripp: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly host: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly booking: string;
}
