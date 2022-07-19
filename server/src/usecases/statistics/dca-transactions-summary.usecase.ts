import { Injectable, NotFoundException } from '@nestjs/common';
import { sumBy, meanBy, round } from 'lodash';

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
      dcaId: id,
    });
    const asset = dca.pair.split('/')[0];
    const currentPrice = await this.coinRepository.fetchPrice(asset);
    const stats = new DcaTransactionsSummaryPresenter();
    stats.totalSize = sumBy(transactions, (t) => t.size);
    stats.totalInvested = round(
      sumBy(transactions, (t) => t.amount),
      2,
    );
    stats.avgPrice = round(
      meanBy(transactions, (t) => t.price),
      2,
    );
    stats.pnl = round(stats.totalSize * currentPrice - stats.totalInvested, 2);
    stats.pnlPercentage = round((stats.pnl * 100) / stats.totalInvested, 2);
    return stats;
  };
}

export { DcaTransactionsSummaryUseCase };
