import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { PublicationService } from '../services/publication.service';
import { Publication, Tag } from '../entities';
import { JwtGQLAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePublicationInput } from '../dto/publication/create-publication-input';
import { CreateLikePublicationInput } from '../dto/publication/create-like-publication.inputs';
import { UbicationPublicationInput } from '../dto/publication/ubication-publication.input';
import { Follow } from 'src/profile/entities';

@Resolver(() => String)
export class PublicationResolver {
  constructor(private readonly publicationService: PublicationService) {}

  @Query(() => [Publication])
  publications() {
    return this.publicationService.findAll();
  }

  @Query(() => Publication)
  publicationById(@Args('publication_id') publication_id: string) {
    return this.publicationService.findOneById(publication_id);
  }

  @Mutation(() => Publication)
  @UseGuards(JwtGQLAuthGuard)
  likeDisLikePub(
    @Args('likePublication') like: CreateLikePublicationInput,
    @Context() ctx,
  ): Promise<Publication> {
    const profile_id = ctx.req.user.sub;
    return this.publicationService.likeDislikePub(like, profile_id);
  }

  @Mutation(() => Publication)
  @UseGuards(JwtGQLAuthGuard)
  async createPublication(
    @Args('publication') publication: CreatePublicationInput,
    @Context() ctx,
  ) {
    return this.publicationService.createPublication(
      publication,
      ctx.req.user.sub,
    );
  }

  @Query(() => [Publication])
  @UseGuards(JwtGQLAuthGuard)
  async findPublicationsByUser(@Context() ctx) {
    const authorId = ctx.req.user.sub;
    return this.publicationService.findPublicationByUser(authorId);
  }

  @Mutation(() => Publication)
  @UseGuards(JwtGQLAuthGuard)
  async ubicationPublication(
    @Args('ubicationPublication')
    ubicationPublication: UbicationPublicationInput,
  ) {
    return this.publicationService.ubicationPublication(ubicationPublication);
  }

  @Query(() => [Follow])
  @UseGuards(JwtGQLAuthGuard)
  async findFollowers(@Context() ctx) {
    const profile_id = ctx.req.user.sub;
    return this.publicationService.findFollowers(profile_id);
  }

  @Query(() => [Follow])
  @UseGuards(JwtGQLAuthGuard)
  async findFollowersByQuery(
    @Context() ctx,
    @Args('query') query: string,
  ): Promise<Follow[]> {
    const profile_id = ctx.req.user.sub;
    return this.publicationService.findFollowersByQuery(profile_id, query);
  }

  @Mutation(() => [Tag])
  async createTags(
    @Args('publicationID') publicationID: string,
    @Args('followIds', { type: () => [String] }) followIds: string[],
  ) {
    return this.publicationService.createTags(publicationID, followIds);
  }

  @Mutation(() => String)
  @UseGuards(JwtGQLAuthGuard)
  deletePublication(@Args('publication_id') publication_id: string) {
    return this.publicationService.deletePublication(publication_id);
  }
}
