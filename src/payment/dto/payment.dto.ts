import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class PaymentDTO {
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  buyer: string;

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  items: string[];
}

export class ConfirmationDTO {
  @IsNotEmpty()
  @IsString()
  token: string;
}

export class CheckDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}
