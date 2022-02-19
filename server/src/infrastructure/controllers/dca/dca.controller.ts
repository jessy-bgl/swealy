import {
  Body,
  Controller,
  Post,
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

import { CreateDcaDTO, UpdateDcaDTO, UpdateDcaStatusDTO } from './dca.dto';
import { DcaPresenter } from '../../../usecases/dca/dca.presenter';

import { FetchDcaUseCase } from '../../../usecases/dca/fetch-dca.usecase';
import { CreateDcaUseCase } from '../../../usecases/dca/create-dca.usecase';
import { UpdateDcaUseCase } from '../../../usecases/dca/update-dca.usecase';
import { UpdateDcaStatusUseCase } from '../../../usecases/dca/update-dca-status.usecase';
import { DeleteDcaUseCase } from '../../../usecases/dca/delete-dca.usecase';

@Controller('dca')
@ApiTags('dca')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(CreateDcaDTO, UpdateDcaDTO, DcaPresenter)
class DcaController {
  constructor(
    private readonly fetchDcaUseCase: FetchDcaUseCase,
    private readonly createDcaUsecase: CreateDcaUseCase,
    private readonly updateDcaUsecase: UpdateDcaUseCase,
    private readonly updateDcaStatusUsecase: UpdateDcaStatusUseCase,
    private readonly deleteDcaUsecase: DeleteDcaUseCase,
  ) {}

  @Get()
  @ApiResponse({ status: 200, type: DcaPresenter, isArray: true })
  fetchDca(): Promise<DcaPresenter[]> {
    return this.fetchDcaUseCase.execute();
  }

  @Post()
  @ApiBody({ type: CreateDcaDTO })
  @ApiResponse({ status: 201, type: DcaPresenter })
  createDca(@Body() createDcaDTO: CreateDcaDTO): Promise<DcaPresenter> {
    return this.createDcaUsecase.execute(createDcaDTO);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateDcaDTO })
  @ApiResponse({ status: 200, type: DcaPresenter })
  updateDca(
    @Param('id') id: string,
    @Body() updateDcaDTO: UpdateDcaDTO,
  ): Promise<DcaPresenter> {
    return this.updateDcaUsecase.execute(id, updateDcaDTO);
  }

  @Put(':id/status')
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateDcaStatusDTO })
  @ApiResponse({ status: 200, type: DcaPresenter })
  updateDcaStatus(
    @Param('id') id: string,
    @Body() updateDcaStatusDTO: UpdateDcaStatusDTO,
  ): Promise<DcaPresenter> {
    return this.updateDcaStatusUsecase.execute(id, updateDcaStatusDTO);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: DcaPresenter })
  deleteDca(@Param('id') id: string): Promise<DcaPresenter> {
    return this.deleteDcaUsecase.execute(id);
  }
}

export { DcaController };
