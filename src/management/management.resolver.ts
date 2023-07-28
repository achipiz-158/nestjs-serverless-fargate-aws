import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CreateManagementInput, UpdateManagementInput } from 'src/profile/dto';
import { Profile, Role } from 'src/profile/entities';
import { RolesService, ProfileService } from 'src/profile/services';
import { AuthorizeHostInput, CreateAdminRoleInput, UsersInput } from './dto';
import { Answer } from './entities/answer.entity';
import { UseGuards } from '@nestjs/common';
import { JwtGQLAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver('Management')
export class ManagementResolver {
  constructor(
    private readonly userService: ProfileService,
    private readonly roleService: RolesService,
  ) {}

  //usuarios
  @UseGuards(JwtGQLAuthGuard)
  @Mutation(() => Profile || Answer)
  async authorizeHost(
    @Args('authorizeHostInput') authorizeHostInput: AuthorizeHostInput,
    @Context() context,
  ): Promise<Profile | Answer> {
    return await this.userService.hostAuthorization(
      context.req.user,
      authorizeHostInput,
    );
  }

  @Mutation(() => Profile)
  createManager(
    @Args('createManagementInput') createManagementInput: CreateManagementInput,
  ): Promise<Profile> {
    return this.userService.createManager(createManagementInput);
  }

  @Query(() => [Profile], { name: 'users' })
  findAll(@Args('usersInput') usersInput: UsersInput) {
    if (usersInput.verifiedHost !== undefined)
      return this.userService.findAllRoles();
    else this.userService.findAllRoles();
  }

  @Query(() => Profile)
  user(@Args('id') id: string) {
    return this.userService.findUserId(id);
  }

  @Mutation(() => Profile)
  async updateManager(
    @Args('updateManagementInput') updateManagementInput: UpdateManagementInput,
  ) {
    return await this.userService.updateManager(
      updateManagementInput.id,
      updateManagementInput,
    );
  }

  // configuracion
  @Mutation(() => Role)
  async createAdminRole(
    @Args('createAdminRoleInput') createAdminRoleInput: CreateAdminRoleInput,
  ): Promise<Role> {
    return await this.roleService.createAdministrativeRole(
      createAdminRoleInput,
    );
  }

  @Query(() => [Role], { name: 'roles' })
  roles() {
    return this.roleService.findAll();
  }

  // @Query('management')
  // findAll() {
  //   return this.managementService.findAll();
  // }

  // @Mutation('removeManagement')
  // remove(@Args('id') id: number) {
  //   return this.managementService.remove(id);
  // }
}
