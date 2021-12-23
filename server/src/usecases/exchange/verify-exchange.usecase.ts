import { IExchangeApiRepository } from '../../domain/repositories/exchange-api.repository.interface';
import { IExchangeDbRepository } from '../../domain/repositories/exchange-db.repository.interface';

class VerifyExchangeApiKeyUseCase {
  constructor(
    private readonly exchangeDbRepository: IExchangeDbRepository,
    private readonly exchangeApiRepository: IExchangeApiRepository,
  ) {}

  execute = async (id: string) => {
    const exchange = await this.exchangeDbRepository.fetchOne(id);
    return this.exchangeApiRepository.checkApiKeyValidity(exchange);
  };
}

export { VerifyExchangeApiKeyUseCase };