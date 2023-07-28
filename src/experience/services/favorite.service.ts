import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from '../entities';
import { ProfileService } from 'src/profile/services';
import { TrippsService } from './tripps.service';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    private readonly trippService: TrippsService,
    private readonly profileService: ProfileService,
  ) {}

  async toggleFavorite(profileId: string, trippId: string) {
    const favorite = await this.favoriteRepository.findOne({
      where: {
        tripp: {
          id: trippId,
        },
        profile: {
          id: profileId,
        },
      },
    });
    if (favorite) {
      await this.favoriteRepository.remove(favorite);
      return true;
    } else {
      const profile = await this.profileService.findUserId(profileId);
      const tripp = await this.trippService.findOneById(trippId);
      await this.favoriteRepository.save({
        profile,
        tripp,
      });
      return true;
    }
  }

  async getFavorites(profileId: string) {
    const favorites = await this.favoriteRepository.find({
      where: {
        profile: {
          id: profileId,
        },
      },
      relations: {
        tripp: {
          host: {
            host: true,
          },
          city: {
            country: true,
          },
          language: true,
          gallery: true,
        },
        profile: true,
      },
      order: {
        createdAt: 'DESC',
      },
      cache: true,
    });
    return favorites.map((favorite) => favorite.tripp);
  }
}
