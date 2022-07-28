import { Injectable, Logger } from '@nestjs/common';
import * as _ from 'lodash';

import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';
import { ITransactionRepository } from '../../domain/repositories/transaction.repository';
import { Dca, DcaStatusEnum } from '../../domain/models/dca';
import { Transaction } from '../../domain/models/transaction';

import {
  DcaGlobalStats,
  GlobalStatsPresenter,
  TransactionGlobalStats,
  CurrenciesGlobalStats,
} from './global-statistics.presenter';

const getActiveDcas = (dcas: Dca[]) =>
  dcas.filter((dca) => dca.status === DcaStatusEnum.ACTIVE);

const getDcasTotalDailyAmount = (dcas: Dca[]) =>
  _.sum(dcas.map((dca) => dca.amount / dca.frequencyInDays));

const getDcasWithDailyAmount = (dcas: Dca[]) =>
  dcas.map((dca) => ({
    ...dca,
    dailyAmount: dca.amount / dca.frequencyInDays,
  }));

const getCurrenciesGlobalStats = (dcas: Dca[]): CurrenciesGlobalStats => {
  const activeDcasWithDailyAmount = getDcasWithDailyAmount(dcas);
  const dcasTotalDailyAmount = getDcasTotalDailyAmount(dcas);
  let currenciesGlobalStats = _(activeDcasWithDailyAmount)
    .groupBy('pair')
    .map((dca, pair) => ({
      name: pair.split('/')[0],
      weight: Number(
        (_.sumBy(dca, 'dailyAmount') / dcasTotalDailyAmount).toFixed(2),
      ),
    }))
    .value();
  currenciesGlobalStats = _(currenciesGlobalStats)
    .groupBy('name')
    .map((globalStats, name) => ({
      name,
      weight: _.sumBy(globalStats, 'weight'),
    }))
    .value();
  return currenciesGlobalStats;
};

const getDcaGlobalStats = (dcas: Dca[]) => ({
  total: dcas.length,
  active: dcas.filter((dca) => dca.status === DcaStatusEnum.ACTIVE).length,
  paused: dcas.filter((dca) => dca.status === DcaStatusEnum.PAUSED).length,
  archived: dcas.filter((dca) => dca.status === DcaStatusEnum.ARCHIVED).length,
});

const getTransactionGlobalStats = (transactions: Transaction[]) => ({
  total: transactions.length,
  success: transactions.filter((tr) => tr.success === true).length,
  fail: transactions.filter((tr) => tr.success === false).length,
  auto: transactions.filter((tr) => tr.manual === false).length,
  manual: transactions.filter((tr) => tr.manual === true).length,
});

@Injectable()
class GlobalStatsUseCase {
  private readonly logger = new Logger(GlobalStatsUseCase.name);

  constructor(
    private readonly dcaRepository: IDcaRepository,
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  execute = async (): Promise<GlobalStatsPresenter> => {
    try {
      const dcas = await this.dcaRepository.fetch();
      const transactions = await this.transactionRepository.fetch();

      const activeDcas = getActiveDcas(dcas);

      const currenciesGlobalStats: CurrenciesGlobalStats =
        getCurrenciesGlobalStats(activeDcas);

      const dcaGlobalStats: DcaGlobalStats = getDcaGlobalStats(dcas);

      const transactionGlobalStats: TransactionGlobalStats =
        getTransactionGlobalStats(transactions);

      return new GlobalStatsPresenter(
        dcaGlobalStats,
        transactionGlobalStats,
        currenciesGlobalStats,
      );
    } catch (e) {
      this.logger.error(e.message);
    }
  };
}

export { GlobalStatsUseCase };
