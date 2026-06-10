import { IsString, IsNumber, IsOptional, IsNotEmpty, Min } from 'class-validator';

export class CreatePaymentIntentDto {
  @IsNumber()
  @Min(0, { message: 'Valor deve ser maior que zero' })
  amount: number;

  @IsString()
  @IsOptional()
  currency?: string;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  addressNumber: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  zip: string;

  @IsString()
  @IsNotEmpty()
  plan: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @IsOptional()
  stripePaymentId?: string;

  @IsString()
  @IsOptional()
  cardLast4?: string;

  @IsString()
  @IsOptional()
  expiry?: string;
}
