import { Body, Controller, Post, Inject, HttpCode } from '@nestjs/common';
import { VerifyExchangeApiKeyUseCase } from '../../../usecases/exchange/verify-exchange.usecase';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { CheckExchangeApiKeyDTO } from './exchange.verify.dto';

@Controller('exchange')
class ExchangeController {
  constructor(
    @Inject(UsecasesProxyModule.VERIFY_EXCHANGE_USECASE_PROXY)
    private readonly verifyExchangeApiKeyUsecase: UseCaseProxy<VerifyExchangeApiKeyUseCase>,
  ) {}

  @Post('check')
  async checkApiKeyValidity(
    @Body() checkExchangeApiKeyDTO: CheckExchangeApiKeyDTO,
  ): Promise<boolean> {
    // TODO : replace DTO data by Exchange ID only
    const { apiKey, apiSecret, subaccountName } = checkExchangeApiKeyDTO;
    return this.verifyExchangeApiKeyUsecase
      .getInstance()
      .execute(apiKey, apiSecret, subaccountName);
  }
}

export { ExchangeController };
