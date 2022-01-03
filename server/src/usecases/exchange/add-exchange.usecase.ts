import {
  ICreateExchangeDTO,
  IExchangeDbRepository,
} from '../../domain/repositories/exchange-db.repository';

class AddExchangeUseCase {
  constructor(private readonly exchangeDbRepository: IExchangeDbRepository) {}

  execute(createExchangeDTO: ICreateExchangeDTO) {
    return this.exchangeDbRepository.create(createExchangeDTO);
  }
}

export { AddExchangeUseCase };
