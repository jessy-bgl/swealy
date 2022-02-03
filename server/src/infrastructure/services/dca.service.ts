import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { DcaRepository } from '../repositories/dca.repository';
import { TransactionRepository } from '../repositories/transaction.repository';
import { ExchangeApiRepository } from '../repositories/exchange-api.repository';
import { CreateOrderUseCase } from '../../usecases/order/create-order.usecase';
import { DcaStatusEnum } from '../../domain/models/dca';

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
    const createOrderUseCase = new CreateOrderUseCase(
      this.exchangeApiRepository,
      this.transactionRepository,
      this.dcaRepository,
    );

    const dcas = await this.dcaRepository.fetch();
    dcas.forEach(async (dca) => {
      // if the dca is not active => skip it and go to the next
      if (dca.status !== DcaStatusEnum.ACTIVE) return;

      try {
        const lastAutoTransaction =
          await this.transactionRepository.fetchLastDcaAutoTransaction(dca.id);

        // get the difference of days between now and the last successful transaction
        const dateNow = new Date();
        const diffInTime = lastAutoTransaction
          ? dateNow.getTime() - lastAutoTransaction.datetime.getTime()
          : null;
        const diffInDays = lastAutoTransaction
          ? diffInTime / (1000 * 3600 * 24)
          : null;
        const isDcaFrequencyReached =
          (diffInDays === null || diffInDays >= dca.frequencyInDays) &&
          dateNow.getHours() === dca.hour;

        if (isDcaFrequencyReached) {
          const exchangeLabel = dca.exchange.label;
          const amount = dca.amount;
          const pairSplitted = dca.pair.split('/');
          const orderLog =
            `New spot order on ${exchangeLabel} : ` +
            `~${amount} ${pairSplitted[0]} of ${pairSplitted[1]}`;
          this.logger.log(orderLog);
          createOrderUseCase.execute(dca);
        }
      } catch (e) {
        this.logger.error(e.message);
      }
    });
  }
}
