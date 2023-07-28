import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { GalleryProfileService, ProfileService } from '../services';
import { RestJwtAuthGuard } from 'src/auth/guards/rest-jwt-auth.guard';
import { GalleryProfileTypeDto } from '../dto/gallery_profile/gallery-profile-type.dto';
import { PayloadToken } from 'src/auth/model/payload-token.model';

@Controller('profile')
export class FilesController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly galleryProfileService: GalleryProfileService,
  ) {}

  @Post('DNI/front')
  @UseGuards(RestJwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadDNIFront(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const user = req.user as PayloadToken;
    return this.profileService.uploadFiletoHost(user.sub, file, 'front');
  }

  @Post('DNI/back')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(RestJwtAuthGuard)
  uploadDNIback(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const user = req.user as PayloadToken;
    return this.profileService.uploadFiletoHost(user.sub, file, 'back');
  }

  @Post('RUT')
  @UseGuards(RestJwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadRUT(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.profileService.uploadFiletoHost(user.sub, file, 'rut');
  }

  @Post('image')
  @UseGuards(RestJwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadImageProfile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: GalleryProfileTypeDto,
    @Req() req: Request,
  ) {
    const user = req.user as PayloadToken;
    return this.galleryProfileService.createGalleryProfile(
      user.sub,
      file,
      body.type,
    );
  }
}
