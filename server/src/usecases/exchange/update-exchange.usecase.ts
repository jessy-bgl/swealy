import { UpdateExchangeDTO } from '../../infrastructure/controllers/exchange/exchange.dto';
import { IExchangeDbRepository } from '../../domain/repositories/exchange-db.repository';

class UpdateExchangeUseCase {
  constructor(private readonly exchangeDbRepository: IExchangeDbRepository) {}

  // TODO : replace DTO as it breaks the clean archi
  execute(id: string, updateExchangeDTO: UpdateExchangeDTO) {
    return this.exchangeDbRepository.update(id, updateExchangeDTO);
  }
}

export { UpdateExchangeUseCase };
