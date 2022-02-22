import { Injectable } from '@nestjs/common';

import {
  ICreateDcaDTO,
  IDcaRepository,
} from '../../domain/repositories/dca.repository.interface';
import { DcaPresenter } from './dca.presenter';
import { computeNextDcaTransactionDatetime } from './utils';

@Injectable()
class CreateDcaUseCase {
  constructor(private readonly dcaRepository: IDcaRepository) {}

  async execute(createDcaDTO: ICreateDcaDTO) {
    const dca = await this.dcaRepository.create(createDcaDTO);
    const nextTransactionDatetime = computeNextDcaTransactionDatetime(dca);
    const dcaPresenter = new DcaPresenter(dca, nextTransactionDatetime);
    return dcaPresenter;
  }
}

export { CreateDcaUseCase };
