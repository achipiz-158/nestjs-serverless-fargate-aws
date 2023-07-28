import { UseGuards } from '@nestjs/common';
import { Query, Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGQLAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-auth.guard';
import { RoleName } from 'src/shared';
import { Message } from '../entities';
import { ChatService } from '../services/chat.service';
import { CreateMessageInput } from '../dto/chat/message.input';
import { AppGateway } from '../gateways/chat.gateway';
import { GetMessagesInput } from '../dto/chat/get_message.input';

@UseGuards(JwtGQLAuthGuard, RolesGuard)
@Roles(RoleName.TRIPPSTER, RoleName.HOST)
@Resolver(() => Message)
export class ChatResolver {
  constructor(
    private readonly chatService: ChatService,
    private readonly appGateway: AppGateway,
  ) {}

  @Mutation(() => Boolean)
  async sendMessage(
    @Args('CreateMessageInput') args: CreateMessageInput,
    @Context() context,
  ) {
    const result = await this.chatService.sendMessage(
      args,
      context.req.user.sub,
    );
    args.chatId
      ? this.appGateway.server.emit(`${args.chatId}`, {
          chatId: args.chatId,
        })
      : this.appGateway.server.emit(`${args.userId}`, {
          receiverId: args.userId,
        });
    return result;
  }

  @Query(() => Message)
  async getLastMessage(@Args('chatId') chatId: string, @Context() context) {
    return this.chatService.getLastMessage(chatId, context.req.user.sub);
  }

  @Query(() => [Message])
  async getMessages(
    @Args('GetMessagesInput') chatId: GetMessagesInput,
    @Context() context,
  ) {
    return this.chatService.getMessages(chatId, context.req.user.sub);
  }
}
