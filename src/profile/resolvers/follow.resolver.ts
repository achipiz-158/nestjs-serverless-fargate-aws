import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGQLAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-auth.guard';
import { RoleName } from 'src/shared';
import { Follow } from '../entities';
import { FollowService } from '../services';

@UseGuards(JwtGQLAuthGuard, RolesGuard)
@Roles(RoleName.TRIPPSTER, RoleName.HOST)
@Resolver(() => Follow)
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}

  @Mutation(() => Boolean)
  async followUser(
    @Args('userId') userId: string,
    @Context() context,
  ): Promise<boolean> {
    return await this.followService.followUser(context.req.user.sub, userId);
  }

  @Mutation(() => Boolean)
  async unfollowUser(
    @Args('userId') userId: string,
    @Context() context,
  ): Promise<boolean> {
    return await this.followService.unfollowUser(context.req.user.sub, userId);
  }
}
