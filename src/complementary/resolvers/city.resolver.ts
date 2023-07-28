import { UseGuards } from '@nestjs/common';
import { Query, Args, Resolver, Mutation } from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGQLAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-auth.guard';
import { RoleName } from 'src/shared';
import { CityService } from '../services';
import { City } from '../entities';

@UseGuards(JwtGQLAuthGuard, RolesGuard)
@Roles(RoleName.TRIPPSTER, RoleName.HOST)
@Resolver('City')
export class CityResolver {
  constructor(private readonly cityService: CityService) {}

  @Query(() => [City], { nullable: 'items' })
  findCitiesByCountry(@Args('country') country: string) {
    return this.cityService.findCityByCountry(country);
  }

  @Query(() => [City], { nullable: true })
  async findCityByName(@Args('name') name: string) {
    return this.cityService.findCitiesByName(name);
  }

  @Mutation(() => City)
  async createCity(
    @Args('name') name: string,
    @Args('countryId') countryId: string,
  ) {
    return this.cityService.create(name, countryId);
  }
}
