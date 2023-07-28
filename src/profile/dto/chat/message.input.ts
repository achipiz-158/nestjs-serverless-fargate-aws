import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateMessageInput {
  @IsOptional()
  @IsUUID()
  @Field(() => String, { nullable: true })
  readonly userId?: string;

  @IsOptional()
  @IsUUID()
  @Field(() => String, { nullable: true })
  readonly chatId?: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly message: string;
}
