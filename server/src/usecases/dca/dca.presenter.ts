import { ApiProperty } from '@nestjs/swagger';
import { Dca, DcaStatusEnum } from '../../domain/models/dca';
import { ExchangePresenter } from '../exchange/exchange.presenter';

class DcaPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  status: DcaStatusEnum;
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
  @ApiProperty()
  nextTransactionDatetime?: Date;
  @ApiProperty()
  successfulTransactionsCounter: number;

  // the nextTransactionDatetime is not required because of the delete usecase
  constructor(dca: Dca, nextTransactionDatetime?: Date) {
    this.id = dca.id;
    this.status = dca.status;
    this.pair = dca.pair;
    this.frequencyInDays = dca.frequencyInDays;
    this.hour = dca.hour;
    this.amount = dca.amount;
    this.exchange = new ExchangePresenter(dca.exchange);
    this.nextTransactionDatetime = nextTransactionDatetime;
    this.successfulTransactionsCounter = dca.successfulTransactionsCounter || 0;

    // remove exchange data that should not be available here
    delete this.exchange.apiKey;
    delete this.exchange.apiSecret;
  }
}

export { DcaPresenter };
