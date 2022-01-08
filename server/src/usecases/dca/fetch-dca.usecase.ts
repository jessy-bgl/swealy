import { ITransactionRepository } from '../../domain/repositories/transaction.repository';
import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';
import { DcaPresenter } from './dca.presenter';
import { computeNextDcaTransactionDatetime } from './utils';

class FetchDcaUseCase {
  constructor(
    private readonly dcaRepository: IDcaRepository,
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async execute() {
    const dcas = await this.dcaRepository.fetch();

    const dcaPresenters = await Promise.all(
      dcas.map(async (dca) => {
        const lastAutoTransaction =
          await this.transactionRepository.fetchLastDcaAutoTransaction(dca.id);
        const nextTransactionDatetime = computeNextDcaTransactionDatetime(
          dca,
          lastAutoTransaction,
        );
        return new DcaPresenter(dca, nextTransactionDatetime);
      }),
    );

    return dcaPresenters;
  }
}

export { FetchDcaUseCase };
