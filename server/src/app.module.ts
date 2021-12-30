import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { HttpCustomModule } from './infrastructure/config/axios/http.module';
import { DatabaseModule } from './infrastructure/config/mongoose/database.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { ServicesModule } from './infrastructure/services/services.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    DatabaseModule,
    HttpCustomModule,
    UsecasesProxyModule,
    ControllersModule,
    ServicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
