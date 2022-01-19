import { DcaStatusEnum } from '../../domain/models/dca';
import {
  IDcaRepository,
  IUpdateDcaStatusDTO,
} from '../../domain/repositories/dca.repository.interface';
import { DcaPresenter } from './dca.presenter';
import { computeNextDcaTransactionDatetime } from './utils';

class UpdateDcaStatusUseCase {
  constructor(private readonly dcaRepository: IDcaRepository) {}

  async execute(id: string, updateDcaStatusDTO: IUpdateDcaStatusDTO) {
    const dca = await this.dcaRepository.updateStatus(id, updateDcaStatusDTO);

    const nextTransactionDatetime =
      dca.status === DcaStatusEnum.ACTIVE
        ? computeNextDcaTransactionDatetime(dca)
        : undefined;

    return new DcaPresenter(dca, nextTransactionDatetime);
  }
}

export { UpdateDcaStatusUseCase };
