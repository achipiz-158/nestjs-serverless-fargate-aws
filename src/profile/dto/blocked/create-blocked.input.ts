import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateBlockedInput {
  @IsNotEmpty()
  @IsUUID()
  @Field(() => String)
  readonly userId: string;
}
