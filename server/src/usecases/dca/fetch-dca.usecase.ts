import { DcaStatusEnum } from '../../domain/models/dca';
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
        let nextTransactionDatetime: Date | undefined;

        if (dca.status === DcaStatusEnum.ACTIVE) {
          const lastAutoTransaction =
            await this.transactionRepository.fetchLastDcaAutoTransaction(
              dca.id,
            );
          nextTransactionDatetime = computeNextDcaTransactionDatetime(
            dca,
            lastAutoTransaction,
          );
        }

        return new DcaPresenter(dca, nextTransactionDatetime);
      }),
    );

    return dcaPresenters;
  }
}

export { FetchDcaUseCase };
