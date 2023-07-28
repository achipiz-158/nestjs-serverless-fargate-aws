import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from '../entities';
import { PublicationService } from './publication.service';
import { S3Service } from 'src/aws/services/s3.service';
import { MediaTypeDto } from '../dto/media/media-type.dto';
import { Express } from 'express';
@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    private readonly publicationService: PublicationService,
    private readonly s3Service: S3Service,
  ) {}

  async addFileToPublication(
    publicationID: string,
    files: Express.Multer.File[],
    data: MediaTypeDto,
  ) {
    const publication = await this.publicationService.findOneById(
      publicationID,
    );

    const mediaPromises = files.map(async (file) => {
      const { Location } = await this.s3Service.uploadFile(
        file.buffer,
        file.originalname.replace(/.*\./, ''),
        'publicationMyWorld',
      );
      const media = await this.mediaRepository.create({
        type: data.type,
        url: Location,
        mimeType: file.mimetype,
        publication,
      });
      return this.mediaRepository.save(media);
    });
    const savedMedia = await Promise.all(mediaPromises);
    const mediaIDs = savedMedia.map((media) => media.id);
    return { ids: mediaIDs };
  }
}
