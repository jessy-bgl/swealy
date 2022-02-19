import { Injectable } from '@nestjs/common';

import { DcaStatusEnum } from '../../domain/models/dca';
import {
  IDcaRepository,
  IUpdateDcaDTO,
} from '../../domain/repositories/dca.repository.interface';
import { DcaPresenter } from './dca.presenter';
import { computeNextDcaTransactionDatetime } from './utils';

@Injectable()
class UpdateDcaUseCase {
  constructor(private readonly dcaRepository: IDcaRepository) {}

  async execute(id: string, updateDcaDTO: IUpdateDcaDTO) {
    const dca = await this.dcaRepository.update(id, updateDcaDTO);

    const nextTransactionDatetime =
      dca.status === DcaStatusEnum.ACTIVE
        ? computeNextDcaTransactionDatetime(dca)
        : undefined;

    return new DcaPresenter(dca, nextTransactionDatetime);
  }
}

export { UpdateDcaUseCase };
