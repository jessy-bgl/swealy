import { IsOptional, IsString } from 'class-validator';

class UpdateExchangeDTO {
  @IsOptional()
  @IsString()
  label: string;
}

export { UpdateExchangeDTO };
