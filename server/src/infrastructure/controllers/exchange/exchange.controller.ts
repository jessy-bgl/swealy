import { Body, Controller, Post, Inject, Get, Param } from '@nestjs/common';

import { CheckExchangeApiKeyDTO } from './exchange.verify.dto';
import { CreateExchangeDTO } from './exchange.create.dto';

import { VerifyExchangeApiKeyUseCase } from '../../../usecases/exchange/verify-exchange.usecase';
import { FetchExchangesUseCase } from '../../../usecases/exchange/fetch-exchanges.usecase';
import { AddExchangeUseCase } from '../../../usecases/exchange/add-exchange.usecase';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';

@Controller('exchange')
class ExchangeController {
  constructor(
    @Inject(UsecasesProxyModule.VERIFY_EXCHANGE_USECASE_PROXY)
    private readonly verifyExchangeApiKeyUsecase: UseCaseProxy<VerifyExchangeApiKeyUseCase>,
    @Inject(UsecasesProxyModule.FETCH_EXCHANGES_USECASE_PROXY)
    private readonly fetchExchangesUsecase: UseCaseProxy<FetchExchangesUseCase>,
    @Inject(UsecasesProxyModule.ADD_EXCHANGE_USECASE_PROXY)
    private readonly addExchangeUsecase: UseCaseProxy<AddExchangeUseCase>,
  ) {}

  @Get()
  async fetchExchanges() {
    return this.fetchExchangesUsecase.getInstance().execute();
  }

  @Post()
  async addExchange(@Body() createExchangeDTO: CreateExchangeDTO) {
    return this.addExchangeUsecase.getInstance().execute(createExchangeDTO);
  }

  @Get(':id/check')
  async checkApiKeyValidity(@Param('id') id: string): Promise<boolean> {
    return this.verifyExchangeApiKeyUsecase.getInstance().execute(id);
  }
}

export { ExchangeController };
