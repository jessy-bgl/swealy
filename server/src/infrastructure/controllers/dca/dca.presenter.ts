import { ApiProperty } from '@nestjs/swagger';
import { Dca } from '../../../domain/models/dca';
import { ExchangePresenter } from '../exchange/exchange.presenter';

class DcaPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  exchange: ExchangePresenter;
  @ApiProperty()
  pair: string;
  @ApiProperty()
  frequencyInDays: number;
  @ApiProperty()
  hour: number;
  @ApiProperty()
  amount: number;

  constructor(dca: Dca) {
    this.id = dca.id;
    this.isActive = dca.isActive;
    this.exchange = new ExchangePresenter(dca.exchange);
    this.pair = dca.pair;
    this.frequencyInDays = dca.frequencyInDays;
    this.hour = dca.hour;
    this.amount = dca.amount;

    // remove exchange data that should not be available here
    delete this.exchange.apiKey;
    delete this.exchange.apiSecret;
  }
}

export { DcaPresenter };