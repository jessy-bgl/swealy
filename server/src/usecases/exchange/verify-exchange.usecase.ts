import { IExchangeApiRepository } from '../../domain/repositories/exchange-api.repository.interface';
import { Exchange, ExchangeEnum } from '../../domain/entities/exchange.entity';

class VerifyExchangeApiKeyUseCase {
  constructor(private readonly exchangeApiRepository: IExchangeApiRepository) {}

  execute = (apiKey: string, apiSecret: string, subaccountName: string) => {
    // TODO : get Exchange in DB before passing it in params
    const exchange = new Exchange();
    exchange.name = ExchangeEnum.FTX;
    exchange.apiKey = apiKey;
    exchange.apiSecret = apiSecret;
    exchange.subaccountName = subaccountName;
    return this.exchangeApiRepository.checkApiKeyValidity(exchange);
  };
}

export { VerifyExchangeApiKeyUseCase };
