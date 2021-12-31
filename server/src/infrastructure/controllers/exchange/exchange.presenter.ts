import { ApiProperty } from '@nestjs/swagger';
import { IPairResult, PairTypesEnum } from '../../../domain/repositories/types';
import { Exchange, ExchangeEnum } from '../../../domain/models/exchange';

class ExchangePresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: ExchangeEnum;
  @ApiProperty()
  label: string;
  @ApiProperty({ required: false })
  apiKey: string;
  @ApiProperty({ required: false })
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

class PairsResult implements IPairResult {
  @ApiProperty({ example: 'BTC/USDT' })
  name: string;
  @ApiProperty({ enum: PairTypesEnum })
  type: PairTypesEnum;
  @ApiProperty()
  price: number;
  @ApiProperty()
  priceIncrement: number;
  @ApiProperty()
  sizeIncrement: number;
}

export { ExchangePresenter, PairsResult };
