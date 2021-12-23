import { ITransactionRepository } from '../../domain/repositories/transaction.repository';

class DeleteTransactionUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  execute(id: string) {
    return this.transactionRepository.delete(id);
  }
}

export { DeleteTransactionUseCase };
