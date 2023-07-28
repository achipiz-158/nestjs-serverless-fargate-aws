import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendEmailDto {
  @IsString()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsNotEmpty()
  readonly subject: string;

  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @IsString({
    each: true,
  })
  @IsOptional()
  readonly emails?: string[];
}
