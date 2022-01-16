import { Exchange } from "./Exchange";

enum DcaStatusEnum {
  ACTIVE = "active",
  PAUSED = "paused",
  ARCHIVED = "archived",
}

interface Dca {
  id: string;
  status: DcaStatusEnum;
  exchange: Exchange;
  pair: string;
  frequencyInDays: number;
  hour: number;
  amount: number;
  nextTransactionDatetime?: Date;
  successfulTransactionsCounter: number;
}

interface CreateDcaDTO {
  exchange: string; // ObjectId
  pair: string;
  frequencyInDays: number;
  hour: number;
  amount: number;
}

interface UpdateDcaDTO {
  id: string;
  status?: DcaStatusEnum;
  frequencyInDays: number;
  hour: number;
  amount: number;
}

export type { Dca, CreateDcaDTO, UpdateDcaDTO };
export { DcaStatusEnum };
