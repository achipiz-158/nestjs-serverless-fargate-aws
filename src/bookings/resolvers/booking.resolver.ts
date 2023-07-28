import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtGQLAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Booking, Cancellation } from '../entities';
import { BookingService, CancellationService } from '../services';
import { Bookigs } from '../dto/booking/bookings.dto';
import { CreateCancellationInput } from '../dto';

@Resolver(() => Booking)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Query(() => [Booking], { name: 'bookings' })
  @UseGuards(JwtGQLAuthGuard)
  bookings(@Context() context) {
    return this.bookingService.getBookingsByUser(context.req.user.sub);
  }

  @Query(() => [Bookigs], { name: 'bookingsByHost' })
  @UseGuards(JwtGQLAuthGuard)
  bookingsByHost(@Context() context) {
    return this.bookingService.getBookingsByHost(context.req.user.sub);
  }

  @Query(() => [Booking], { name: 'nextTripps' })
  @UseGuards(JwtGQLAuthGuard)
  nextTripps(@Context() context) {
    return this.bookingService.getNextTripps(context.req.user.sub);
  }

  @Query(() => [Booking], { name: 'memoriesTripps' })
  @UseGuards(JwtGQLAuthGuard)
  memoriesTripps(@Context() context) {
    return this.bookingService.getMyMemoriesTripps(context.req.user.sub);
  }
}
