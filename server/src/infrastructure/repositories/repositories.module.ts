import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ExchangeApiRepository } from './exchange-api.repository';
import { ExchangeDbRepository } from './exchange-db.repository';
import {
  Exchange,
  ExchangeSchema,
} from '../../domain/entities/exchange.entity';
import { HttpCustomModule } from '../config/axios/http.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Exchange.name, schema: ExchangeSchema },
    ]),
    HttpCustomModule,
  ],
  providers: [ExchangeDbRepository, ExchangeApiRepository],
  exports: [ExchangeDbRepository, ExchangeApiRepository],
})
export class RepositoriesModule {}
