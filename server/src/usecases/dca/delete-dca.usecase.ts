import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';

class DeleteDcaUseCase {
  constructor(private readonly dcaRepository: IDcaRepository) {}

  execute(id: string) {
    return this.dcaRepository.delete(id);
  }
}

export { DeleteDcaUseCase };
