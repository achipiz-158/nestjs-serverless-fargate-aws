import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { JwtGQLAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RatingService } from '../services/rating.service';
import { Rating } from '../entities';
import { ExistRateResponse } from '../dto/exist_rate.response';

@UseGuards(JwtGQLAuthGuard)
@Resolver('Rating')
export class RatingResolver {
  constructor(private readonly ratingService: RatingService) {}

  @Query(() => [Rating])
  async commentsTripp(@Args('tripId') trippId: string) {
    return this.ratingService.getCommentsTripp(trippId);
  }

  @Query(() => [Rating])
  async commentsHost(@Args('hostId') hostId: string) {
    return this.ratingService.getCommentsHost(hostId);
  }

  @Query(() => ExistRateResponse)
  async verifyRate(
    @Args('bookingId') bookingId: string,
    @Context() context,
  ): Promise<ExistRateResponse> {
    const userId = context.req.user.sub;
    const existRate = await this.ratingService.isRate(bookingId, userId);
    return existRate;
  }
}
