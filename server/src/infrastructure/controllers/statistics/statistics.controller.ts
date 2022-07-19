import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GlobalStatsUseCase } from '../../../usecases/statistics/global-statistics.usecase';
import { GlobalStatsPresenter } from '../../../usecases/statistics/global-statistics.presenter';
import { DcaTransactionsSummaryPresenter } from '../../../usecases/statistics/dca-transactions-summary.presenter';
import { DcaTransactionsSummaryUseCase } from '../../../usecases/statistics/dca-transactions-summary.usecase';

@ApiTags('statistics')
@Controller('statistics')
@ApiResponse({ status: 500, description: 'Internal error' })
class StatisticsController {
  constructor(
    private readonly globalStatsUseCase: GlobalStatsUseCase,
    private readonly dcaTransactionsSummaryUseCase: DcaTransactionsSummaryUseCase,
  ) {}

  @Get('global')
  @ApiResponse({ status: 200, type: GlobalStatsPresenter })
  fetchGlobalStats(): Promise<GlobalStatsPresenter> {
    return this.globalStatsUseCase.execute();
  }

  @Get('dca/transactions/summary')
  @ApiQuery({ name: 'dcaId', type: String })
  @ApiResponse({ status: 200, type: DcaTransactionsSummaryPresenter })
  fetchDcaTransactionsSummary(
    @Query('dcaId') dcaId: string,
  ): Promise<DcaTransactionsSummaryPresenter> {
    return this.dcaTransactionsSummaryUseCase.execute(dcaId);
  }
}

export { StatisticsController };
