import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Profile } from '../entities/profile.entity';
import { CreateProfileHostInput } from '../dto/profile/create-profile-host.input';
import { ProfileService } from '../services/profile.service';
import { CreateProfileTrippsterInput } from '../dto/profile/create-profile-trippster.input';
import { CompleteHostInput } from '../dto/profile/complete-host.input';
import { UseGuards } from '@nestjs/common';
import { JwtGQLAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChangePasswordInput } from '../dto/profile/change-password.input';
import { UpdateHostInput } from '../dto/profile/update-host.input';
import { UpdateProfileInput } from '../dto/profile/update-profile.input';
import { RolesGuard } from 'src/auth/guards/roles-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleName } from 'src/shared';
import { Chat } from '../entities/chat.entity';
import { IsBlockGuard } from 'src/auth/guards/is-block.guard';

@Roles(RoleName.TRIPPSTER, RoleName.HOST)
@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Roles()
  @UseGuards(JwtGQLAuthGuard)
  @Mutation(() => Profile)
  registerTripp(
    @Args('createTrippsterInput')
    createProfileInput: CreateProfileTrippsterInput,
    @Context() context,
  ) {
    return this.profileService.registerTrippster(
      createProfileInput,
      context.req.user.sub,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtGQLAuthGuard, RolesGuard)
  async registerHost(
    @Args('createHostInput') createProfileInput: CreateProfileHostInput,
    @Context() context,
  ): Promise<boolean> {
    return await this.profileService.registerHost(
      createProfileInput,
      context.req.user.sub,
    );
  }

  @Mutation(() => Profile)
  @UseGuards(JwtGQLAuthGuard, RolesGuard)
  async completeHost(
    @Args('completeHostInput') completeHostInput: CompleteHostInput,
  ): Promise<Profile> {
    return await this.profileService.completeProfileHost(completeHostInput);
  }

  @UseGuards(JwtGQLAuthGuard, RolesGuard)
  @Query(() => [Profile], { name: 'hosts' })
  hosts() {
    return this.profileService.findAll('HOST');
  }

  @UseGuards(JwtGQLAuthGuard, RolesGuard)
  @Query(() => [Profile], { name: 'trippsters' })
  trippsters() {
    return this.profileService.findAll('TRIPPSTER');
  }

  @Query(() => Profile)
  @UseGuards(JwtGQLAuthGuard, RolesGuard)
  async Profile(@Context() context) {
    return await this.profileService.findOneById(context.req.user.sub);
  }

  @Query(() => Profile)
  @UseGuards(JwtGQLAuthGuard, RolesGuard, IsBlockGuard)
  async ProfileById(@Args('userId') id: string) {
    return await this.profileService.findOneById(id);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtGQLAuthGuard, RolesGuard)
  async changePassword(
    @Args('changePasswordInput') changePasswordInput: ChangePasswordInput,
    @Context() context,
  ): Promise<boolean> {
    return await this.profileService.changePassword(
      context.req.user.sub,
      changePasswordInput,
    );
  }

  @Mutation(() => Profile)
  @UseGuards(JwtGQLAuthGuard, RolesGuard)
  async changeBio(
    @Args('bio') bio: string,
    @Context() context,
  ): Promise<Profile> {
    return await this.profileService.changeBio(context.req.user.sub, bio);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtGQLAuthGuard, RolesGuard)
  async revertHost(@Context() context): Promise<boolean> {
    return await this.profileService.revertHost(context.req.user.sub);
  }

  @Query(() => [Profile])
  @UseGuards(JwtGQLAuthGuard, RolesGuard)
  async getAssistans(
    @Args('hourId') hourId: string,
    @Args('date') date: string,
    @Context() context,
  ): Promise<Profile[]> {
    return await this.profileService.assistants(
      hourId,
      date,
      context.req.user.sub,
    );
  }

  @Roles(RoleName.HOST)
  @Mutation(() => Boolean)
  @UseGuards(JwtGQLAuthGuard, RolesGuard)
  async updateProfileHost(
    @Args('DataUpdateHostInput') data: UpdateHostInput,
    @Context() ctx,
  ) {
    return this.profileService.updateProfileHost(data, ctx.req.user.sub);
  }

  @Roles(RoleName.TRIPPSTER)
  @Mutation(() => Boolean)
  @UseGuards(JwtGQLAuthGuard, RolesGuard)
  async updateProfileTrippster(
    @Args('DataUpdateTrippsterInput') data: UpdateProfileInput,
    @Context() ctx,
  ) {
    return this.profileService.updateProfileTrippster(data, ctx.req.user.sub);
  }

  @Query(() => [Profile])
  @UseGuards(JwtGQLAuthGuard, RolesGuard)
  async getUsersBlocked(@Context() ctx) {
    return this.profileService.getUsersBlocked(ctx.req.user.sub);
  }

  @Query(() => [Profile])
  @UseGuards(JwtGQLAuthGuard, RolesGuard)
  async getUsersFollowing(@Context() ctx) {
    return this.profileService.getUsersFollowing(ctx.req.user.sub);
  }

  @Query(() => [Chat])
  @UseGuards(JwtGQLAuthGuard, RolesGuard)
  async getChats(@Context() context) {
    return this.profileService.getChats(context.req.user.sub);
  }

  @Query(() => String)
  @UseGuards(JwtGQLAuthGuard, RolesGuard, IsBlockGuard)
  async statusUser(@Context() context, @Args('userId') userId: string) {
    return this.profileService.statusUser(context.req.user.sub, userId);
  }
}
