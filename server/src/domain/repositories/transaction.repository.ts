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
  fetchLastDcaAutoTransaction(dcaId: string): Promise<Transaction>;
  create(createTransactionDTO: ICreateTransactionDTO): Promise<Transaction>;
  delete(id: string): Promise<Transaction>;
  deleteByDcaIds(dcaIds: string[]): Promise<void>;
}

export { ITransactionRepository, ICreateTransactionDTO };
