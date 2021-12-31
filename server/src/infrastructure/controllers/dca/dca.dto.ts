import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

class CreateDcaDTO {
  @ApiProperty({ required: true, type: 'string (ObjectId)' })
  @IsNotEmpty()
  @IsMongoId()
  exchange: Types.ObjectId;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  pair: string;

  @ApiProperty({})
  @IsNumber()
  @IsPositive()
  frequencyInDays: number;

  @ApiProperty({})
  @IsNumber()
  @IsPositive()
  hour: number;

  @ApiProperty({})
  @IsNumber()
  @IsPositive()
  amount: number;
}

class UpdateDcaDTO {
  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsNumber()
  frequencyInDays: number;

  @IsNumber()
  hour: number;

  @IsNumber()
  amount: number;
}

export { CreateDcaDTO, UpdateDcaDTO };
