import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

@InputType()
export class CreateMediaInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly url: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly type: string;

  @IsNotEmpty()
  @IsObject()
  @Field(() => String)
  readonly publication: string;
}
