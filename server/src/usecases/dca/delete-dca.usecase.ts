import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';
import { DcaPresenter } from './dca.presenter';

class DeleteDcaUseCase {
  constructor(private readonly dcaRepository: IDcaRepository) {}

  async execute(id: string) {
    const dca = await this.dcaRepository.delete(id);
    return new DcaPresenter(dca);
  }
}

export { DeleteDcaUseCase };
