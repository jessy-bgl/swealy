import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Exchange, ExchangeSchema } from '../entities/exchange.entity';
import { HttpCustomModule } from '../config/axios/http.module';
import { Dca, DcaSchema } from '../entities/dca.entity';

import { ExchangeApiRepository } from './exchange-api.repository';
import { ExchangeDbRepository } from './exchange-db.repository';
import { DcaRepository } from './dca.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Exchange.name, schema: ExchangeSchema },
    ]),
    MongooseModule.forFeature([{ name: Dca.name, schema: DcaSchema }]),
    HttpCustomModule,
  ],
  providers: [ExchangeDbRepository, ExchangeApiRepository, DcaRepository],
  exports: [ExchangeDbRepository, ExchangeApiRepository, DcaRepository],
})
export class RepositoriesModule {}
