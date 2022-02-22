import { Injectable } from '@nestjs/common';

import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';
import { ITransactionRepository } from '../../domain/repositories/transaction.repository';
import { TransactionPresenter } from './transaction.presenter';

@Injectable()
class DeleteTransactionUseCase {
  constructor(
    private readonly transactionRepository: ITransactionRepository,
    private readonly dcaRepository: IDcaRepository,
  ) {}

  async execute(id: string) {
    const transaction = await this.transactionRepository.delete(id);
    if (transaction.dca.successfulTransactionsCounter > 0)
      await this.dcaRepository.incSuccessfulTransactionsCounter(
        transaction.dca.id,
        -1,
      );
    return new TransactionPresenter(transaction);
  }
}

export { DeleteTransactionUseCase };
