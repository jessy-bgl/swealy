import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { DcaRepository } from '../repositories/dca.repository';
import { TransactionRepository } from '../repositories/transaction.repository';

@Injectable()
export class DcaService {
  private readonly logger = new Logger(DcaService.name);

  constructor(
    private readonly dcaRepository: DcaRepository,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  @Cron('00 00 * * * *')
  async handleDca() {
    const dcas = await this.dcaRepository.fetch();
    dcas.forEach(async (dca) => {
      // const lastTransaction =
      //   await this.transactionRepository.fetchLastDcaTransaction(dca);
      // TODO :
      // 1 - get last transaction date
      // 2 - if the number of days between the last transaction and
      // the current date is equal to 'frequencyInDays'
      // AND the current hour is equal to 'hour'
      // THEN place an order
      // AND create a transaction
    });
  }
}
