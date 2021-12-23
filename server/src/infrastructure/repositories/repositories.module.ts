import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HttpCustomModule } from '../config/axios/http.module';

import { Exchange, ExchangeSchema } from '../entities/exchange.entity';
import { Dca, DcaSchema } from '../entities/dca.entity';
import { Transaction, TransactionSchema } from '../entities/transaction.entity';

import { ExchangeApiRepository } from './exchange-api.repository';
import { ExchangeDbRepository } from './exchange-db.repository';
import { DcaRepository } from './dca.repository';
import { TransactionRepository } from './transaction.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Exchange.name, schema: ExchangeSchema },
    ]),
    MongooseModule.forFeature([{ name: Dca.name, schema: DcaSchema }]),
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    HttpCustomModule,
  ],
  providers: [
    ExchangeDbRepository,
    ExchangeApiRepository,
    DcaRepository,
    TransactionRepository,
  ],
  exports: [
    ExchangeDbRepository,
    ExchangeApiRepository,
    DcaRepository,
    TransactionRepository,
  ],
})
export class RepositoriesModule {}
