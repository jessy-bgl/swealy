import { Dca } from "./Dca";

enum OrderTypesEnum {
  LIMIT = "limit",
  MARKET = "market",
}

interface Transaction {
  id: string;
  datetime: Date;
  success: boolean;
  manual: boolean;
  amount: number;
  dca: Dca;
  price: number;
  type: OrderTypesEnum;
  size: number;
  description?: string;
}

interface CreateTransactionDTO {
  datetime: Date;
  dca: string; // ObjectId;
  pair: string;
  price: number;
  size: number;
  type: OrderTypesEnum;
  description?: string;
}

export { OrderTypesEnum };
export type { Transaction, CreateTransactionDTO };
