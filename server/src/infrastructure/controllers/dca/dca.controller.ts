import {
  Body,
  Controller,
  Post,
  Inject,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { UseCaseProxy } from '../../../infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../../infrastructure/usecases-proxy/usecases-proxy.module';

import { CreateDcaUseCase } from '../../../usecases/dca/create-dca.usecase';
import { FetchDcaUseCase } from '../../../usecases/dca/fetch-dca.usecase';

import { CreateDcaDTO } from './dca.create.dto';

@Controller('dca')
class DcaController {
  constructor(
    @Inject(UsecasesProxyModule.FETCH_DCA_USECASE_PROXY)
    private readonly fetchDcaUseCase: UseCaseProxy<FetchDcaUseCase>,
    @Inject(UsecasesProxyModule.CREATE_DCA_USECASE_PROXY)
    private readonly createDcaUsecase: UseCaseProxy<CreateDcaUseCase>,
  ) {}

  @Get()
  fetchDca() {
    return this.fetchDcaUseCase.getInstance().execute();
  }

  @Post()
  createDca(@Body() createDcaDTO: CreateDcaDTO) {
    return this.createDcaUsecase.getInstance().execute(createDcaDTO);
  }
}

export { DcaController };
