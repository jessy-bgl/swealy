import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ExchangeEnum } from '../../entities/exchange.entity';

class CreateExchangeDTO {
  @IsNotEmpty()
  @IsEnum(ExchangeEnum)
  name: string;

  @IsNotEmpty()
  @IsString()
  apiKey: string;

  @IsNotEmpty()
  @IsString()
  apiSecret: string;

  @IsNotEmpty()
  @IsString()
  label: string;

  @IsOptional()
  @IsString()
  subaccountName?: string;
}

class UpdateExchangeDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  label?: string;

  @IsOptional()
  @IsString()
  apiKey?: string;

  @IsOptional()
  @IsString()
  apiSecret?: string;

  @IsOptional()
  @IsString()
  subaccountName?: string;
}

export { CreateExchangeDTO, UpdateExchangeDTO };
