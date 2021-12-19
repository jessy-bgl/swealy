import {
  Body,
  Controller,
  Post,
  Inject,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { VerifyExchangeApiKeyUseCase } from '../../../usecases/exchange/verify-exchange.usecase';
import { FetchExchangesUseCase } from '../../../usecases/exchange/fetch-exchanges.usecase';
import { AddExchangeUseCase } from '../../../usecases/exchange/add-exchange.usecase';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UpdateExchangeUseCase } from '../../../usecases/exchange/update-exchange.usecase';
import { DeleteExchangeUseCase } from '../../../usecases/exchange/delete-exchange.usecase';
import { MarketsExchangeApiKeyUseCase } from '../../../usecases/exchange/markets-exchange.usecase';

import { CreateExchangeDTO } from './exchange.create.dto';
import { UpdateExchangeDTO } from './exchange.update.dto';

@Controller('exchange')
class ExchangeController {
  constructor(
    @Inject(UsecasesProxyModule.FETCH_EXCHANGES_USECASE_PROXY)
    private readonly fetchExchangesUsecase: UseCaseProxy<FetchExchangesUseCase>,
    @Inject(UsecasesProxyModule.ADD_EXCHANGE_USECASE_PROXY)
    private readonly addExchangeUsecase: UseCaseProxy<AddExchangeUseCase>,
    @Inject(UsecasesProxyModule.UPDATE_EXCHANGE_USECASE_PROXY)
    private readonly updateExchangeUsecase: UseCaseProxy<UpdateExchangeUseCase>,
    @Inject(UsecasesProxyModule.DELETE_EXCHANGE_USECASE_PROXY)
    private readonly deleteExchangeUsecase: UseCaseProxy<DeleteExchangeUseCase>,
    @Inject(UsecasesProxyModule.VERIFY_EXCHANGE_USECASE_PROXY)
    private readonly verifyExchangeApiKeyUsecase: UseCaseProxy<VerifyExchangeApiKeyUseCase>,
    @Inject(UsecasesProxyModule.GET_MARKETS_EXCHANGE_USECASE_PROXY)
    private readonly getMarketsExchangeApiKeyUsecase: UseCaseProxy<MarketsExchangeApiKeyUseCase>,
  ) {}

  @Get()
  async fetchExchanges() {
    return this.fetchExchangesUsecase.getInstance().execute();
  }

  @Post()
  async addExchange(@Body() createExchangeDTO: CreateExchangeDTO) {
    return this.addExchangeUsecase.getInstance().execute(createExchangeDTO);
  }

  @Put(':id')
  async updateExchange(
    @Param('id') id: string,
    @Body() updateExchangeDTO: UpdateExchangeDTO,
  ) {
    return this.updateExchangeUsecase
      .getInstance()
      .execute(id, updateExchangeDTO);
  }

  @Delete(':id')
  async deleteExchange(@Param('id') id: string) {
    return this.deleteExchangeUsecase.getInstance().execute(id);
  }

  @Get(':id/check')
  async checkApiKeyValidity(@Param('id') id: string) {
    return this.verifyExchangeApiKeyUsecase.getInstance().execute(id);
  }

  @Get(':id/markets')
  async getMarkets(@Param('id') id: string) {
    return this.getMarketsExchangeApiKeyUsecase.getInstance().execute(id);
  }
}

export { ExchangeController };
