import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Context, Args, Mutation } from '@nestjs/graphql';
import { JwtGQLAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Category } from '../entities/category.entity';
import { Country } from '../entities/country.entity';
import { Language } from '../entities/language.entity';
import { CategoryService } from '../services/category.service';
import { LanguageService } from '../services/language.service';
import { CountryService } from '../services';

@UseGuards(JwtGQLAuthGuard)
@Resolver('Complementary')
export class ComplementaryResolver {
  constructor(
    private readonly languageService: LanguageService,
    private readonly categoryService: CategoryService,
    private readonly countryService: CountryService,
  ) {}

  @Query(() => [Country], { name: 'countries', nullable: 'items' })
  findCountries() {
    return this.countryService.findAll();
  }
  createCountry(@Args('name') name: string) {
    return this.countryService.create(name);
  }

  @Query(() => [Language], { name: 'languages', nullable: 'items' })
  findLanguages() {
    return this.languageService.findLanguages();
  }

  @Query(() => [Language], { nullable: 'items' })
  findLanguageByUser(@Context() context) {
    return this.languageService.myLanguages(context.req.user.sub);
  }

  @Mutation(() => Language)
  async createLanguage(@Args('name') name: string, @Args('sub') sub: string) {
    return this.languageService.create(sub, name);
  }

  @Query(() => [Category], { name: 'categories', nullable: 'items' })
  findCategories() {
    return this.categoryService.findAll();
  }
}
