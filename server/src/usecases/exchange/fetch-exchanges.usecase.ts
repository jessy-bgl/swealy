import { IExchangeDbRepository } from '../../domain/repositories/exchange-db.repository';
import { ExchangePresenter } from './exchange.presenter';

class FetchExchangesUseCase {
  constructor(private readonly exchangeDbRepository: IExchangeDbRepository) {}

  async execute() {
    const exchanges = await this.exchangeDbRepository.fetch();
    return exchanges.map((exchange) => new ExchangePresenter(exchange));
  }
}

export { FetchExchangesUseCase };
