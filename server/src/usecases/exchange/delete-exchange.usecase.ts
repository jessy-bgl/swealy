import { ITransactionRepository } from '../../domain/repositories/transaction.repository';
import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';
import { IExchangeDbRepository } from '../../domain/repositories/exchange-db.repository';
import { ExchangePresenter } from './exchange.presenter';

class DeleteExchangeUseCase {
  constructor(
    private readonly exchangeDbRepository: IExchangeDbRepository,
    private readonly dcaRepository: IDcaRepository,
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async execute(id: string) {
    const exchange = await this.exchangeDbRepository.delete(id);
    const deletedDcas = await this.dcaRepository.deleteByExchangeId(id);
    const deletedDcaIds = deletedDcas.map((dca) => dca.id);
    await this.transactionRepository.deleteByDcaIds(deletedDcaIds);
    return new ExchangePresenter(exchange);
  }
}

export { DeleteExchangeUseCase };
