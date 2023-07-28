import { IsOptional, IsString } from 'class-validator';
import { TypeGalleryProfile } from 'src/shared/enum/type_gallery_profile.enum';

export class GalleryProfileTypeDto {
  @IsString()
  @IsOptional()
  type?: TypeGalleryProfile;
}
