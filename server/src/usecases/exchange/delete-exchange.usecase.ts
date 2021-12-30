import { IExchangeDbRepository } from '../../domain/repositories/exchange-db.repository';

class DeleteExchangeUseCase {
  constructor(private readonly exchangeDbRepository: IExchangeDbRepository) {}

  execute(id: string) {
    return this.exchangeDbRepository.delete(id);
  }
}

export { DeleteExchangeUseCase };
