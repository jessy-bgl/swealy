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
import {
  ApiBody,
  ApiExtraModels,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { VerifyExchangeApiKeyUseCase } from '../../../usecases/exchange/verify-exchange.usecase';
import { FetchExchangesUseCase } from '../../../usecases/exchange/fetch-exchanges.usecase';
import { AddExchangeUseCase } from '../../../usecases/exchange/add-exchange.usecase';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UpdateExchangeUseCase } from '../../../usecases/exchange/update-exchange.usecase';
import { DeleteExchangeUseCase } from '../../../usecases/exchange/delete-exchange.usecase';
import { PairsExchangeApiKeyUseCase } from '../../../usecases/exchange/fetch-exchange-pairs.usecase';

import { CreateExchangeDTO, UpdateExchangeDTO } from './exchange.dto';
import {
  ExchangePresenter,
  PairsResult,
} from '../../../usecases/exchange/exchange.presenter';
import { IPairResult } from '../../../domain/repositories/types';

@ApiTags('exchange')
@Controller('exchange')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(CreateExchangeDTO, UpdateExchangeDTO, ExchangePresenter)
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
  @ApiResponse({ status: 200, type: ExchangePresenter, isArray: true })
  fetchExchanges(): Promise<ExchangePresenter[]> {
    return this.fetchExchangesUsecase.getInstance().execute();
  }

  @Post()
  @ApiBody({ type: CreateExchangeDTO })
  @ApiResponse({ status: 201, type: ExchangePresenter })
  addExchange(
    @Body() createExchangeDTO: CreateExchangeDTO,
  ): Promise<ExchangePresenter> {
    return this.addExchangeUsecase.getInstance().execute(createExchangeDTO);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateExchangeDTO })
  @ApiResponse({ status: 200, type: ExchangePresenter })
  updateExchange(
    @Param('id') id: string,
    @Body() updateExchangeDTO: UpdateExchangeDTO,
  ): Promise<ExchangePresenter> {
    return this.updateExchangeUsecase
      .getInstance()
      .execute(id, updateExchangeDTO);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: ExchangePresenter })
  deleteExchange(@Param('id') id: string): Promise<ExchangePresenter> {
    return this.deleteExchangeUsecase.getInstance().execute(id);
  }

  @Get(':id/check')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: Boolean })
  checkApiKeyValidity(@Param('id') id: string): Promise<boolean> {
    return this.verifyExchangeApiKeyUsecase.getInstance().execute(id);
  }

  @Get(':id/pairs')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: PairsResult, isArray: true })
  getPairs(@Param('id') id: string): Promise<IPairResult[]> {
    return this.getPairsExchangeApiKeyUsecase.getInstance().execute(id);
  }
}

export { ExchangeController };
