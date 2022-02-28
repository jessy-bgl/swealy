import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';
import { IExchangeApiRepository } from '../../domain/repositories/exchange-api.repository';
import { ITransactionRepository } from '../../domain/repositories/transaction.repository';

import { Dca, DcaSchema } from '../entities/dca.entity';
import { Transaction, TransactionSchema } from '../entities/transaction.entity';

import { DcaRepository } from '../repositories/dca.repository';
import { ExchangeApiRepository } from '../repositories/exchange-api.repository';
import { TransactionRepository } from '../repositories/transaction.repository';
import { FtxApiRepository } from '../repositories/ftx/ftx-api.repository';
import { BinanceApiRepository } from '../repositories/binance/binance-api.repository';

import { HttpCustomModule } from '../config/axios/http.module';
import { DcaService } from './dca.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Dca.name, schema: DcaSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    HttpCustomModule,
  ],
  providers: [
    DcaService,
    { provide: IDcaRepository, useClass: DcaRepository },
    { provide: ITransactionRepository, useClass: TransactionRepository },
    { provide: IExchangeApiRepository, useClass: ExchangeApiRepository },
    FtxApiRepository,
    BinanceApiRepository,
  ],
})
export class ServicesModule {}
