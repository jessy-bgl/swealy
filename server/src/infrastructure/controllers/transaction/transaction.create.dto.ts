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
  @IsOptional()
  @IsDate()
  datetime: Date = new Date();

  @IsBoolean()
  success: boolean;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @IsMongoId()
  dca: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  pair: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  size: number;

  @IsString()
  @IsEnum(OrderTypesEnum)
  type: OrderTypesEnum;

  @IsOptional()
  @IsString()
  description?: string;
}

export { CreateTransactionDTO };
