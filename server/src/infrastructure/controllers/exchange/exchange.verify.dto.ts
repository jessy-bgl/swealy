import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ExchangeEnum } from 'src/domain/entities/exchange.entity';

class CheckExchangeApiKeyDTO {
  @IsString()
  @IsEnum(ExchangeEnum)
  name: ExchangeEnum;

  @IsString()
  apiKey: string;

  @IsString()
  apiSecret: string;

  @IsOptional()
  @IsString()
  subaccountName?: string;
}

export { CheckExchangeApiKeyDTO };
