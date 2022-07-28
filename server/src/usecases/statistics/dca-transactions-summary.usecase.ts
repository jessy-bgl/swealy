import { Injectable, NotFoundException } from '@nestjs/common';
import { sumBy, sum, round } from 'lodash';

import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';
import { ICoinRepository } from '../../domain/repositories/coin.repository.interface';
import { ITransactionRepository } from '../../domain/repositories/transaction.repository';
import { DcaTransactionsSummaryPresenter } from './dca-transactions-summary.presenter';

@Injectable()
class DcaTransactionsSummaryUseCase {
  constructor(
    private readonly dcaRepository: IDcaRepository,
    private readonly transactionRepository: ITransactionRepository,
    private readonly coinRepository: ICoinRepository,
  ) {}

  execute = async (id: string): Promise<DcaTransactionsSummaryPresenter> => {
    const dca = await this.dcaRepository.fetchOne(id);
    if (!dca) throw new NotFoundException('dca not found');
    const transactions = await this.transactionRepository.fetch({
      dca: id,
    });
    const asset = dca.pair.split('/')[0];
    const currentPrice = await this.coinRepository.fetchPrice(asset);
    const stats = new DcaTransactionsSummaryPresenter();
    stats.totalSize = round(
      sumBy(transactions, (t) => t.size),
      6,
    );
    stats.totalInvested = round(
      sumBy(transactions, (t) => t.amount),
      2,
    );
    stats.avgPrice = round(
      sum(transactions.map((tr) => tr.size * tr.price)) /
        sumBy(transactions, (tr) => tr.size),
      2,
    );
    stats.currentValue = round(stats.totalSize * currentPrice, 2);
    stats.pnl = round(stats.currentValue - stats.totalInvested, 2);
    stats.pnlPercentage = round((stats.pnl * 100) / stats.totalInvested, 2);
    return stats;
  };
}

export { DcaTransactionsSummaryUseCase };
