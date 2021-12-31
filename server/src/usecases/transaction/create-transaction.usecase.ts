import { ITransactionRepository } from '../../domain/repositories/transaction.repository';
import { CreateTransactionDTO } from '../../infrastructure/controllers/transaction/transaction.dto';

class CreateTransactionUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  // TODO : replace the dto or move it because it breaks the clean archi
  execute(createTransactionDto: CreateTransactionDTO) {
    return this.transactionRepository.create(createTransactionDto);
  }
}

export { CreateTransactionUseCase };
