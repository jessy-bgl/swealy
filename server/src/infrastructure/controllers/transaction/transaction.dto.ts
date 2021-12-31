import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

import { OrderTypesEnum } from '../../../domain/models/transaction';

class CreateTransactionDTO {
  @ApiProperty({})
  @IsOptional()
  @IsDate()
  datetime: Date = new Date();

  @ApiProperty({ required: true })
  @IsBoolean()
  success: boolean;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ required: true, type: 'string (ObjectId)' })
  @IsNotEmpty()
  @IsMongoId()
  dca: Types.ObjectId;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  pair: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  size?: number;

  @ApiProperty({ required: false, enum: OrderTypesEnum })
  @IsOptional()
  @IsString()
  @IsEnum(OrderTypesEnum)
  type?: OrderTypesEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export { CreateTransactionDTO };
