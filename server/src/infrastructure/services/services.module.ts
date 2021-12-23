import { Module } from '@nestjs/common';

import { DcaService } from './dca.service';
import { RepositoriesModule } from '../repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  providers: [DcaService],
})
export class ServicesModule {}
