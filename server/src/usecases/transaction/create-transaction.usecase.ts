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

class CreateTransactionUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

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
    return new TransactionPresenter(transaction);
  }
}

export { CreateTransactionUseCase };
