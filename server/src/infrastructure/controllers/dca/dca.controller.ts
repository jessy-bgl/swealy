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
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { UseCaseProxy } from '../../../infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../../infrastructure/usecases-proxy/usecases-proxy.module';

import { FetchDcaUseCase } from '../../../usecases/dca/fetch-dca.usecase';
import { CreateDcaUseCase } from '../../../usecases/dca/create-dca.usecase';
import { UpdateDcaUseCase } from '../../../usecases/dca/update-dca.usecase';
import { DeleteDcaUseCase } from '../../../usecases/dca/delete-dca.usecase';

import { CreateDcaDTO, UpdateDcaDTO } from './dca.dto';

@Controller('dca')
@ApiTags('dca')
@ApiExtraModels(CreateDcaDTO, UpdateDcaDTO)
class DcaController {
  constructor(
    @Inject(UsecasesProxyModule.FETCH_DCA_USECASE_PROXY)
    private readonly fetchDcaUseCase: UseCaseProxy<FetchDcaUseCase>,
    @Inject(UsecasesProxyModule.CREATE_DCA_USECASE_PROXY)
    private readonly createDcaUsecase: UseCaseProxy<CreateDcaUseCase>,
    @Inject(UsecasesProxyModule.UPDATE_DCA_USECASE_PROXY)
    private readonly updateDcaUsecase: UseCaseProxy<UpdateDcaUseCase>,
    @Inject(UsecasesProxyModule.DELETE_DCA_USECASE_PROXY)
    private readonly deleteDcaUsecase: UseCaseProxy<DeleteDcaUseCase>,
  ) {}

  @Get()
  fetchDca() {
    return this.fetchDcaUseCase.getInstance().execute();
  }

  @Post()
  createDca(@Body() createDcaDTO: CreateDcaDTO) {
    return this.createDcaUsecase.getInstance().execute(createDcaDTO);
  }

  @Put(':id')
  updateDca(@Param('id') id: string, @Body() updateDcaDTO: UpdateDcaDTO) {
    return this.updateDcaUsecase.getInstance().execute(id, updateDcaDTO);
  }

  @Delete(':id')
  deleteDca(@Param('id') id: string) {
    return this.deleteDcaUsecase.getInstance().execute(id);
  }
}

export { DcaController };
