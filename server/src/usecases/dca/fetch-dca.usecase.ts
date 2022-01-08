import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';
import { DcaPresenter } from './dca.presenter';

class FetchDcaUseCase {
  constructor(private readonly dcaRepository: IDcaRepository) {}

  async execute() {
    const dcas = await this.dcaRepository.fetch();
    return dcas.map((dca) => new DcaPresenter(dca));
  }
}

export { FetchDcaUseCase };
