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
import { ApiTags } from '@nestjs/swagger';

import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { VerifyExchangeApiKeyUseCase } from '../../../usecases/exchange/verify-exchange.usecase';
import { FetchExchangesUseCase } from '../../../usecases/exchange/fetch-exchanges.usecase';
import { AddExchangeUseCase } from '../../../usecases/exchange/add-exchange.usecase';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UpdateExchangeUseCase } from '../../../usecases/exchange/update-exchange.usecase';
import { DeleteExchangeUseCase } from '../../../usecases/exchange/delete-exchange.usecase';
import { PairsExchangeApiKeyUseCase } from '../../../usecases/exchange/fetch-exchange-pairs.usecase';

import { CreateExchangeDTO, UpdateExchangeDTO } from './exchange.dto';
import { ExchangePresenter } from './exchange.presenter';
import { IPairsResult } from '../../../domain/repositories/types';

@ApiTags('exchange')
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
    private readonly getPairsExchangeApiKeyUsecase: UseCaseProxy<PairsExchangeApiKeyUseCase>,
  ) {}

  @Get()
  async fetchExchanges(): Promise<ExchangePresenter[]> {
    const exchanges = await this.fetchExchangesUsecase.getInstance().execute();
    return exchanges.map((exchange) => new ExchangePresenter(exchange));
  }

  @Post()
  async addExchange(
    @Body() createExchangeDTO: CreateExchangeDTO,
  ): Promise<ExchangePresenter> {
    const exchange = await this.addExchangeUsecase
      .getInstance()
      .execute(createExchangeDTO);
    return new ExchangePresenter(exchange);
  }

  @Put(':id')
  async updateExchange(
    @Param('id') id: string,
    @Body() updateExchangeDTO: UpdateExchangeDTO,
  ): Promise<ExchangePresenter> {
    const exchange = await this.updateExchangeUsecase
      .getInstance()
      .execute(id, updateExchangeDTO);
    return new ExchangePresenter(exchange);
  }

  @Delete(':id')
  async deleteExchange(@Param('id') id: string): Promise<ExchangePresenter> {
    const exchange = await this.deleteExchangeUsecase.getInstance().execute(id);
    return new ExchangePresenter(exchange);
  }

  @Get(':id/check')
  async checkApiKeyValidity(@Param('id') id: string): Promise<boolean> {
    return this.verifyExchangeApiKeyUsecase.getInstance().execute(id);
  }

  @Get(':id/pairs')
  async getPairs(@Param('id') id: string): Promise<IPairsResult[]> {
    return this.getPairsExchangeApiKeyUsecase.getInstance().execute(id);
  }
}

export { ExchangeController };
