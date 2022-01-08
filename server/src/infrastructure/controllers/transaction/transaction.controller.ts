import {
  Body,
  Controller,
  Post,
  Inject,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UseCaseProxy } from '../../../infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../../infrastructure/usecases-proxy/usecases-proxy.module';

import { CreateTransactionUseCase } from '../../../usecases/transaction/create-transaction.usecase';
import { DeleteTransactionUseCase } from '../../../usecases/transaction/delete-transaction.usecase';
import { FetchTransactionUseCase } from '../../../usecases/transaction/fetch-transaction.usecase';
import { TransactionPresenter } from '../../../usecases/transaction/transaction.presenter';
import { CreateTransactionDTO } from './transaction.dto';

@ApiTags('transaction')
@Controller('transaction')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(CreateTransactionDTO, TransactionPresenter)
class TransactionController {
  constructor(
    @Inject(UsecasesProxyModule.FETCH_TRANSACTION_USECASE_PROXY)
    private readonly fetchTransactionUsecase: UseCaseProxy<FetchTransactionUseCase>,
    @Inject(UsecasesProxyModule.CREATE_TRANSACTION_USECASE_PROXY)
    private readonly createTransactionUsecase: UseCaseProxy<CreateTransactionUseCase>,
    @Inject(UsecasesProxyModule.DELETE_TRANSACTION_USECASE_PROXY)
    private readonly deleteTransactionUsecase: UseCaseProxy<DeleteTransactionUseCase>,
  ) {}

  @Get()
  @ApiResponse({ status: 200, type: TransactionPresenter, isArray: true })
  fetchTransaction(): Promise<TransactionPresenter[]> {
    return this.fetchTransactionUsecase.getInstance().execute();
  }

  @Post()
  @ApiBody({ type: CreateTransactionDTO })
  @ApiResponse({ status: 201, type: TransactionPresenter })
  createTransaction(
    @Body() createTransactionDTO: CreateTransactionDTO,
  ): Promise<TransactionPresenter> {
    return this.createTransactionUsecase
      .getInstance()
      .execute(createTransactionDTO);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: TransactionPresenter })
  deleteTransaction(@Param('id') id: string): Promise<TransactionPresenter> {
    return this.deleteTransactionUsecase.getInstance().execute(id);
  }
}

export { TransactionController };
