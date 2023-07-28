import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Favorite, Tripp } from '../entities';
import { FavoriteService } from '../services';
import { UseGuards } from '@nestjs/common';
import { JwtGQLAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => Favorite)
export class FavoriteResolver {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Mutation(() => Boolean)
  @UseGuards(JwtGQLAuthGuard)
  async toggleFavorite(@Args('trippId') trippId: string, @Context() ctx) {
    return this.favoriteService.toggleFavorite(ctx.req.user.sub, trippId);
  }

  @Query(() => [Tripp])
  @UseGuards(JwtGQLAuthGuard)
  async getMyFavorites(@Context() ctx) {
    return this.favoriteService.getFavorites(ctx.req.user.sub);
  }

  @Query(() => [Tripp])
  @UseGuards(JwtGQLAuthGuard)
  async getFavoritesByUser(@Args('userId') userId: string) {
    return this.favoriteService.getFavorites(userId);
  }
}
