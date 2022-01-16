import { ITransactionRepository } from '../../domain/repositories/transaction.repository';
import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';
import { DcaPresenter } from './dca.presenter';

class DeleteDcaUseCase {
  constructor(
    private readonly dcaRepository: IDcaRepository,
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async execute(id: string) {
    const dca = await this.dcaRepository.delete(id);
    await this.transactionRepository.deleteByDcaId(id);
    return new DcaPresenter(dca);
  }
}

export { DeleteDcaUseCase };
