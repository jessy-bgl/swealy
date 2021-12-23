import { IsOptional, IsString } from 'class-validator';

class UpdateExchangeDTO {
  @IsOptional()
  @IsString()
  label?: string = '';

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

export { UpdateExchangeDTO };
