import { ApiProperty } from '@nestjs/swagger';
import { Exchange, ExchangeEnum } from '../../../domain/models/exchange';

class ExchangePresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: ExchangeEnum;
  @ApiProperty()
  label: string;
  @ApiProperty()
  apiKey: string;
  @ApiProperty()
  apiSecret: string;
  @ApiProperty()
  subaccountName?: string;

  constructor(exchange: Exchange) {
    this.id = exchange.id;
    this.name = exchange.name;
    this.label = exchange.label;
    this.apiKey = exchange.apiKey;
    this.apiSecret = exchange.apiSecret;
    this.subaccountName = exchange.subaccountName;
  }
}

export { ExchangePresenter };
