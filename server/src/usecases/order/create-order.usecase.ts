import { Logger } from '@nestjs/common';

import { Dca } from '../../domain/models/dca';
import { CreateTransactionDTO } from '../../infrastructure/controllers/transaction/transaction.dto';
import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';
import { ITransactionRepository } from '../../domain/repositories/transaction.repository';
import { IExchangeApiRepository } from '../../domain/repositories/exchange-api.repository';

class CreateOrderUseCase {
  private readonly logger = new Logger(CreateOrderUseCase.name);

  constructor(
    private readonly exchangeApiRepository: IExchangeApiRepository,
    private readonly transactionRepository: ITransactionRepository,
    private readonly dcaRepository: IDcaRepository,
  ) {}

  execute = async (dca: Dca): Promise<void> => {
    const createTransactionDto = new CreateTransactionDTO();
    createTransactionDto.datetime = new Date();
    createTransactionDto.amount = dca.amount;
    createTransactionDto.dca = dca.id;
    try {
      const order = await this.exchangeApiRepository.createSpotOrder(dca);
      createTransactionDto.success = true;
      createTransactionDto.price = order.price;
      createTransactionDto.size = order.size;
      createTransactionDto.type = order.type;
      const pairSplitted = dca.pair.split('/');
      const successLog =
        `Spot order success : ${order.size} ${pairSplitted[0]} ` +
        `bought at the price of ${order.price} ${pairSplitted[1]}`;
      this.logger.log(successLog);
      await this.transactionRepository.create(createTransactionDto);
      await this.dcaRepository.incSuccessfulTransactionsCounter(dca.id, 1);
    } catch (e) {
      this.logger.error(e.message);
      createTransactionDto.success = false;
      createTransactionDto.description = e.message;
      await this.transactionRepository.create(createTransactionDto);
    }
  };
}

export { CreateOrderUseCase };
