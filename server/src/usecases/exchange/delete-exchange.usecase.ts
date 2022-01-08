import { IExchangeDbRepository } from '../../domain/repositories/exchange-db.repository';
import { ExchangePresenter } from './exchange.presenter';

class DeleteExchangeUseCase {
  constructor(private readonly exchangeDbRepository: IExchangeDbRepository) {}

  async execute(id: string) {
    const exchange = await this.exchangeDbRepository.delete(id);
    return new ExchangePresenter(exchange);
  }
}

export { DeleteExchangeUseCase };
