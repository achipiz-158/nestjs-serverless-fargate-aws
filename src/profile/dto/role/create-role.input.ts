import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { RoleName } from 'src/shared';

@InputType()
export class CreateRoleInput {
  @IsNotEmpty()
  @IsUUID()
  @Field(() => String)
  readonly profile: string;

  @IsNotEmpty()
  @IsEnum(RoleName)
  @Field(() => String)
  readonly role: string;
}
