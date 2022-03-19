import { Body, Controller, Post, Get, Param, Delete } from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateTransactionUseCase } from '../../../usecases/transaction/create-transaction.usecase';
import { DeleteTransactionUseCase } from '../../../usecases/transaction/delete-transaction.usecase';
import { FetchTransactionUseCase } from '../../../usecases/transaction/fetch-transaction.usecase';
import { TransactionPresenter } from '../../../usecases/transaction/transaction.presenter';
import {
  CreateTransactionDTO,
  CreateManualTransactionDTO,
} from './transaction.dto';

@ApiTags('transaction')
@Controller('transaction')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(CreateTransactionDTO, TransactionPresenter)
class TransactionController {
  constructor(
    private readonly fetchTransactionUsecase: FetchTransactionUseCase,
    private readonly createTransactionUsecase: CreateTransactionUseCase,
    private readonly deleteTransactionUsecase: DeleteTransactionUseCase,
  ) {}

  @Get()
  @ApiResponse({ status: 200, type: TransactionPresenter, isArray: true })
  fetchTransaction(): Promise<TransactionPresenter[]> {
    return this.fetchTransactionUsecase.execute();
  }

  @Post()
  @ApiBody({ type: CreateManualTransactionDTO })
  @ApiResponse({ status: 201, type: TransactionPresenter })
  createTransaction(
    @Body() createTransactionDTO: CreateManualTransactionDTO,
  ): Promise<TransactionPresenter> {
    return this.createTransactionUsecase.execute(createTransactionDTO);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: TransactionPresenter })
  deleteTransaction(@Param('id') id: string): Promise<TransactionPresenter> {
    return this.deleteTransactionUsecase.execute(id);
  }
}

export { TransactionController };
