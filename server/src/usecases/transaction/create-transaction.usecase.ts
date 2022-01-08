import {
  ICreateTransactionDTO,
  ITransactionRepository,
} from '../../domain/repositories/transaction.repository';
import { TransactionPresenter } from './transaction.presenter';

class CreateTransactionUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(createTransactionDto: ICreateTransactionDTO) {
    const transaction = await this.transactionRepository.create(
      createTransactionDto,
    );
    return new TransactionPresenter(transaction);
  }
}

export { CreateTransactionUseCase };
