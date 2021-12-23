import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';

class FetchDcaUseCase {
  constructor(private readonly dcaRepository: IDcaRepository) {}

  execute() {
    return this.dcaRepository.fetch();
  }
}

export { FetchDcaUseCase };
