import { ITransactionRepository } from '../../domain/repositories/transaction.repository';
import { TransactionPresenter } from './transaction.presenter';

class FetchTransactionUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute() {
    const transactions = await this.transactionRepository.fetch();
    return transactions.map(
      (transaction) => new TransactionPresenter(transaction),
    );
  }
}

export { FetchTransactionUseCase };
