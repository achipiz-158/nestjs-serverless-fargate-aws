import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrippsResolver } from './resolvers/tripps.resolver';
import { Gallery, Tripp, Schedule, Favorite } from './entities';
import { Profile } from 'src/profile/entities/profile.entity';
import { Booking } from 'src/bookings/entities/booking.entity';
import { FilesController } from './controllers/files.controller';
import { AwsModule } from 'src/aws/aws.module';
import { GalleryService } from './services/gallery.service';
import { ProfileModule } from 'src/profile/profile.module';
import { FavoriteService, ScheduleService, TrippsService } from './services';
import { ComplementaryModule } from 'src/complementary/complementary.module';
import { Week } from './entities/week.entity';
import { Billing } from 'src/epayco/entities/billing.entity';
import { Answer } from 'src/management/entities';
import { AnswerService } from 'src/management/services';
import { CartService } from './services/cart.service';
import { Cart } from './entities/cart.entity';
import { BookingService } from 'src/bookings/services';
import { BookingsModule } from 'src/bookings/bookings.module';
import { FavoriteResolver } from './resolvers/favorite.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Answer,
      Tripp,
      Gallery,
      Schedule,
      Profile,
      Booking,
      Week,
      Billing,
      Favorite,
      Cart,
    ]),
    AwsModule,
    ProfileModule,
    ComplementaryModule,
    BookingsModule,
  ],
  controllers: [FilesController],
  providers: [
    AnswerService,
    BookingService,
    GalleryService,
    TrippsResolver,
    TrippsService,
    ScheduleService,
    FavoriteService,
    FavoriteResolver,
    CartService,
  ],
  exports: [ScheduleService],
})
export class ExperiencesModule {}
