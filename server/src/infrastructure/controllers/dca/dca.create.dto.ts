import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

class CreateDcaDTO {
  @IsNotEmpty()
  @IsMongoId()
  exchange: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  pair: string;

  @IsNumber()
  frequencyInDays: number;

  @IsNumber()
  hour: number;

  @IsNumber()
  amount: number;
}

export { CreateDcaDTO };
