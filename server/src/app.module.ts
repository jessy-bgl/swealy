import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { HttpCustomModule } from './infrastructure/config/axios/http.module';
import { DatabaseModule } from './infrastructure/config/mongoose/database.module';
import { ServicesModule } from './infrastructure/services/services.module';
import { ExchangeModule } from './infrastructure/ioc/exchange.module';
import { DcaModule } from './infrastructure/ioc/dca.module';
import { TransactionModule } from './infrastructure/ioc/transaction.module';
import { StatisticsModule } from './infrastructure/ioc/statistics.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    DatabaseModule,
    HttpCustomModule,
    ServicesModule,
    ExchangeModule,
    DcaModule,
    TransactionModule,
    StatisticsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
