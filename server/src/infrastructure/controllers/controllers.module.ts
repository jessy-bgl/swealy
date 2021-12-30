import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { DcaController } from './dca/dca.controller';
import { ExchangeController } from './exchange/exchange.controller';
import { TransactionController } from './transaction/transaction.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [ExchangeController, DcaController, TransactionController],
})
export class ControllersModule {}
