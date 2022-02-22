import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { DcaStatusEnum } from '../../domain/models/dca';
import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';
import { ITransactionRepository } from '../../domain/repositories/transaction.repository';
import { IExchangeApiRepository } from '../../domain/repositories/exchange-api.repository';
import { CreateOrderUseCase } from '../../usecases/order/create-order.usecase';

@Injectable()
export class DcaService {
  private readonly logger = new Logger(DcaService.name);

  constructor(
    private readonly dcaRepository: IDcaRepository,
    private readonly transactionRepository: ITransactionRepository,
    private readonly exchangeApiRepository: IExchangeApiRepository,
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
          ? dateNow.getTime() - lastAutoTransaction.datetime.setSeconds(0, 0)
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
            `~${amount} ${pairSplitted[1]} of ${pairSplitted[0]}`;
          this.logger.log(orderLog);
          createOrderUseCase.execute(dca);
        }
      } catch (e) {
        this.logger.error(e.message);
      }
    });
  }
}
