import {
  IDcaRepository,
  IUpdateDcaDTO,
} from '../../domain/repositories/dca.repository.interface';

class UpdateDcaUseCase {
  constructor(private readonly dcaRepository: IDcaRepository) {}

  execute(id: string, updateDcaDTO: IUpdateDcaDTO) {
    return this.dcaRepository.update(id, updateDcaDTO);
  }
}

export { UpdateDcaUseCase };
