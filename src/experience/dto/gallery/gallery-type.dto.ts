import { IsOptional, IsString } from 'class-validator';
import { TypeGallery } from 'src/shared/enum/type_gallery.enum';

export class GalleryTypeDto {
  @IsString()
  @IsOptional()
  type: TypeGallery;
}
