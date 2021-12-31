import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Types } from 'mongoose';

import { DcaRepository } from '../repositories/dca.repository';
import { TransactionRepository } from '../repositories/transaction.repository';
import { ExchangeApiRepository } from '../repositories/exchange-api.repository';

import { CreateTransactionDTO } from '../controllers/transaction/transaction.dto';

@Injectable()
export class DcaService {
  private readonly logger = new Logger(DcaService.name);

  constructor(
    private readonly dcaRepository: DcaRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly exchangeApiRepository: ExchangeApiRepository,
  ) {}

  @Cron('00 00 * * * *')
  async handleDca() {
    const dcas = await this.dcaRepository.fetch();
    dcas.forEach(async (dca) => {
      // if the dca is not active => skip it and go to the next
      if (!dca.isActive) return;

      // get last transaction of the DCA
      const lastTransaction =
        await this.transactionRepository.fetchLastDcaSuccessfulTransaction(
          dca.id,
        );

      // get the difference of days between now and the last transaction
      const dateNow = new Date();
      const diffInTime = lastTransaction
        ? dateNow.getTime() - lastTransaction.datetime.getTime()
        : null;
      const diffInDays = lastTransaction
        ? diffInTime / (1000 * 3600 * 24)
        : null;

      // if a the DCA frequency is reached => create a market order and add a transaction in db
      if (
        (diffInDays === null || diffInDays >= dca.frequencyInDays) &&
        dateNow.getHours() === dca.hour
      ) {
        const createTransactionDto = new CreateTransactionDTO();
        createTransactionDto.datetime = dateNow;
        createTransactionDto.amount = dca.amount;
        createTransactionDto.dca = new Types.ObjectId(dca.id);
        createTransactionDto.pair = dca.pair;
        try {
          const order = await this.exchangeApiRepository.createSpotOrder(dca);
          createTransactionDto.success = true;
          createTransactionDto.price = order.price;
          createTransactionDto.size = order.size;
          createTransactionDto.type = order.type;
          await this.transactionRepository.create(createTransactionDto);
        } catch (e) {
          this.logger.error(e.message);
          createTransactionDto.success = false;
          createTransactionDto.description = e.message;
          await this.transactionRepository.create(createTransactionDto);
        }
      }
    });
  }
}
