import { InputType, Field } from '@nestjs/graphql';

import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdatePublishedInput {
  @IsNotEmpty()
  @IsUUID()
  @Field(() => String)
  readonly procedureId: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly type: string;

  @IsOptional()
  @IsString()
  @Field(() => String)
  readonly description: string;
}
