import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GalleryProfile } from '../entities';
import { ProfileService } from '.';
import { S3Service } from 'src/aws/services/s3.service';
import { TypeGalleryProfile } from 'src/shared/enum/type_gallery_profile.enum';
import { GraphQLError } from 'graphql';

@Injectable()
export class GalleryProfileService {
  constructor(
    @InjectRepository(GalleryProfile)
    private readonly galleryProfileRepository: Repository<GalleryProfile>,
    private readonly profileService: ProfileService,
    private readonly s3Service: S3Service,
  ) {}

  async createGalleryProfile(
    profileId: string,
    file: Express.Multer.File,
    type: TypeGalleryProfile = TypeGalleryProfile.DEFAULT,
  ) {
    if (file.size > 5242880) {
      throw new HttpException(
        'The image size must be less than 5MB',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      throw new HttpException(
        'Only jpg, jpeg or png images are allowed',
        HttpStatus.BAD_REQUEST,
      );
    }

    const profile = await this.profileService.findOneById(profileId);
    const files = await this.galleryProfileRepository.find({
      where: {
        profile: { id: profileId },
        type: type,
      },
      relations: {
        profile: true,
      },
    });
    if (files.length > 0 && type === TypeGalleryProfile.PRIMARY) {
      throw new HttpException(
        'You can only have one primary image',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (files.length > 0 && type === TypeGalleryProfile.SECUNDARY) {
      throw new HttpException(
        'You can only have one secundary image',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (files.length > 3 && type === TypeGalleryProfile.DEFAULT) {
      throw new HttpException(
        'You can only have four default images',
        HttpStatus.BAD_REQUEST,
      );
    }
    const { Location, Key } = await this.s3Service.uploadFile(
      file.buffer,
      file.originalname.replace(/.*\./, ''),
      'user_gallery',
    );
    const galleryProfile = await this.galleryProfileRepository.create({
      url: Location,
      type: type,
      key: Key,
      profile,
    });
    return {
      id: await (await this.galleryProfileRepository.save(galleryProfile)).id,
    };
  }

  async deleteGalleryProfile(profileId: string, galleryProfileId: string) {
    const profile = await this.profileService.findOneById(profileId);
    const galleryProfile = await this.galleryProfileRepository.findOne({
      where: {
        id: galleryProfileId,
        profile: { id: profile.id },
      },
    });
    if (!galleryProfile) {
      throw new GraphQLError('The image does not exist');
    }
    await this.s3Service.deleteFile(galleryProfile.key);
    await this.galleryProfileRepository.delete(galleryProfileId);
    return true;
  }

  async findAllByUserId(profileId: string) {
    const profile = await this.profileService.findOneById(profileId);
    const galleryProfile = await this.galleryProfileRepository.find({
      where: {
        profile: { id: profile.id },
      },
    });
    return galleryProfile;
  }
}
