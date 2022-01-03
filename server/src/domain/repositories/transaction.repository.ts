import { OrderTypesEnum, Transaction } from '../models/transaction';

interface ICreateTransactionDTO {
  datetime: Date;
  success: boolean;
  manual: boolean;
  amount: number;
  dca: string; // Types.ObjectId;
  pair: string;
  price?: number;
  size?: number;
  type?: OrderTypesEnum;
  description?: string;
}

interface ITransactionRepository {
  fetch(): Promise<Transaction[]>;
  fetchLastDcaSuccessfulTransaction(dcaId: string): Promise<Transaction>;
  create(createTransactionDTO: ICreateTransactionDTO): Promise<Transaction>;
  delete(id: string): Promise<Transaction>;
}

export { ITransactionRepository, ICreateTransactionDTO };
