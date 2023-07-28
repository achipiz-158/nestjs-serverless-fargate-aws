import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguageService } from 'src/complementary/services/language.service';
import { Repository } from 'typeorm';
import { CreateHostInput } from '../dto/host/create-host.input';
import { Host } from '../entities/host.entity';
import { Profile } from '../entities/profile.entity';
import { GraphQLError } from 'graphql';
import { S3Service } from 'src/aws/services/s3.service';
import { RatingService } from 'src/complementary/services/rating.service';
import { RatingHostInput } from '../dto/host/rating-host.input';
import { UpdateHostInput } from '../dto/profile/update-host.input';
import { BookingService } from 'src/bookings/services/booking.service';
import { ProfileService } from './profile.service';

@Injectable()
export class HostService {
  constructor(
    @Inject(forwardRef(() => ProfileService))
    private readonly profileService: ProfileService,
    @InjectRepository(Host)
    private readonly hostRepository: Repository<Host>,
    private readonly languageService: LanguageService,
    private readonly ratingService: RatingService,
    private readonly bookingService: BookingService,
    private readonly s3Service: S3Service,
  ) {}

  async findHost(id: string) {
    return await this.hostRepository.findOne({
      where: { id },
      relations: { rating: true },
    });
  }

  async updateDataHost(
    createHostInput: CreateHostInput,
    profile: Profile,
  ): Promise<Host> {
    try {
      const host = await this.hostRepository.findOne({
        where: { profile: { id: profile.id } },
        relations: {
          profile: true,
          languages: true,
        },
      });
      host.languages = await this.languageService.findManyByIds(
        createHostInput.languagesIds,
      );
      await this.hostRepository.merge(host, createHostInput);
      return await this.hostRepository.save(host);
    } catch (error) {
      if (error.code === '23505') {
        throw new GraphQLError('Este documento ya se encuentra registrado');
      }
      throw new GraphQLError(error);
    }
  }

  async createHostVoid(profile: Profile): Promise<Host> {
    try {
      const host = await this.hostRepository.create();
      host.profile = profile;
      return await this.hostRepository.save(host);
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  async completeHost(hostId: string, nequi: number) {
    try {
      const host = await this.hostRepository.findOne({
        where: { id: hostId },
      });
      if (!host) {
        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
      }
      await this.hostRepository.merge(host, { nequi });
      return await this.hostRepository.save(host);
    } catch (error) {}
  }

  async deleteHost(hostId: string) {
    try {
      const host = await this.hostRepository.findOne({
        where: { id: hostId },
        relations: ['company'],
      });
      if (!host) {
        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
      }
      return await this.hostRepository.delete(hostId);
    } catch (error) {
      console.log(error);
    }
  }

  async uploadDNIFront(userId: string, file: Express.Multer.File) {
    try {
      const host = await this.hostRepository.findOne({
        where: { profile: { id: userId } },
        relations: {
          profile: true,
        },
      });
      if (!host) {
        throw new GraphQLError('Profile not found');
      }
      if (host.frontIdentifyKey) {
        await this.s3Service.deleteFile(host.frontIdentifyKey);
      }
      const { Location, Key } = await this.s3Service.uploadFile(
        file.buffer,
        file.originalname.replace(/.*\./, ''),
        'DNI',
      );
      await this.hostRepository.merge(host, {
        frontIdentify: Location,
        frontIdentifyKey: Key,
      });
      return await this.hostRepository.save(host);
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  async uploadDNIBack(userId: string, file: Express.Multer.File) {
    try {
      const host = await this.hostRepository.findOne({
        where: { profile: { id: userId } },
      });
      if (!host) {
        throw new GraphQLError('Profile not found');
      }
      if (host.backIdentifyKey) {
        await this.s3Service.deleteFile(host.backIdentifyKey);
      }
      const { Location } = await this.s3Service.uploadFile(
        file.buffer,
        file.originalname.replace(/.*\./, ''),
        'DNI',
      );
      await this.hostRepository.merge(host, { backIdentify: Location });
      return await this.hostRepository.save(host);
    } catch (error) {
      console.log(error);
    }
  }

  async uploadRUT(userId: string, file: Express.Multer.File) {
    try {
      const host = await this.hostRepository.findOne({
        where: { profile: { id: userId } },
      });
      if (!host) {
        throw new GraphQLError('Profile not found');
      }
      if (host.RUTKey) {
        await this.s3Service.deleteFile(host.RUTKey);
      }
      const { Location } = await this.s3Service.uploadFile(
        file.buffer,
        file.originalname.replace(/.*\./, ''),
        'RUT',
      );
      this.hostRepository.merge(host, { RUT: Location });
      return this.hostRepository.save(host);
    } catch (error) {
      throw new GraphQLError(error);
    }
  }

  async addRatingHost(rating: RatingHostInput, userId: string) {
    const hostExistBooking = await this.bookingService.existBookingHost(
      rating.hostId,
      userId,
    );
    if (!hostExistBooking) {
      throw new GraphQLError('Tu no puedes calificar a este host');
    }
    const user = await this.profileService.findOneById(userId);
    const host = await this.findHost(rating.hostId);
    if (!host) {
      throw new GraphQLError('Host not found');
    }
    const ratingExist = await this.hostRepository.findOne({
      relations: {
        rating: {
          profile: true,
        },
      },
      where: { id: rating.hostId, rating: { profile: { id: userId } } },
    });
    const { stars, comment } = rating;
    const newRating = await this.ratingService.createRating(
      comment,
      stars,
      user,
    );
    host.rating.push(newRating);
    await this.hostRepository.save(host);
    return true;
  }

  async updateHost(hostId: string, host: UpdateHostInput) {
    try {
      const hostFound = await this.hostRepository.findOne({
        where: { id: hostId },
      });
      if (!hostFound) {
        throw new GraphQLError('Host not found');
      }
      const languages = await this.languageService.findManyByIds(
        host.languagesIds,
      );
      await this.hostRepository.merge(hostFound, {
        company: host.company,
        NIT: host.NIT,
        languages,
      });
      return await this.hostRepository.save(hostFound);
    } catch (error) {
      throw new GraphQLError(error);
    }
  }
}
