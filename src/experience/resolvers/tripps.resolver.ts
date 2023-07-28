import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Mutation,
  Args,
  Query,
  Context,
  registerEnumType,
} from '@nestjs/graphql';
import { JwtGQLAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TypeGallery } from 'src/shared/enum/type_gallery.enum';
import {
  Nearby,
  CreateScheduleInput,
  CreateTrippInput,
  FiltersTrippInput,
  UpdatePublishedInput,
  ParamNearbyTrippInput,
  UbicationTrippInput,
} from '../dto';

import { WeekResponse } from '../dto/week.response';
import { Cart, Gallery, Schedule, Tripp } from '../entities';
import { GalleryService, ScheduleService, TrippsService } from '../services';
import { AdminAuthGuard } from 'src/auth/guards/admin-auth.guard';
import { CartInput } from '../dto/cart/cart.input';
import { CartService } from '../services/cart.service';
import { RatingTrippInput } from '../dto/tripp/rating-tripp.input';

registerEnumType(TypeGallery, {
  name: 'TypeGallery',
});

@Resolver(() => String)
export class TrippsResolver {
  constructor(
    private readonly trippsService: TrippsService,
    private readonly scheduleService: ScheduleService,
    private readonly galleryService: GalleryService,
    private readonly cartService: CartService,
  ) {}

  //tripp

  @Mutation(() => Tripp)
  @UseGuards(JwtGQLAuthGuard)
  async createTrippOrUpdate(
    @Args('tripp') tripp: CreateTrippInput,
    @Context() ctx,
  ) {
    return this.trippsService.createTrippOrUpdate(tripp, ctx.req.user.sub);
  }

  @Mutation(() => Tripp)
  @UseGuards(JwtGQLAuthGuard)
  async ubicationTripp(
    @Args('ubicationTripp') ubicationTripp: UbicationTrippInput,
  ) {
    return this.trippsService.ubicationTripp(ubicationTripp);
  }

  @Query(() => [Tripp])
  @UseGuards(JwtGQLAuthGuard)
  SuggestionsTripps(@Context() ctx) {
    return this.trippsService.findSuggestionsTripps(ctx.req.user.sub);
  }

  @Query(() => [Tripp])
  tripps() {
    return this.trippsService.findAll();
  }

  @Query(() => Tripp)
  @UseGuards(JwtGQLAuthGuard)
  tripp(@Args('id') id: string) {
    return this.trippsService.findOneById(id);
  }

  @Query(() => [Tripp], { nullable: true })
  @UseGuards(JwtGQLAuthGuard)
  async getTrippsByHost(@Context() ctx) {
    return this.trippsService.myTripps(ctx.req.user.sub);
  }

  @Mutation(() => String)
  @UseGuards(JwtGQLAuthGuard)
  async pauseTripp(@Args('id') id: string) {
    return this.trippsService.pauseExperience(id);
  }

  //schedule

  @Mutation(() => Schedule)
  async createSchedule(
    @Args('createScheduleInput') createScheduleInput: CreateScheduleInput,
  ) {
    return this.scheduleService.createSchedule(createScheduleInput);
  }
  @Query(() => Schedule)
  async schedule(@Args('id') id: string) {
    return this.scheduleService.getSchedule(id);
  }

  @Query(() => [WeekResponse])
  async week(@Args('id') id: string) {
    return this.scheduleService.getWeek(id);
  }

  @Query(() => [Gallery], { nullable: true })
  @UseGuards(JwtGQLAuthGuard)
  async getTypeGallery(
    @Args('trippId') trippId: string,
    @Args('type', { type: () => TypeGallery }) type: TypeGallery,
  ) {
    return this.galleryService.getGalleryByTrippAndByType(trippId, type);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtGQLAuthGuard)
  async removeGallery(@Args('id') id: string) {
    const gallery = await this.galleryService.removeGallery(id);
    return gallery.affected > 0;
  }

  @Query(() => [Tripp])
  @UseGuards(JwtGQLAuthGuard)
  searcherTripps(@Args('filters') filters: FiltersTrippInput) {
    return this.trippsService.searcherTripps(filters);
  }

  @Mutation(() => Tripp)
  @UseGuards(AdminAuthGuard)
  updateStateTripp(
    @Args('stateTrippInput') stateTrippInput: UpdatePublishedInput,
    @Context() context,
  ) {
    return this.trippsService.updateStateTripp(
      context.req.user.sub,
      stateTrippInput,
    );
  }

  @Query(() => [Nearby], { nullable: true })
  @UseGuards(JwtGQLAuthGuard)
  async trippsNearby(
    @Args('paramNearbyTripps') payload: ParamNearbyTrippInput,
  ) {
    return await this.trippsService.getTrippsNearby(payload);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtGQLAuthGuard)
  async addItemToCart(@Args('trippItem') tripp: CartInput, @Context() ctx) {
    return this.cartService.addToCart(ctx.req.user.sub, tripp);
  }

  @Query(() => [Cart])
  @UseGuards(JwtGQLAuthGuard)
  async getCart(@Context() ctx) {
    return this.cartService.getCart(ctx.req.user.sub);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtGQLAuthGuard)
  async removeItemFromCart(
    @Args('ItemCartId') trippId: string,
    @Context() ctx,
  ) {
    return this.cartService.removeItemCart(ctx.req.user.sub, trippId);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtGQLAuthGuard)
  async toggleSelectItemCart(
    @Args('ItemCartId') trippId: string,
    @Context() ctx,
  ) {
    return this.cartService.selectToggleItemCart(ctx.req.user.sub, trippId);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtGQLAuthGuard)
  async createRatingTripp(
    @Args('createRatingTrippInput') createRatingInput: RatingTrippInput,
    @Context() ctx,
  ) {
    return this.trippsService.addRatingTripp(
      createRatingInput,
      ctx.req.user.sub,
    );
  }

  @Query(() => [Tripp])
  @UseGuards(JwtGQLAuthGuard)
  SuggestionsTrippsByProfile(@Args('userId') profileId: string) {
    return this.trippsService.findSuggestionsTrippsByProfile(profileId);
  }

  @Query(() => [Tripp])
  @UseGuards(JwtGQLAuthGuard)
  async SuggestionsTrippsByHost(@Args('userId') profileId: string) {
    return this.trippsService.findTrippsByHost(profileId);
  }
}
