import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGQLAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-auth.guard';
import { RoleName } from 'src/shared';
import { Host } from '../entities';
import { HostService } from '../services';
import { RatingHostInput } from '../dto/host/rating-host.input';

@UseGuards(JwtGQLAuthGuard, RolesGuard)
@Roles(RoleName.TRIPPSTER, RoleName.HOST)
@Resolver(() => Host)
export class HostResolver {
  constructor(private readonly hostService: HostService) {}

  @Mutation(() => Boolean)
  async createRatingHost(
    @Args('createRatingHostInput') createRatingInput: RatingHostInput,
    @Context() ctx,
  ) {
    return this.hostService.addRatingHost(createRatingInput, ctx.req.user.sub);
  }
}
