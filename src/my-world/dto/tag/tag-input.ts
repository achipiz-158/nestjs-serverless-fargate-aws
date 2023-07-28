import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

@InputType()
export class CreateTagInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  publication: string;

  @IsNotEmpty()
  @IsObject()
  @Field(() => String)
  readonly follows: string;
}
