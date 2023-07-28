import {
  Body,
  Controller,
  Param,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { MediaService } from '../services/media.service';
import { MediaTypeDto } from '../dto/media/media-type.dto';

@Controller('publication')
export class FilesPublicationController {
  constructor(private readonly mediaService: MediaService) {}

  @Post(':publicationID')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFilePublication(
    @Param('publicationID') publicationID: string,
    @Body() body: MediaTypeDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.mediaService.addFileToPublication(publicationID, files, body);
  }
}
