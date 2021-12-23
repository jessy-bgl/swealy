import { DynamicModule, Module } from '@nestjs/common';

import { HttpCustomModule } from '../config/axios/http.module';

import { ExchangeApiRepository } from '../repositories/exchange-api.repository';
import { RepositoriesModule } from '../repositories/repositories.module';
import { ExchangeDbRepository } from '../repositories/exchange-db.repository';
import { DcaRepository } from '../repositories/dca.repository';

import { UseCaseProxy } from './usecases-proxy';
import { FetchExchangesUseCase } from '../../usecases/exchange/fetch-exchanges.usecase';
import { AddExchangeUseCase } from '../../usecases/exchange/add-exchange.usecase';
import { VerifyExchangeApiKeyUseCase } from '../../usecases/exchange/verify-exchange.usecase';
import { UpdateExchangeUseCase } from '../../usecases/exchange/update-exchange.usecase';
import { DeleteExchangeUseCase } from '../../usecases/exchange/delete-exchange.usecase';
import { PairsExchangeApiKeyUseCase } from '../../usecases/exchange/fetch-exchange-pairs.usecase';
import { CreateDcaUseCase } from '../../usecases/dca/create-dca.usecase';
import { FetchDcaUseCase } from '../../usecases/dca/fetch-dca.usecase';
import { UpdateDcaUseCase } from '../../usecases/dca/update-dca.usecase';

@Module({
  imports: [HttpCustomModule, RepositoriesModule],
})
export class UsecasesProxyModule {
  static FETCH_EXCHANGES_USECASE_PROXY = 'fetchExchangesUsecaseProxy';
  static ADD_EXCHANGE_USECASE_PROXY = 'addExchangeUsecaseProxy';
  static DELETE_EXCHANGE_USECASE_PROXY = 'deleteExchangeUsecaseProxy';
  static UPDATE_EXCHANGE_USECASE_PROXY = 'updateExchangeUsecaseProxy';
  static VERIFY_EXCHANGE_USECASE_PROXY = 'verifyExchangeUsecaseProxy';
  static GET_MARKETS_EXCHANGE_USECASE_PROXY = 'getPairsExchangeUsecaseProxy';
  static FETCH_DCA_USECASE_PROXY = 'fetchDcaUsecaseProxy';
  static CREATE_DCA_USECASE_PROXY = 'createDcaUsecaseProxy';
  static UPDATE_DCA_USECASE_PROXY = 'updateDcaUsecaseProxy';
  static DELETE_DCA_USECASE_PROXY = 'deleteDcaUsecaseProxy';

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
          inject: [ExchangeDbRepository],
          provide: UsecasesProxyModule.DELETE_EXCHANGE_USECASE_PROXY,
          useFactory: (repository: ExchangeDbRepository) =>
            new UseCaseProxy(new DeleteExchangeUseCase(repository)),
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
        {
          inject: [ExchangeDbRepository, ExchangeApiRepository],
          provide: UsecasesProxyModule.GET_MARKETS_EXCHANGE_USECASE_PROXY,
          useFactory: (
            dbRepository: ExchangeDbRepository,
            apiRepository: ExchangeApiRepository,
          ) =>
            new UseCaseProxy(
              new PairsExchangeApiKeyUseCase(dbRepository, apiRepository),
            ),
        },
        {
          inject: [DcaRepository],
          provide: UsecasesProxyModule.FETCH_DCA_USECASE_PROXY,
          useFactory: (dcaRepository: DcaRepository) =>
            new UseCaseProxy(new FetchDcaUseCase(dcaRepository)),
        },
        {
          inject: [DcaRepository],
          provide: UsecasesProxyModule.CREATE_DCA_USECASE_PROXY,
          useFactory: (dcaRepository: DcaRepository) =>
            new UseCaseProxy(new CreateDcaUseCase(dcaRepository)),
        },
        {
          inject: [DcaRepository],
          provide: UsecasesProxyModule.UPDATE_DCA_USECASE_PROXY,
          useFactory: (dcaRepository: DcaRepository) =>
            new UseCaseProxy(new UpdateDcaUseCase(dcaRepository)),
        },
      ],
      exports: [
        UsecasesProxyModule.FETCH_EXCHANGES_USECASE_PROXY,
        UsecasesProxyModule.ADD_EXCHANGE_USECASE_PROXY,
        UsecasesProxyModule.UPDATE_EXCHANGE_USECASE_PROXY,
        UsecasesProxyModule.DELETE_EXCHANGE_USECASE_PROXY,
        UsecasesProxyModule.VERIFY_EXCHANGE_USECASE_PROXY,
        UsecasesProxyModule.GET_MARKETS_EXCHANGE_USECASE_PROXY,
        UsecasesProxyModule.FETCH_DCA_USECASE_PROXY,
        UsecasesProxyModule.CREATE_DCA_USECASE_PROXY,
        UsecasesProxyModule.UPDATE_DCA_USECASE_PROXY,
      ],
    };
  }
}
