import { CreateTransactionDTO } from '../../infrastructure/controllers/transaction/transaction.create.dto';
import { Transaction } from '../entities/transaction';

interface ITransactionRepository {
  fetch(): Promise<Transaction[]>;
  create(createTransactionDTO: CreateTransactionDTO): Promise<Transaction>;
  delete(id: string): Promise<Transaction>;
}

export { ITransactionRepository };
