import { CreateTrippInput } from './create-tripp.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTrippInput extends PartialType(CreateTrippInput) {
  @Field(() => Int)
  id: string;
}
