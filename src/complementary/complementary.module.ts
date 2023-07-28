import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplementaryResolver } from './resolvers/complementary.resolver';
import {
  City,
  Country,
  Category,
  Procedure,
  Language,
  Rating,
} from './entities';
import {
  CategoryService,
  CityService,
  CountryService,
  LanguageService,
  ProcedureService,
} from './services';
import { MetadataService } from './services/metadata.service';
import { Metadata } from './entities/metadata.entity';
import { RatingService } from './services/rating.service';
import { RatingResolver } from './resolvers/rating.resolver';
import { BookingsModule } from 'src/bookings/bookings.module';
import { CityResolver } from './resolvers/city.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      City,
      Country,
      Language,
      Procedure,
      Metadata,
      Rating,
    ]),
    BookingsModule,
  ],
  providers: [
    ComplementaryResolver,
    LanguageService,
    CountryService,
    CityService,
    CategoryService,
    ProcedureService,
    MetadataService,
    RatingService,
    RatingResolver,
    CityResolver,
  ],
  exports: [
    CountryService,
    LanguageService,
    CityService,
    CategoryService,
    ProcedureService,
    MetadataService,
    RatingService,
  ],
})
export class ComplementaryModule {}
