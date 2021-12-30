import {
  Body,
  Controller,
  Post,
  Inject,
  Get,
  Param,
  Delete,
} from '@nestjs/common';

import { UseCaseProxy } from '../../../infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../../infrastructure/usecases-proxy/usecases-proxy.module';

import { CreateTransactionUseCase } from '../../../usecases/transaction/create-transaction.usecase';
import { DeleteTransactionUseCase } from '../../../usecases/transaction/delete-transaction.usecase';
import { FetchTransactionUseCase } from '../../../usecases/transaction/fetch-transaction.usecase';

import { CreateTransactionDTO } from './transaction.create.dto';

@Controller('transaction')
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
  fetchTransaction() {
    return this.fetchTransactionUsecase.getInstance().execute();
  }

  @Post()
  createTransaction(@Body() createTransactionDTO: CreateTransactionDTO) {
    return this.createTransactionUsecase
      .getInstance()
      .execute(createTransactionDTO);
  }

  @Delete(':id')
  deleteTransaction(@Param('id') id: string) {
    return this.deleteTransactionUsecase.getInstance().execute(id);
  }
}

export { TransactionController };
