import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StatisticsController } from '../controllers/statistics/statistics.controller';
import { FetchGlobalStatsUseCase } from '../../usecases/statistics/fetch-global-statistics.usecase';

import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';
import { ITransactionRepository } from '../../domain/repositories/transaction.repository';

import { DcaRepository } from '../repositories/dca.repository';
import { TransactionRepository } from '../repositories/transaction.repository';

import { Dca, DcaSchema } from '../entities/dca.entity';
import { Transaction, TransactionSchema } from '../entities/transaction.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Dca.name, schema: DcaSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [StatisticsController],
  providers: [
    FetchGlobalStatsUseCase,
    { provide: IDcaRepository, useClass: DcaRepository },
    { provide: ITransactionRepository, useClass: TransactionRepository },
  ],
})
export class StatisticsModule {}
