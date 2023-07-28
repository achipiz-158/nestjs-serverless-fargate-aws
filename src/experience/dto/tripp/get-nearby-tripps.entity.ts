import { IsNotEmpty, IsNumber } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ParamNearbyTrippInput {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Number)
  readonly latitud: number;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Number)
  readonly longitud: number;
}
