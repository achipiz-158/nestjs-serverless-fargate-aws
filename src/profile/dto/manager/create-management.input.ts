import { InputType, Field } from '@nestjs/graphql';

import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateManagementInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly lastname: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Field(() => String)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @Field(() => String)
  readonly rol: string;
}
