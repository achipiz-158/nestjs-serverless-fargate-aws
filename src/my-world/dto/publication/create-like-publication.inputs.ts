import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateLikePublicationInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  publication_id: string;

  profile_id?: string;
}
