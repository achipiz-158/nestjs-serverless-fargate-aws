import { CreateManagementInput } from './create-management.input';
import { PartialType } from '@nestjs/mapped-types';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateManagementInput extends PartialType(CreateManagementInput) {
  @Field(() => String)
  id: string;
}
