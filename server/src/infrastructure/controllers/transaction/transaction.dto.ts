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

import { OrderTypesEnum } from '../../../domain/models/transaction';
import {
  ICreateTransactionDTO,
  ICreateManualTransactionDTO,
} from '../../../domain/repositories/transaction.repository';

class CreateTransactionDTO implements ICreateTransactionDTO {
  @ApiProperty({ required: false, default: 'current datetime' })
  @IsOptional()
  @IsDate()
  datetime: Date = new Date();

  @ApiProperty({ required: true })
  @IsBoolean()
  success: boolean;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  manual: boolean;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ required: true, type: 'string (ObjectId)' })
  @IsNotEmpty()
  @IsMongoId()
  dca: string; //Types.ObjectId;

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

class CreateManualTransactionDTO implements ICreateManualTransactionDTO {
  @ApiProperty({ required: true })
  @IsDate()
  datetime: Date = new Date();

  success = true;

  manual = true;

  amount: number;

  @ApiProperty({ required: true, type: 'string (ObjectId)' })
  @IsNotEmpty()
  @IsMongoId()
  dca: string; //Types.ObjectId;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsPositive()
  size: number;

  @ApiProperty({ required: true, enum: OrderTypesEnum })
  @IsString()
  @IsEnum(OrderTypesEnum)
  type: OrderTypesEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export { CreateTransactionDTO, CreateManualTransactionDTO };
