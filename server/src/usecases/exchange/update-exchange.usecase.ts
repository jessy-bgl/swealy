import {
  IExchangeDbRepository,
  IUpdateExchangeDTO,
} from '../../domain/repositories/exchange-db.repository';
import { ExchangePresenter } from './exchange.presenter';

class UpdateExchangeUseCase {
  constructor(private readonly exchangeDbRepository: IExchangeDbRepository) {}

  async execute(id: string, dto: IUpdateExchangeDTO) {
    // if the secretKey is provided and contains '*', then delete this field
    // as the '*' are just here to hide the secretKey for the client
    if (dto.apiSecret && dto.apiSecret.includes('*')) delete dto.apiSecret;
    const exchange = await this.exchangeDbRepository.update(id, dto);
    return new ExchangePresenter(exchange);
  }
}

export { UpdateExchangeUseCase };
