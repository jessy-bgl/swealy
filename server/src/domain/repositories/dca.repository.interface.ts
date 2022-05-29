import { Dca, DcaStatusEnum } from '../models/dca';

interface ICreateDcaDTO {
  exchange: string;
  pair: string;
  frequencyInDays: number;
  hour: number;
  amount: number;
}

interface IUpdateDcaDTO {
  amount: number;
  frequencyInDays: number;
  hour: number;
  status?: DcaStatusEnum;
}

interface IUpdateDcaStatusDTO {
  status: DcaStatusEnum;
}

abstract class IDcaRepository {
  abstract fetch(): Promise<Dca[]>;
  abstract fetchOne(id: string): Promise<Dca>;
  abstract create(createDcaDTO: ICreateDcaDTO): Promise<Dca>;
  abstract update(id: string, updateDcaDTO: IUpdateDcaDTO): Promise<Dca>;
  abstract updateStatus(id: string, status: IUpdateDcaStatusDTO): Promise<Dca>;
  abstract delete(id: string): Promise<Dca>;
  abstract deleteByExchangeId(exchangeId: string): Promise<Dca[]>;
  abstract incSuccessfulTransactionsCounter(
    id: string,
    value: number,
  ): Promise<void>;
}

export { IDcaRepository, ICreateDcaDTO, IUpdateDcaDTO, IUpdateDcaStatusDTO };
