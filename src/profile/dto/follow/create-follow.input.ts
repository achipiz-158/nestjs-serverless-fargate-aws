import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateFollowInput {
  @IsNotEmpty()
  @IsUUID()
  @Field(() => String)
  readonly profile: string;

  @IsNotEmpty()
  @IsUUID()
  @Field(() => String)
  readonly Follower: string;
}
