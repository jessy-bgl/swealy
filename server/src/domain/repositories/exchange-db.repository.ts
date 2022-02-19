import { Exchange } from '../models/exchange';

interface ICreateExchangeDTO {
  name: string;
  apiKey: string;
  apiSecret: string;
  label: string;
  subaccountName?: string;
}

interface IUpdateExchangeDTO {
  label?: string;
  apiKey?: string;
  apiSecret?: string;
  subaccountName?: string;
}

abstract class IExchangeDbRepository {
  abstract fetch(): Promise<Exchange[]>;
  abstract fetchOne(id: string): Promise<Exchange>;
  abstract create(createExchangeDTO: ICreateExchangeDTO): Promise<Exchange>;
  abstract update(
    id: string,
    updateExchangeDTO: IUpdateExchangeDTO,
  ): Promise<Exchange>;
  abstract delete(id: string): Promise<Exchange>;
}

export { IExchangeDbRepository, ICreateExchangeDTO, IUpdateExchangeDTO };
