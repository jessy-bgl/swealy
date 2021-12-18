import { DynamicModule, Module } from '@nestjs/common';

import { ExchangeApiRepository } from '../repositories/exchange-api.repository';
import { RepositoriesModule } from '../repositories/repositories.module';

import { VerifyExchangeApiKeyUseCase } from '../../usecases/exchange/verify-exchange.usecase';
import { UseCaseProxy } from './usecases-proxy';
import { HttpCustomModule } from '../config/axios/http.module';

@Module({
  imports: [HttpCustomModule, RepositoriesModule],
})
export class UsecasesProxyModule {
  static ADD_EXCHANGE_USECASE_PROXY = 'addExchangeUsecaseProxy';
  static DELETE_EXCHANGE_USECASE_PROXY = 'deleteExchangeUsecaseProxy';
  static UPDATE_EXCHANGE_USECASE_PROXY = 'updateExchangeUsecaseProxy';
  static VERIFY_EXCHANGE_USECASE_PROXY = 'verifyExchangeUsecaseProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      imports: [HttpCustomModule],
      providers: [
        {
          inject: [ExchangeApiRepository],
          provide: UsecasesProxyModule.VERIFY_EXCHANGE_USECASE_PROXY,
          useFactory: (repository: ExchangeApiRepository) =>
            new UseCaseProxy(new VerifyExchangeApiKeyUseCase(repository)),
        },
      ],
      exports: [UsecasesProxyModule.VERIFY_EXCHANGE_USECASE_PROXY],
    };
  }
}
