import { IExchangeDbRepository } from '../../domain/repositories/exchange-db.repository.interface';

class FetchExchangesUseCase {
  constructor(private readonly exchangeDbRepository: IExchangeDbRepository) {}

  execute() {
    return this.exchangeDbRepository.fetch();
  }
}

export { FetchExchangesUseCase };
