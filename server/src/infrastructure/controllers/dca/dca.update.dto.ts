import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

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

export { UpdateDcaDTO };
