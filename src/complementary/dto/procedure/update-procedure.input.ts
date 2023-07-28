import { PartialType } from '@nestjs/mapped-types';
import { Field, InputType } from '@nestjs/graphql';
import { CreateProcedureInput } from './create-procedure.input';

@InputType()
export class UpdateProceduretInput extends PartialType(CreateProcedureInput) {
  @Field(() => String)
  id: string;
}
