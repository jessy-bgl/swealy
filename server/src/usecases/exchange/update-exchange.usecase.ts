import {
  IExchangeDbRepository,
  IUpdateExchangeDTO,
} from '../../domain/repositories/exchange-db.repository';
import { ExchangePresenter } from './exchange.presenter';

class UpdateExchangeUseCase {
  constructor(private readonly exchangeDbRepository: IExchangeDbRepository) {}

  async execute(id: string, updateExchangeDTO: IUpdateExchangeDTO) {
    const exchange = await this.exchangeDbRepository.update(
      id,
      updateExchangeDTO,
    );
    return new ExchangePresenter(exchange);
  }
}

export { UpdateExchangeUseCase };
