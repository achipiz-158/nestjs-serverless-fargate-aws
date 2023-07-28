import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

@InputType()
export class CreateGalleryInput {
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
  readonly tripp: string;
}
