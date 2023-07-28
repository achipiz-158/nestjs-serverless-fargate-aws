import { UseGuards } from '@nestjs/common';
import { Query, Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGQLAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-auth.guard';
import { RoleName } from 'src/shared';
import { GalleryProfile } from '../entities';
import { GalleryProfileService } from '../services';

@UseGuards(JwtGQLAuthGuard, RolesGuard)
@Roles(RoleName.TRIPPSTER, RoleName.HOST)
@Resolver(() => GalleryProfile)
export class GalleryResolver {
  constructor(private readonly galleryProfileService: GalleryProfileService) {}

  @Mutation(() => Boolean)
  async deleteGalleryProfile(
    @Context() context,
    @Args('galleryId') galleryId: string,
  ): Promise<boolean> {
    return await this.galleryProfileService.deleteGalleryProfile(
      context.req.user.sub,
      galleryId,
    );
  }

  @Query(() => [GalleryProfile], { nullable: true })
  async galleryByUser(@Context() context): Promise<GalleryProfile[]> {
    return await this.galleryProfileService.findAllByUserId(
      context.req.user.sub,
    );
  }
}
