import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class ChangePasswordInput {
  @IsNotEmpty()
  @Field(() => String)
  readonly oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  @Field(() => String)
  readonly newPassword: string;
}
