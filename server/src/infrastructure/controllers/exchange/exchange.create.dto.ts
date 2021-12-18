import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ExchangeEnum } from '../../../domain/entities/exchange.entity';

class CreateExchangeDTO {
  @IsNotEmpty()
  @IsEnum(ExchangeEnum)
  name: string;

  @IsOptional()
  @IsString()
  label: string;

  @IsNotEmpty()
  @IsString()
  publicKey: string;

  @IsNotEmpty()
  @IsString()
  apiSecret: string;
}

export { CreateExchangeDTO };
