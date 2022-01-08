import {
  IExchangeDbRepository,
  IUpdateExchangeDTO,
} from '../../domain/repositories/exchange-db.repository';

class UpdateExchangeUseCase {
  constructor(private readonly exchangeDbRepository: IExchangeDbRepository) {}

  execute(id: string, updateExchangeDTO: IUpdateExchangeDTO) {
    return this.exchangeDbRepository.update(id, updateExchangeDTO);
  }
}

export { UpdateExchangeUseCase };
