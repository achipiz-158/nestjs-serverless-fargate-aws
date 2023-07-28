import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateFavoriteInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  publication_id: string;

  profile_id?: string;
}
