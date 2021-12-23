import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

class CreateDcaDTO {
  @IsNotEmpty()
  @IsMongoId()
  exchange: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  pair: string;

  @IsNumber()
  @IsPositive()
  frequencyInDays: number;

  @IsNumber()
  @IsPositive()
  hour: number;

  @IsNumber()
  @IsPositive()
  amount: number;
}

export { CreateDcaDTO };
