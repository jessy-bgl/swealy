import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ExchangeEnum } from '../../entities/exchange.entity';

class CreateExchangeDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEnum(ExchangeEnum)
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  apiKey: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  apiSecret: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  label: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  subaccountName?: string;
}

class UpdateExchangeDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  label?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  apiKey?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  apiSecret?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  subaccountName?: string;
}

export { CreateExchangeDTO, UpdateExchangeDTO };