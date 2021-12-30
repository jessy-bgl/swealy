import { ITransactionRepository } from '../../domain/repositories/transaction.repository';

class FetchTransactionUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  execute() {
    return this.transactionRepository.fetch();
  }
}

export { FetchTransactionUseCase };
