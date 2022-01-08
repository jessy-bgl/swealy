import {
  ICreateTransactionDTO,
  ITransactionRepository,
} from '../../domain/repositories/transaction.repository';

class CreateTransactionUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  execute(createTransactionDto: ICreateTransactionDTO) {
    return this.transactionRepository.create(createTransactionDto);
  }
}

export { CreateTransactionUseCase };
