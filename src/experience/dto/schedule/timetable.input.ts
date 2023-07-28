import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { Days } from 'src/shared';

registerEnumType(Days, {
  name: 'Days',
});

@InputType()
export class TimetableInput {
  @IsNotEmpty()
  @IsEnum(Days)
  @Field(() => Days)
  readonly day: string;

  @IsNotEmpty()
  @IsPositive()
  @Field(() => Number)
  readonly quotas: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @Field(() => [String])
  readonly timetable: string[];
}
