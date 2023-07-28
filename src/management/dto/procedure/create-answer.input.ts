import { InputType, Field } from '@nestjs/graphql';
import { Procedure } from '../../../complementary/entities/procedure.entity';

import { IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';
import { Profile } from 'src/profile/entities';

@InputType()
export class CreateAnswerInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly type: string;

  @IsOptional()
  @IsString()
  @Field(() => String)
  readonly description: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  @Field(() => String)
  readonly manager: Profile;

  @IsOptional()
  @IsString()
  @IsUUID()
  @Field(() => String)
  readonly procedure: Procedure;
}
