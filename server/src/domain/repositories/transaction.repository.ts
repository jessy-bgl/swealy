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

abstract class ITransactionRepository {
  abstract fetch(): Promise<Transaction[]>;
  abstract fetchLastDcaAutoTransaction(dcaId: string): Promise<Transaction>;
  abstract create(
    createTransactionDTO: ICreateTransactionDTO,
  ): Promise<Transaction>;
  abstract delete(id: string): Promise<Transaction>;
  abstract deleteByDcaId(dcaId: string): Promise<void>;
  abstract deleteByDcaIds(dcaIds: string[]): Promise<void>;
}

export {
  ITransactionRepository,
  ICreateTransactionDTO,
  ICreateManualTransactionDTO,
};
