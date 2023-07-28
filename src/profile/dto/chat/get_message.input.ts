import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, ValidateIf } from 'class-validator';

// si userID no viene se obliga a que venga chatID
// si chatID no viene se obliga a que venga userID
@InputType()
export class GetMessagesInput {
  @ValidateIf((o) => !o.chatId)
  @IsNotEmpty()
  @IsUUID()
  @Field(() => String, { nullable: true })
  readonly userId?: string;

  @ValidateIf((o) => !o.userId)
  @IsNotEmpty()
  @IsUUID()
  @Field(() => String, { nullable: true })
  readonly chatId?: string;
}
