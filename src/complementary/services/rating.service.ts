import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingService } from 'src/bookings/services/booking.service';
import { Rating } from 'src/complementary/entities';
import { Profile } from 'src/profile/entities';
import { Repository } from 'typeorm';
import { ExistRateResponse } from '../dto/exist_rate.response';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    private readonly bookingService: BookingService,
  ) {}

  createRating(comment: string, rating: number, userId: Profile) {
    return this.ratingRepository.save({ comment, rating, profile: userId });
  }

  async getCommentsTripp(trippId: string) {
    const result = await this.ratingRepository.find({
      where: {
        tripp: {
          id: trippId,
        },
      },
      relations: {
        profile: true,
        tripp: true,
      },
    });
    return result;
  }

  async getCommentsHost(userId: string) {
    const result = await this.ratingRepository.find({
      where: {
        host: {
          profile: {
            id: userId,
          },
        },
      },
      relations: {
        profile: true,
        host: true,
      },
    });
    return result;
  }

  async isRate(bookingId: string, userId: string): Promise<ExistRateResponse> {
    const booking = await this.bookingService.getBooking(bookingId);
    const existRateTripp = await this.ratingRepository.findOne({
      where: {
        profile: {
          id: userId,
        },
        tripp: {
          id: booking.hour.schedule.tripp.id,
        },
      },
    });
    const existRateHost = await this.ratingRepository.findOne({
      where: {
        profile: {
          id: userId,
        },
        host: {
          id: booking.hour.schedule.tripp.host.host.id,
        },
      },
    });
    return {
      tripp: existRateTripp ? true : false,
      host: existRateHost ? true : false,
    };
  }
}
