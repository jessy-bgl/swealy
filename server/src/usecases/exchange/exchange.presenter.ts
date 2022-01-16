import { ApiProperty } from '@nestjs/swagger';
import { IPairResult, PairTypesEnum } from '../../domain/repositories/types';
import { Exchange, ExchangesEnum } from '../../domain/models/exchange';

class ExchangePresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: ExchangesEnum;
  @ApiProperty()
  label: string;
  @ApiProperty({ required: false })
  apiKey: string;
  @ApiProperty({ required: false })
  apiSecret: string;
  @ApiProperty()
  subaccountName?: string;

  constructor(exchange: Exchange) {
    const apiSecret = exchange.apiSecret;
    const apiSecretLength = exchange.apiSecret.length;
    let apiSecretToShow = apiSecret;

    if (apiSecretLength > 8) {
      const apiSecretPartToHide = '*'.repeat(apiSecretLength - 4);
      apiSecretToShow =
        `${apiSecret[0]}${apiSecret[1]}` +
        apiSecretPartToHide +
        `${apiSecret[apiSecretLength - 2]}${apiSecret[apiSecretLength - 1]}`;
    }

    this.id = exchange.id;
    this.name = exchange.name;
    this.label = exchange.label;
    this.apiKey = exchange.apiKey;
    this.apiSecret = apiSecretToShow;
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
