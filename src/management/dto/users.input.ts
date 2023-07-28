import { InputType, Field } from '@nestjs/graphql';

import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

@InputType()
export class UsersInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly role: string;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  readonly verifiedHost: boolean;
}
