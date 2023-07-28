import { InputType, Field } from '@nestjs/graphql';

import { IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';

@InputType()
export class CreateProcedureInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly type: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly state: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly description: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  @Field(() => String)
  readonly reportId: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  @Field(() => String)
  readonly trippId: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  @Field(() => String)
  readonly cancellationId: string;
}
