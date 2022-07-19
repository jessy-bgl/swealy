import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HttpCustomModule } from '../config/axios/http.module';
import { StatisticsController } from '../controllers/statistics/statistics.controller';

import { GlobalStatsUseCase } from '../../usecases/statistics/global-statistics.usecase';
import { DcaTransactionsSummaryUseCase } from '../../usecases/statistics/dca-transactions-summary.usecase';

import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';
import { ITransactionRepository } from '../../domain/repositories/transaction.repository';
import { ICoinRepository } from '../../domain/repositories/coin.repository.interface';

import { DcaRepository } from '../repositories/dca.repository';
import { TransactionRepository } from '../repositories/transaction.repository';

import { Dca, DcaSchema } from '../entities/dca.entity';
import { Transaction, TransactionSchema } from '../entities/transaction.entity';
import { CoingeckoApiRepository } from '../repositories/coingecko/coingecko-api.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Dca.name, schema: DcaSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    HttpCustomModule,
  ],
  controllers: [StatisticsController],
  providers: [
    GlobalStatsUseCase,
    DcaTransactionsSummaryUseCase,
    { provide: IDcaRepository, useClass: DcaRepository },
    { provide: ITransactionRepository, useClass: TransactionRepository },
    { provide: ICoinRepository, useClass: CoingeckoApiRepository },
  ],
})
export class StatisticsModule {}
