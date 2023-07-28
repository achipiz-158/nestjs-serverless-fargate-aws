import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsPositive, IsUUID } from 'class-validator';

@InputType()
export class CompleteHostInput {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @Field(() => String)
  readonly profileId: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly prefix: string;

  @IsNotEmpty()
  @IsPositive()
  @Field(() => Number)
  readonly phone: number;

  @IsNotEmpty()
  @IsPositive()
  @Field(() => Number)
  readonly nequi: number;
}
