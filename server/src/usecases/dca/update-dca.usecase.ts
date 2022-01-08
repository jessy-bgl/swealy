import {
  IDcaRepository,
  IUpdateDcaDTO,
} from '../../domain/repositories/dca.repository.interface';
import { DcaPresenter } from './dca.presenter';
import { computeNextDcaTransactionDatetime } from './utils';

class UpdateDcaUseCase {
  constructor(private readonly dcaRepository: IDcaRepository) {}

  async execute(id: string, updateDcaDTO: IUpdateDcaDTO) {
    const dca = await this.dcaRepository.update(id, updateDcaDTO);
    const nextTransactionDatetime = computeNextDcaTransactionDatetime(dca);
    const dcaPresenter = new DcaPresenter(dca, nextTransactionDatetime);
    return dcaPresenter;
  }
}

export { UpdateDcaUseCase };
