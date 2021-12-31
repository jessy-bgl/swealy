import {
  Body,
  Controller,
  Post,
  Inject,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UseCaseProxy } from '../../../infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../../infrastructure/usecases-proxy/usecases-proxy.module';

import { CreateTransactionUseCase } from '../../../usecases/transaction/create-transaction.usecase';
import { DeleteTransactionUseCase } from '../../../usecases/transaction/delete-transaction.usecase';
import { FetchTransactionUseCase } from '../../../usecases/transaction/fetch-transaction.usecase';

import { CreateTransactionDTO } from './transaction.dto';
import { TransactionPresenter } from './transaction.presenter';

@ApiTags('transaction')
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
  async fetchTransaction(): Promise<TransactionPresenter[]> {
    const transactions = await this.fetchTransactionUsecase
      .getInstance()
      .execute();
    return transactions.map(
      (transaction) => new TransactionPresenter(transaction),
    );
  }

  @Post()
  async createTransaction(
    @Body() createTransactionDTO: CreateTransactionDTO,
  ): Promise<TransactionPresenter> {
    const transaction = await this.createTransactionUsecase
      .getInstance()
      .execute(createTransactionDTO);
    return new TransactionPresenter(transaction);
  }

  @Delete(':id')
  async deleteTransaction(
    @Param('id') id: string,
  ): Promise<TransactionPresenter> {
    const transaction = await this.deleteTransactionUsecase
      .getInstance()
      .execute(id);
    return new TransactionPresenter(transaction);
  }
}

export { TransactionController };
