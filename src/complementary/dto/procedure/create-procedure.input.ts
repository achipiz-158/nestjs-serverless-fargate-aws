import { InputType, Field } from '@nestjs/graphql';
import { Profile } from '../../../profile/entities/profile.entity';
import { Tripp } from '../../../experience/entities/tripp.entity';

import { IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';
import { Cancellation } from 'src/bookings/entities';

@InputType()
export class CreateProcedureInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly type: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly affair: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  @Field(() => String)
  readonly applicant: Profile;

  @IsOptional()
  @IsString()
  @Field(() => String)
  readonly description?: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  @Field(() => String)
  readonly tripp?: Tripp;

  @IsOptional()
  @IsString()
  @IsUUID()
  @Field(() => String)
  readonly cancellationId?: Cancellation;
}
