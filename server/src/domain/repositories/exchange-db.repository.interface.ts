import { CreateExchangeDTO } from '../../infrastructure/controllers/exchange/exchange.create.dto';
import { UpdateExchangeDTO } from '../../infrastructure/controllers/exchange/exchange.update.dto';
import { Exchange } from '../entities/exchange.entity';

interface IExchangeDbRepository {
  fetch(): Promise<Exchange[]>;
  fetchOne(id: string): Promise<Exchange>;
  create(createExchangeDTO: CreateExchangeDTO): Promise<Exchange>;
  update(updateExchangeDTO: UpdateExchangeDTO): Promise<Exchange>;
  delete(id: string): Promise<Exchange>;
}

export { IExchangeDbRepository };
