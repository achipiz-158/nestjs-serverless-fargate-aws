import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateCancellationInput } from './create-cancellation.input';

@InputType()
export class UpdateCancellationInput extends PartialType(
  CreateCancellationInput,
) {
  @Field(() => Int)
  id: number;
}
