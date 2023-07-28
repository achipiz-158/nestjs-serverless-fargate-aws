import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from 'src/aws/services/s3.service';
import { Gallery } from 'src/experience/entities/gallery.entity';
import { TypeGallery } from 'src/shared/enum/type_gallery.enum';
import { Repository } from 'typeorm';
import { GalleryTypeDto } from '../dto/gallery/gallery-type.dto';
import { TrippsService } from './tripps.service';
import { HttpExceptionFilter } from 'src/shared';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>,
    private readonly s3Service: S3Service,
    private readonly trippService: TrippsService,
  ) {}

  async addFileToGallery(
    trippID: string,
    file: Express.Multer.File,
    data: GalleryTypeDto,
  ) {
    const tripp = await this.trippService.findOneById(trippID);
    const files = await this.galleryRepository.find({
      where: {
        tripp: { id: trippID },
        type: data.type,
      },
    });
    if (data.type === TypeGallery.PRIMARY && files.length > 1) {
      throw new HttpException(
        'You can only have one primary image',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (data.type === TypeGallery.SECUNDARY && files.length > 1) {
      throw new HttpException(
        'You can only have one secundary image',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (data.type === TypeGallery.FRONT && files.length > 1) {
      throw new HttpException(
        'You can only have one front image',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (data.type === TypeGallery.DEFAULT && files.length > 3) {
      throw new HttpException(
        'You can only have three default images',
        HttpStatus.BAD_REQUEST,
      );
    }
    const { Location } = await this.s3Service.uploadFile(
      file.buffer,
      file.originalname.replace(/.*\./, ''),
      'gallery',
    );
    const gallery = await this.galleryRepository.create({
      url: Location,
      mimeType: file.mimetype,
      type: data.type,
      tripp,
    });
    return {
      id: await (await this.galleryRepository.save(gallery)).id,
    };
  }

  getGalleryByTrippAndByType(trippId: string, type: TypeGallery) {
    return this.galleryRepository.find({
      where: {
        tripp: { id: trippId },
        type,
      },
    });
  }

  removeGallery(id: string) {
    return this.galleryRepository.softDelete(id);
  }
}
