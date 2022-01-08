import { Types } from 'mongoose';

import { Dca as DcaEntity } from '../entities/dca.entity';
import { Exchange as ExchangeEntity } from '../entities/exchange.entity';
import { Dca } from '../../domain/models/dca';
import { ExchangeMapper } from './exchange.mapper';

class DcaMapper {
  static toDca(dcaEntity: DcaEntity): Dca {
    if (!dcaEntity) return undefined;
    const dca = new Dca();
    const exchangeEntity = dcaEntity.exchange as ExchangeEntity;
    dca.id = dcaEntity._id.toString();
    dca.isActive = dcaEntity.isActive;
    dca.pair = dcaEntity.pair;
    dca.frequencyInDays = dcaEntity.frequencyInDays;
    dca.hour = dcaEntity.hour;
    dca.amount = dcaEntity.amount;
    dca.exchange = ExchangeMapper.toExchange(exchangeEntity);
    dca.successfulTransactionsCounter = dcaEntity.successfulTransactionsCounter;
    return dca;
  }

  static toDcaEntity(dca: Dca): DcaEntity {
    const dcaEntity = new DcaEntity();
    dcaEntity._id = new Types.ObjectId(dca.id);
    dcaEntity.isActive = dca.isActive;
    dcaEntity.pair = dca.pair;
    dcaEntity.frequencyInDays = dca.frequencyInDays;
    dcaEntity.hour = dca.hour;
    dcaEntity.amount = dca.amount;
    dcaEntity.exchange = ExchangeMapper.toExchangeEntity(dca.exchange);
    dcaEntity.successfulTransactionsCounter = dca.successfulTransactionsCounter;
    return dcaEntity;
  }
}

export { DcaMapper };
