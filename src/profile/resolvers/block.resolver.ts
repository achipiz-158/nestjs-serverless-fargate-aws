import { JwtGQLAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Blocked } from '../entities';
import { RolesGuard } from 'src/auth/guards/roles-auth.guard';
import { RoleName } from 'src/shared';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { BlockService } from '../services/block.service';
import { CreateBlockedInput } from '../dto/blocked/create-blocked.input';

@UseGuards(JwtGQLAuthGuard, RolesGuard)
@Roles(RoleName.TRIPPSTER, RoleName.HOST)
@Resolver(() => Blocked)
export class BlockResolver {
  constructor(private readonly blockService: BlockService) {}

  @Mutation(() => Boolean)
  async blockUser(
    @Args('blockInput') blockedInput: CreateBlockedInput,
    @Context() context,
  ): Promise<boolean> {
    return await this.blockService.block(
      blockedInput.userId,
      context.req.user.sub,
    );
  }

  @Mutation(() => Boolean)
  async unblockUser(
    @Args('blockInput') blockedInput: CreateBlockedInput,
    @Context() context,
  ): Promise<boolean> {
    return await this.blockService.unblock(
      blockedInput.userId,
      context.req.user.sub,
    );
  }
}
