import {
  ICreateDcaDTO,
  IDcaRepository,
} from '../../domain/repositories/dca.repository.interface';
import { DcaPresenter } from './dca.presenter';

class CreateDcaUseCase {
  constructor(private readonly dcaRepository: IDcaRepository) {}

  async execute(createDcaDTO: ICreateDcaDTO) {
    const dca = await this.dcaRepository.create(createDcaDTO);
    const dcaPresenter = new DcaPresenter(dca);
    // TODO : set nextTransactionDatetime
    return dcaPresenter;
  }
}

export { CreateDcaUseCase };
