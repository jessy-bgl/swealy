import { CreateTransactionDTO } from '../../infrastructure/controllers/transaction/transaction.create.dto';
import { Transaction } from '../models/transaction';

interface ITransactionRepository {
  fetch(): Promise<Transaction[]>;
  fetchLastDcaSuccessfulTransaction(dcaId: string): Promise<Transaction>;
  create(createTransactionDTO: CreateTransactionDTO): Promise<Transaction>;
  delete(id: string): Promise<Transaction>;
}

export { ITransactionRepository };
