import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UbicationTrippInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly cityId: string;

  @IsNotEmpty()
  @Field(() => Number)
  readonly latitud: number;

  @IsNotEmpty()
  @Field(() => Number)
  readonly longitud: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly trippId: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly locationName: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly locationDescription: string;
}
