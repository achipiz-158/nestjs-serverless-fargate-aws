import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UbicationPublicationInput {
  @IsNotEmpty()
  @Field(() => Number)
  readonly latitud: number;

  @IsNotEmpty()
  @Field(() => Number)
  readonly longitud: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly publicationId: string;
}
