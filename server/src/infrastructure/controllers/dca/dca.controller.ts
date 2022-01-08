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
import {
  ApiExtraModels,
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

import { UseCaseProxy } from '../../../infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../../infrastructure/usecases-proxy/usecases-proxy.module';

import { FetchDcaUseCase } from '../../../usecases/dca/fetch-dca.usecase';
import { CreateDcaUseCase } from '../../../usecases/dca/create-dca.usecase';
import { UpdateDcaUseCase } from '../../../usecases/dca/update-dca.usecase';
import { DeleteDcaUseCase } from '../../../usecases/dca/delete-dca.usecase';
import { DcaPresenter } from '../../../usecases/dca/dca.presenter';
import { CreateDcaDTO, UpdateDcaDTO } from './dca.dto';

@Controller('dca')
@ApiTags('dca')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(CreateDcaDTO, UpdateDcaDTO, DcaPresenter)
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
  @ApiResponse({ status: 200, type: DcaPresenter, isArray: true })
  fetchDca(): Promise<DcaPresenter[]> {
    return this.fetchDcaUseCase.getInstance().execute();
  }

  @Post()
  @ApiBody({ type: CreateDcaDTO })
  @ApiResponse({ status: 201, type: DcaPresenter })
  createDca(@Body() createDcaDTO: CreateDcaDTO): Promise<DcaPresenter> {
    return this.createDcaUsecase.getInstance().execute(createDcaDTO);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateDcaDTO })
  @ApiResponse({ status: 200, type: DcaPresenter })
  updateDca(
    @Param('id') id: string,
    @Body() updateDcaDTO: UpdateDcaDTO,
  ): Promise<DcaPresenter> {
    return this.updateDcaUsecase.getInstance().execute(id, updateDcaDTO);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: DcaPresenter })
  deleteDca(@Param('id') id: string): Promise<DcaPresenter> {
    return this.deleteDcaUsecase.getInstance().execute(id);
  }
}

export { DcaController };
