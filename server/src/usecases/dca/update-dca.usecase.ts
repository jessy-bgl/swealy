import { UpdateDcaDTO } from '../../infrastructure/controllers/dca/dca.dto';
import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';

class UpdateDcaUseCase {
  constructor(private readonly dcaRepository: IDcaRepository) {}

  // TODO : replace the dto or move it because it breaks the clean archi
  execute(id: string, updateDcaDTO: UpdateDcaDTO) {
    return this.dcaRepository.update(id, updateDcaDTO);
  }
}

export { UpdateDcaUseCase };
