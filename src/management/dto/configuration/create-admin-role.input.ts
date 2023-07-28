import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateAdminRoleInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly rol: string;

  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  @Field(() => [String])
  readonly permissions: string[];
}
