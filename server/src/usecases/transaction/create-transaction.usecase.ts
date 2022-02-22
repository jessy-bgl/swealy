import { Injectable } from '@nestjs/common';

import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';
import {
  ICreateManualTransactionDTO,
  ICreateTransactionDTO,
  ITransactionRepository,
} from '../../domain/repositories/transaction.repository';
import { TransactionPresenter } from './transaction.presenter';

function isAutoTransaction(
  transaction: ICreateManualTransactionDTO | ICreateTransactionDTO,
): transaction is ICreateTransactionDTO {
  return (<ICreateTransactionDTO>transaction).amount !== undefined;
}

@Injectable()
class CreateTransactionUseCase {
  constructor(
    private readonly transactionRepository: ITransactionRepository,
    private readonly dcaRepository: IDcaRepository,
  ) {}

  async execute(
    createTransactionDto: ICreateTransactionDTO | ICreateManualTransactionDTO,
  ) {
    // handle manual transaction case
    if (!isAutoTransaction(createTransactionDto))
      createTransactionDto = {
        ...createTransactionDto,
        manual: true,
        success: true,
        amount: createTransactionDto.size * createTransactionDto.price,
      };
    const transaction = await this.transactionRepository.create(
      createTransactionDto,
    );
    await this.dcaRepository.incSuccessfulTransactionsCounter(
      transaction.dca.id,
      1,
    );
    return new TransactionPresenter(transaction);
  }
}

export { CreateTransactionUseCase };
