import { CreateDcaDTO } from '../../infrastructure/controllers/dca/dca.dto';
import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';

class CreateDcaUseCase {
  constructor(private readonly dcaRepository: IDcaRepository) {}

  // TODO : replace the dto or move it because it breaks the clean archi
  execute(createDcaDTO: CreateDcaDTO) {
    return this.dcaRepository.create(createDcaDTO);
  }
}

export { CreateDcaUseCase };
