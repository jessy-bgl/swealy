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

import { Dca } from '../../../domain/models/dca';
import { CreateDcaDTO, UpdateDcaDTO } from './dca.dto';
import { DcaPresenter } from './dca.presenter';

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
  async fetchDca(): Promise<Dca[]> {
    const dcas = await this.fetchDcaUseCase.getInstance().execute();
    return dcas.map((dca) => new DcaPresenter(dca));
  }

  @Post()
  async createDca(@Body() createDcaDTO: CreateDcaDTO): Promise<Dca> {
    const dca = await this.createDcaUsecase.getInstance().execute(createDcaDTO);
    return new DcaPresenter(dca);
  }

  @Put(':id')
  async updateDca(
    @Param('id') id: string,
    @Body() updateDcaDTO: UpdateDcaDTO,
  ): Promise<Dca> {
    const dca = await this.updateDcaUsecase
      .getInstance()
      .execute(id, updateDcaDTO);
    return new DcaPresenter(dca);
  }

  @Delete(':id')
  async deleteDca(@Param('id') id: string): Promise<Dca> {
    const dca = await this.deleteDcaUsecase.getInstance().execute(id);
    return new DcaPresenter(dca);
  }
}

export { DcaController };
