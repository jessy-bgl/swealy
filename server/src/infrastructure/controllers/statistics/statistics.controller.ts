import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { GlobalStatsUseCase } from '../../../usecases/statistics/global-statistics.usecase';
import { GlobalStatsPresenter } from '../../../usecases/statistics/statistics.presenter';

@ApiTags('statistics')
@Controller('statistics')
@ApiResponse({ status: 500, description: 'Internal error' })
class StatisticsController {
  constructor(private readonly globalStatsUseCase: GlobalStatsUseCase) {}

  @Get('global')
  @ApiResponse({ status: 200, type: GlobalStatsPresenter })
  fetchTransaction(): Promise<GlobalStatsPresenter> {
    return this.globalStatsUseCase.execute();
  }
}

export { StatisticsController };
