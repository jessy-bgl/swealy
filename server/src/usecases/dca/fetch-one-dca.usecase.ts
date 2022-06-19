import { Injectable } from '@nestjs/common';

import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';
import { DcaPresenter } from './dca.presenter';

@Injectable()
class FetchOneDcaUseCase {
  constructor(private readonly dcaRepository: IDcaRepository) {}

  async execute(id: string) {
    const dca = await this.dcaRepository.fetchOne(id);

    return new DcaPresenter(dca);
  }
}

export { FetchOneDcaUseCase };
