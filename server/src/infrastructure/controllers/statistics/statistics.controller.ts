import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { FetchGlobalStatsUseCase } from '../../../usecases/statistics/fetch-global-statistics.usecase';
import { GlobalStatsPresenter } from '../../../usecases/statistics/statistics.presenter';

@ApiTags('statistics')
@Controller('statistics')
@ApiResponse({ status: 500, description: 'Internal error' })
class StatisticsController {
  constructor(
    private readonly fetchGlobalStatsUsecase: FetchGlobalStatsUseCase,
  ) {}

  @Get('global')
  @ApiResponse({ status: 200, type: GlobalStatsPresenter })
  fetchTransaction(): Promise<GlobalStatsPresenter> {
    return this.fetchGlobalStatsUsecase.execute();
  }
}

export { StatisticsController };
