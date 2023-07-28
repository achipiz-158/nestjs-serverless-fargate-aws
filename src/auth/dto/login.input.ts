import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginInput {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly password: string;
}
