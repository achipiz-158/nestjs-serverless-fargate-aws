import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { Wallet } from 'src/profile/entities';
import { TypeTrasaction } from 'src/shared/enum/type.trasaction.enum';

@InputType()
export class CreateTransactionInput {

  @IsNotEmpty()
  @IsEnum(TypeTrasaction)
  @Field(() => String)
  readonly type: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Number)
  readonly value: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly description: string;

  @IsNotEmpty()
  @Field(() => Wallet)
  readonly wallet: Wallet;

}
