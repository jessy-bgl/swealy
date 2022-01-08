import {
  IDcaRepository,
  IUpdateDcaDTO,
} from '../../domain/repositories/dca.repository.interface';
import { DcaPresenter } from './dca.presenter';

class UpdateDcaUseCase {
  constructor(private readonly dcaRepository: IDcaRepository) {}

  async execute(id: string, updateDcaDTO: IUpdateDcaDTO) {
    const dca = await this.dcaRepository.update(id, updateDcaDTO);
    return new DcaPresenter(dca);
  }
}

export { UpdateDcaUseCase };
