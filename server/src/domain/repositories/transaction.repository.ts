import { OrderTypesEnum, Transaction } from '../models/transaction';

interface ICreateTransactionDTO {
  datetime: Date;
  success: boolean;
  manual: boolean;
  amount: number;
  dca: string; // Types.ObjectId;
  price?: number;
  size?: number;
  type?: OrderTypesEnum;
  description?: string;
}

interface ICreateManualTransactionDTO {
  datetime: Date;
  dca: string; // Types.ObjectId;
  price: number;
  size: number;
  type: OrderTypesEnum;
  description?: string;
}

interface ITransactionRepository {
  fetch(): Promise<Transaction[]>;
  fetchLastDcaAutoTransaction(dcaId: string): Promise<Transaction>;
  create(createTransactionDTO: ICreateTransactionDTO): Promise<Transaction>;
  delete(id: string): Promise<Transaction>;
  deleteByDcaId(dcaId: string): Promise<void>;
  deleteByDcaIds(dcaIds: string[]): Promise<void>;
}

export {
  ITransactionRepository,
  ICreateTransactionDTO,
  ICreateManualTransactionDTO,
};
