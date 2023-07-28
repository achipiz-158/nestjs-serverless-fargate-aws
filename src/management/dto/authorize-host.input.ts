import { InputType, Field } from '@nestjs/graphql';

import { IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';

@InputType()
export class AuthorizeHostInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly type: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @Field(() => String)
  readonly procedureId: string;

  @IsOptional()
  @IsString()
  @Field(() => String)
  readonly description: string;
}
