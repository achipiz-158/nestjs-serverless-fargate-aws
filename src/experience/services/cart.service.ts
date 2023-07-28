import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileService } from 'src/profile/services';
import { Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';
import { ScheduleService } from './schedule.service';
import { CartInput } from '../dto/cart/cart.input';
import { GraphQLError } from 'graphql';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly profileService: ProfileService,
    private readonly scheduleService: ScheduleService,
  ) {}

  async addToCart(profileId: string, itemCart: CartInput) {
    const profile = await this.profileService.findUserId(profileId);
    const week = await this.scheduleService.getHour(itemCart.weekId);
    if (!week) {
      throw new GraphQLError('Week not found');
    }
    const cart = this.cartRepository.create({
      profile,
      hour: week,
      attendees: itemCart.attendees,
      date: itemCart.date,
    });
    await this.cartRepository.save(cart);
    return true;
  }

  async getCart(profileId: string) {
    const profile = await this.profileService.findUserId(profileId);
    const result = await this.cartRepository.find({
      where: {
        profile: {
          id: profile.id,
        },
      },
      relations: {
        profile: true,
        hour: {
          schedule: {
            tripp: {
              host: true,
              gallery: true,
              city: {
                country: true,
              },
              language: true,
            },
          },
        },
      },
    });
    return result;
  }

  async selectToggleItemCart(profileId: string, cartId: string) {
    const profile = await this.profileService.findUserId(profileId);
    const cart = await this.cartRepository.findOne({
      where: {
        profile: {
          id: profile.id,
        },
        id: cartId,
      },
      relations: ['profile', 'hour'],
    });
    await this.cartRepository.merge(cart, {
      isSelect: cart.isSelect ? false : true,
    });
    await this.cartRepository.save(cart);
    return true;
  }

  async removeItemCart(profileId: string, cartId: string) {
    const profile = await this.profileService.findUserId(profileId);
    const cart = await this.cartRepository.findOne({
      where: {
        profile: {
          id: profile.id,
        },
        id: cartId,
      },
      relations: ['profile', 'hour'],
    });
    await this.cartRepository.remove(cart);
    return true;
  }
}
