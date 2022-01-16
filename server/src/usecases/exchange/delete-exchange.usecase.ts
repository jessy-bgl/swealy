import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';
import { IExchangeDbRepository } from '../../domain/repositories/exchange-db.repository';
import { ExchangePresenter } from './exchange.presenter';

class DeleteExchangeUseCase {
  constructor(
    private readonly exchangeDbRepository: IExchangeDbRepository,
    private readonly dcaRepository: IDcaRepository,
  ) {}

  async execute(id: string) {
    const exchange = await this.exchangeDbRepository.delete(id);
    await this.dcaRepository.deleteByExchangeId(id);
    return new ExchangePresenter(exchange);
  }
}

export { DeleteExchangeUseCase };
