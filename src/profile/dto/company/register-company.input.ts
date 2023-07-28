import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class RegisterCompany {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsPositive()
  readonly NIT: number;

  @IsNotEmpty()
  @IsString()
  readonly RUT: string;

  @IsNotEmpty()
  @IsString()
  readonly emailCompany: string;
}
