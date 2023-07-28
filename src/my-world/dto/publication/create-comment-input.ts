import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  publication_id: string;

  @IsNotEmpty()
  @Field(() => String)
  content: string;
}
