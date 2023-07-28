import { InputType, Field } from '@nestjs/graphql';

import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class ReportTrippInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly affair: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @Field(() => String)
  readonly trippId: string;
}
