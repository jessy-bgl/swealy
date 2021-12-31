import { ApiProperty } from '@nestjs/swagger';
import {
  OrderTypesEnum,
  Transaction,
} from '../../../domain/models/transaction';
import { DcaPresenter } from '../dca/dca.presenter';

class TransactionPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  datetime: Date;
  @ApiProperty()
  success: boolean;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  dca: DcaPresenter;
  @ApiProperty()
  pair: string;
  @ApiProperty()
  price: number;
  @ApiProperty({ enum: OrderTypesEnum })
  type: OrderTypesEnum;
  @ApiProperty()
  size: number;
  @ApiProperty()
  description?: string;

  constructor(transaction: Transaction) {
    this.id = transaction.id;
    this.datetime = transaction.datetime;
    this.success = transaction.success;
    this.amount = transaction.amount;
    this.dca = new DcaPresenter(transaction.dca);
    this.pair = transaction.pair;
    this.type = transaction.type;
    this.size = transaction.size;
    this.description = transaction.description;

    // remove exchange data that should not be available here
    delete this.dca.exchange.apiKey;
    delete this.dca.exchange.apiSecret;
  }
}

export { TransactionPresenter };
