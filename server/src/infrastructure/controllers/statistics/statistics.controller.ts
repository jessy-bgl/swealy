import { Controller, Inject, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UseCaseProxy } from '../../../infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../../infrastructure/usecases-proxy/usecases-proxy.module';
import { FetchGlobalStatsUseCase } from '../../../usecases/statistics/fetch-global-statistics.usecase';
import { GlobalStatsPresenter } from '../../../usecases/statistics/statistics.presenter';

@ApiTags('statistics')
@Controller('statistics')
@ApiResponse({ status: 500, description: 'Internal error' })
class StatisticsController {
  constructor(
    @Inject(UsecasesProxyModule.FETCH_GLOBAL_STATS_USECASE_PROXY)
    private readonly fetchGlobalStatsUsecase: UseCaseProxy<FetchGlobalStatsUseCase>,
  ) {}

  @Get('global')
  @ApiResponse({ status: 200, type: GlobalStatsPresenter })
  fetchTransaction(): Promise<GlobalStatsPresenter> {
    return this.fetchGlobalStatsUsecase.getInstance().execute();
  }
}

export { StatisticsController };
