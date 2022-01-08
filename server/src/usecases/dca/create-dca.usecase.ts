import {
  ICreateDcaDTO,
  IDcaRepository,
} from '../../domain/repositories/dca.repository.interface';

class CreateDcaUseCase {
  constructor(private readonly dcaRepository: IDcaRepository) {}

  execute(createDcaDTO: ICreateDcaDTO) {
    return this.dcaRepository.create(createDcaDTO);
  }
}

export { CreateDcaUseCase };
