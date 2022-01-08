import { ITransactionRepository } from '../../domain/repositories/transaction.repository';
import { TransactionPresenter } from './transaction.presenter';

class DeleteTransactionUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(id: string) {
    const transaction = await this.transactionRepository.delete(id);
    return new TransactionPresenter(transaction);
  }
}

export { DeleteTransactionUseCase };
