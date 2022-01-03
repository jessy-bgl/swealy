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

interface IExchangeDbRepository {
  fetch(): Promise<Exchange[]>;
  fetchOne(id: string): Promise<Exchange>;
  create(createExchangeDTO: ICreateExchangeDTO): Promise<Exchange>;
  update(id: string, updateExchangeDTO: IUpdateExchangeDTO): Promise<Exchange>;
  delete(id: string): Promise<Exchange>;
}

export { IExchangeDbRepository, ICreateExchangeDTO, IUpdateExchangeDTO };
