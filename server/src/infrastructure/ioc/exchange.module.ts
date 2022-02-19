import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HttpCustomModule } from '../config/axios/http.module';

import { IExchangeDbRepository } from '../../domain/repositories/exchange-db.repository';
import { IExchangeApiRepository } from '../../domain/repositories/exchange-api.repository';
import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';
import { ITransactionRepository } from '../../domain/repositories/transaction.repository';

import { Exchange, ExchangeSchema } from '../entities/exchange.entity';
import { Transaction, TransactionSchema } from '../entities/transaction.entity';
import { Dca, DcaSchema } from '../entities/dca.entity';

import { ExchangeDbRepository } from '../repositories/exchange-db.repository';
import { ExchangeApiRepository } from '../repositories/exchange-api.repository';
import { DcaRepository } from '../repositories/dca.repository';
import { TransactionRepository } from '../repositories/transaction.repository';

import { AddExchangeUseCase } from '../../usecases/exchange/add-exchange.usecase';
import { DeleteExchangeUseCase } from '../../usecases/exchange/delete-exchange.usecase';
import { UpdateExchangeUseCase } from '../../usecases/exchange/update-exchange.usecase';
import { FetchExchangesUseCase } from '../../usecases/exchange/fetch-exchanges.usecase';
import { FetchExchangePairsUseCase } from '../../usecases/exchange/fetch-exchange-pairs.usecase';
import { VerifyExchangeApiKeyUseCase } from '../../usecases/exchange/verify-exchange.usecase';

import { ExchangeController } from '../controllers/exchange/exchange.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Exchange.name, schema: ExchangeSchema },
      { name: Dca.name, schema: DcaSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    HttpCustomModule,
  ],
  controllers: [ExchangeController],
  providers: [
    { provide: IExchangeDbRepository, useClass: ExchangeDbRepository },
    { provide: IExchangeApiRepository, useClass: ExchangeApiRepository },
    { provide: IDcaRepository, useClass: DcaRepository },
    { provide: ITransactionRepository, useClass: TransactionRepository },
    AddExchangeUseCase,
    DeleteExchangeUseCase,
    UpdateExchangeUseCase,
    FetchExchangesUseCase,
    FetchExchangePairsUseCase,
    VerifyExchangeApiKeyUseCase,
  ],
})
export class ExchangeModule {}
