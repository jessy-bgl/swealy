import {
  ICreateExchangeDTO,
  IExchangeDbRepository,
} from '../../domain/repositories/exchange-db.repository';
import { ExchangePresenter } from './exchange.presenter';

class AddExchangeUseCase {
  constructor(private readonly exchangeDbRepository: IExchangeDbRepository) {}

  async execute(createExchangeDTO: ICreateExchangeDTO) {
    const exchange = await this.exchangeDbRepository.create(createExchangeDTO);
    return new ExchangePresenter(exchange);
  }
}

export { AddExchangeUseCase };
