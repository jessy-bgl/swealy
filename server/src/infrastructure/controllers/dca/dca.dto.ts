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

import {
  ICreateDcaDTO,
  IUpdateDcaDTO,
} from '../../../domain/repositories/dca.repository.interface';

class CreateDcaDTO implements ICreateDcaDTO {
  @ApiProperty({ required: true, type: 'string (ObjectId)' })
  @IsNotEmpty()
  @IsMongoId()
  exchange: string; // Types.ObjectId;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  pair: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsPositive()
  frequencyInDays: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsPositive()
  hour: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsPositive()
  amount: number;
}

class UpdateDcaDTO implements IUpdateDcaDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ required: true })
  @IsNumber()
  frequencyInDays: number;

  @ApiProperty({ required: true })
  @IsNumber()
  hour: number;

  @ApiProperty({ required: true })
  @IsNumber()
  amount: number;
}

export { CreateDcaDTO, UpdateDcaDTO };
