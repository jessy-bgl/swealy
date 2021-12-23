import { IsNumber } from 'class-validator';

class UpdateDcaDTO {
  @IsNumber()
  frequencyInDays: number;

  @IsNumber()
  hour: number;

  @IsNumber()
  amount: number;
}

export { UpdateDcaDTO };
