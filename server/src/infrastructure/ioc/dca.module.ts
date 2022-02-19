import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';
import { ITransactionRepository } from '../../domain/repositories/transaction.repository';

import { Dca, DcaSchema } from '../entities/dca.entity';
import { Transaction, TransactionSchema } from '../entities/transaction.entity';

import { DcaRepository } from '../repositories/dca.repository';
import { TransactionRepository } from '../repositories/transaction.repository';

import { CreateDcaUseCase } from '../../usecases/dca/create-dca.usecase';
import { DeleteDcaUseCase } from '../../usecases/dca/delete-dca.usecase';
import { FetchDcaUseCase } from '../../usecases/dca/fetch-dca.usecase';
import { UpdateDcaStatusUseCase } from '../../usecases/dca/update-dca-status.usecase';
import { UpdateDcaUseCase } from '../../usecases/dca/update-dca.usecase';

import { DcaController } from '../controllers/dca/dca.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Dca.name, schema: DcaSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [DcaController],
  providers: [
    { provide: IDcaRepository, useClass: DcaRepository },
    { provide: ITransactionRepository, useClass: TransactionRepository },
    FetchDcaUseCase,
    CreateDcaUseCase,
    DeleteDcaUseCase,
    UpdateDcaUseCase,
    UpdateDcaStatusUseCase,
  ],
})
export class DcaModule {}
