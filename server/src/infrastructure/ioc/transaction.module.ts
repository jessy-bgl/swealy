import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ITransactionRepository } from '../../domain/repositories/transaction.repository';
import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';

import { Transaction, TransactionSchema } from '../entities/transaction.entity';
import { Dca, DcaSchema } from '../entities/dca.entity';

import { TransactionRepository } from '../repositories/transaction.repository';
import { DcaRepository } from '../repositories/dca.repository';

import { FetchTransactionUseCase } from '../../usecases/transaction/fetch-transaction.usecase';
import { CreateTransactionUseCase } from '../../usecases/transaction/create-transaction.usecase';
import { DeleteTransactionUseCase } from '../../usecases/transaction/delete-transaction.usecase';

import { TransactionController } from '../controllers/transaction/transaction.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Dca.name, schema: DcaSchema },
    ]),
  ],
  controllers: [TransactionController],
  providers: [
    { provide: ITransactionRepository, useClass: TransactionRepository },
    { provide: IDcaRepository, useClass: DcaRepository },
    FetchTransactionUseCase,
    CreateTransactionUseCase,
    DeleteTransactionUseCase,
  ],
})
export class TransactionModule {}
