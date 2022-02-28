import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { VerifyExchangeApiKeyUseCase } from '../../../usecases/exchange/verify-exchange.usecase';
import { FetchExchangesUseCase } from '../../../usecases/exchange/fetch-exchanges.usecase';
import { AddExchangeUseCase } from '../../../usecases/exchange/add-exchange.usecase';
import { UpdateExchangeUseCase } from '../../../usecases/exchange/update-exchange.usecase';
import { DeleteExchangeUseCase } from '../../../usecases/exchange/delete-exchange.usecase';
import { FetchExchangePairsUseCase } from '../../../usecases/exchange/fetch-exchange-pairs.usecase';

import { CreateExchangeDTO, UpdateExchangeDTO } from './exchange.dto';
import {
  ExchangePresenter,
  PairResult,
} from '../../../usecases/exchange/exchange.presenter';
import { IPairResult } from '../../../domain/repositories/types';

@ApiTags('exchange')
@Controller('exchange')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(CreateExchangeDTO, UpdateExchangeDTO, ExchangePresenter)
class ExchangeController {
  constructor(
    private readonly fetchExchangesUsecase: FetchExchangesUseCase,
    private readonly addExchangeUsecase: AddExchangeUseCase,
    private readonly updateExchangeUsecase: UpdateExchangeUseCase,
    private readonly deleteExchangeUsecase: DeleteExchangeUseCase,
    private readonly verifyExchangeApiKeyUsecase: VerifyExchangeApiKeyUseCase,
    private readonly fetchExchangePairsUseCase: FetchExchangePairsUseCase,
  ) {}

  @Get()
  @ApiResponse({ status: 200, type: ExchangePresenter, isArray: true })
  fetchExchanges(): Promise<ExchangePresenter[]> {
    return this.fetchExchangesUsecase.execute();
  }

  @Post()
  @ApiBody({ type: CreateExchangeDTO })
  @ApiResponse({ status: 201, type: ExchangePresenter })
  addExchange(
    @Body() createExchangeDTO: CreateExchangeDTO,
  ): Promise<ExchangePresenter> {
    return this.addExchangeUsecase.execute(createExchangeDTO);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateExchangeDTO })
  @ApiResponse({ status: 200, type: ExchangePresenter })
  updateExchange(
    @Param('id') id: string,
    @Body() updateExchangeDTO: UpdateExchangeDTO,
  ): Promise<ExchangePresenter> {
    return this.updateExchangeUsecase.execute(id, updateExchangeDTO);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: ExchangePresenter })
  deleteExchange(@Param('id') id: string): Promise<ExchangePresenter> {
    return this.deleteExchangeUsecase.execute(id);
  }

  @Get(':id/check')
  @HttpCode(204)
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204, description: 'Success' })
  checkApiKeyValidity(@Param('id') id: string): Promise<void> {
    return this.verifyExchangeApiKeyUsecase.execute(id);
  }

  @Get(':id/pairs')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: PairResult, isArray: true })
  getPairs(@Param('id') id: string): Promise<IPairResult[]> {
    return this.fetchExchangePairsUseCase.execute(id);
  }
}

export { ExchangeController };
