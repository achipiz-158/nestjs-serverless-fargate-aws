import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtGQLAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Booking, Cancellation } from '../entities';
import { CancellationService } from '../services';
import { CreateCancellationHostInput, CreateCancellationInput, FiltersCancellationInput } from '../dto';
import { RoleName } from 'src/shared';

@UseGuards(JwtGQLAuthGuard)
@Resolver(() => Cancellation)
export class CancellationResolver {
  constructor(
    private readonly cancellationService: CancellationService,
  ) { }

  @Query(() => [Cancellation], { name: 'cancellations' })
  cancellations(@Args('filters') filters: FiltersCancellationInput,@Context() context) {
    if(!context.req.user.roles.includes(RoleName.TRIPPSTER)  && !context.req.user.roles.includes(RoleName.HOST)){
      return this.cancellationService.findCancellations(filters)
    }else {
       throw new Error("does not have permissions");
    }
  }


  @Mutation(() => Cancellation)
  @UseGuards(JwtGQLAuthGuard)
  async travelerCancellation(
    @Args('cancellationInput') cancellationInput: CreateCancellationInput,
    @Context() context,
  ) {
    return this.cancellationService.generateCancellation(cancellationInput, context.req.user.id)
  }


  @Mutation(() => Booking)
  @UseGuards(JwtGQLAuthGuard)
  async hostCancellation(
    @Args('cancellationInput') cancellationInput: CreateCancellationHostInput,
    @Context() context,
  ) {
    return this.cancellationService.createCancellationHost( cancellationInput, context.req.user)
  }

  @Mutation(() => Cancellation)
  @UseGuards(JwtGQLAuthGuard)
  async submitCancellationStudy(
    @Args('cancellationId') cancellationId: string,
    @Context() context,
  ) {
    return this.cancellationService.submitCancellationToCaseStudy(cancellationId, context.req.user.id)
  }


  @Mutation(() => String)
  @UseGuards(JwtGQLAuthGuard)
  async answerCancellationStudy(
    @Args('cancellationInput') cancellationInput: string,
    @Context() context,
  ) {
    return 'este es para la cancelacion del triippter '
  }
}
