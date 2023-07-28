import {
  Body,
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GalleryService } from '../services/gallery.service';
import { Express } from 'express';
import { GalleryTypeDto } from '../dto/gallery/gallery-type.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post(':trippID')
  @UseInterceptors(FileInterceptor('file'))
  uploadFileTripp(
    @Param('trippID') trippID: string,
    @Body() body: GalleryTypeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.galleryService.addFileToGallery(trippID, file, body);
  }
}
