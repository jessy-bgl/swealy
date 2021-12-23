import { CreateExchangeDTO } from '../../infrastructure/controllers/exchange/exchange.create.dto';
import { IExchangeDbRepository } from '../../domain/repositories/exchange-db.repository';

class AddExchangeUseCase {
  constructor(private readonly exchangeDbRepository: IExchangeDbRepository) {}

  // TODO : replace the dto or move it because it breaks the clean archi
  execute(createExchangeDTO: CreateExchangeDTO) {
    return this.exchangeDbRepository.create(createExchangeDTO);
  }
}

export { AddExchangeUseCase };
