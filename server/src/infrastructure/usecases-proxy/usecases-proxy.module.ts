import { DynamicModule, Module } from '@nestjs/common';

import { HttpCustomModule } from '../config/axios/http.module';

import { ExchangeApiRepository } from '../repositories/exchange-api.repository';
import { RepositoriesModule } from '../repositories/repositories.module';
import { ExchangeDbRepository } from '../repositories/exchange-db.repository';

import { UseCaseProxy } from './usecases-proxy';
import { FetchExchangesUseCase } from '../../usecases/exchange/fetch-exchanges.usecase';
import { AddExchangeUseCase } from '../../usecases/exchange/add-exchange.usecase';
import { VerifyExchangeApiKeyUseCase } from '../../usecases/exchange/verify-exchange.usecase';
import { UpdateExchangeUseCase } from '../../usecases/exchange/update-exchange.usecase';

@Module({
  imports: [HttpCustomModule, RepositoriesModule],
})
export class UsecasesProxyModule {
  static FETCH_EXCHANGES_USECASE_PROXY = 'fetchExchangesUsecaseProxy';
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
          inject: [ExchangeDbRepository],
          provide: UsecasesProxyModule.FETCH_EXCHANGES_USECASE_PROXY,
          useFactory: (repository: ExchangeDbRepository) =>
            new UseCaseProxy(new FetchExchangesUseCase(repository)),
        },
        {
          inject: [ExchangeDbRepository],
          provide: UsecasesProxyModule.ADD_EXCHANGE_USECASE_PROXY,
          useFactory: (repository: ExchangeDbRepository) =>
            new UseCaseProxy(new AddExchangeUseCase(repository)),
        },
        {
          inject: [ExchangeDbRepository],
          provide: UsecasesProxyModule.UPDATE_EXCHANGE_USECASE_PROXY,
          useFactory: (repository: ExchangeDbRepository) =>
            new UseCaseProxy(new UpdateExchangeUseCase(repository)),
        },
        {
          inject: [ExchangeDbRepository, ExchangeApiRepository],
          provide: UsecasesProxyModule.VERIFY_EXCHANGE_USECASE_PROXY,
          useFactory: (
            dbRepository: ExchangeDbRepository,
            apiRepository: ExchangeApiRepository,
          ) =>
            new UseCaseProxy(
              new VerifyExchangeApiKeyUseCase(dbRepository, apiRepository),
            ),
        },
      ],
      exports: [
        UsecasesProxyModule.FETCH_EXCHANGES_USECASE_PROXY,
        UsecasesProxyModule.ADD_EXCHANGE_USECASE_PROXY,
        UsecasesProxyModule.UPDATE_EXCHANGE_USECASE_PROXY,
        UsecasesProxyModule.VERIFY_EXCHANGE_USECASE_PROXY,
      ],
    };
  }
}
