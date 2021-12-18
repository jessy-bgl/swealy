import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { ExchangeController } from './exchange/exchange.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [ExchangeController],
})
export class ControllersModule {}
