import { IExchangeApiRepository } from '../../domain/repositories/exchange-api.repository';
import { IExchangeDbRepository } from '../../domain/repositories/exchange-db.repository';

class PairsExchangeApiKeyUseCase {
  constructor(
    private readonly exchangeDbRepository: IExchangeDbRepository,
    private readonly exchangeApiRepository: IExchangeApiRepository,
  ) {}

  execute = async (id: string) => {
    const exchange = await this.exchangeDbRepository.fetchOne(id);
    const pairs = await this.exchangeApiRepository.getAvailableSpotPairs(
      exchange,
    );
    return pairs.filter((pair) => pair.name.includes('USD'));
  };
}

export { PairsExchangeApiKeyUseCase };
