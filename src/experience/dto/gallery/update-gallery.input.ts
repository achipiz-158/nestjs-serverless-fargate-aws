import { CreateGalleryInput } from './create-gallery.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGalleryInput extends PartialType(CreateGalleryInput) {
  @Field(() => Int)
  id: number;
}
