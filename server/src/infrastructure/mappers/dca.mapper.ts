import { Types } from 'mongoose';
import { Dca } from '../../domain/models/dca';
import { Dca as DcaEntity } from '../entities/dca.entity';
import { ExchangeMapper } from './exchange.mapper';

class DcaMapper {
  static toDca(dcaEntity: DcaEntity): Dca {
    const dca = new Dca();
    dca.id = dcaEntity._id.toString();
    dca.isActive = dcaEntity.isActive;
    dca.exchange = ExchangeMapper.toExchange(dcaEntity.exchange);
    dca.pair = dcaEntity.pair;
    dca.frequencyInDays = dcaEntity.frequencyInDays;
    dca.hour = dcaEntity.hour;
    dca.amount = dcaEntity.amount;
    return dca;
  }

  static toDcaEntity(dca: Dca): DcaEntity {
    const dcaEntity = new DcaEntity();
    dcaEntity._id = new Types.ObjectId(dca.id);
    dcaEntity.isActive = dca.isActive;
    dcaEntity.exchange = ExchangeMapper.toExchangeEntity(dca.exchange);
    dcaEntity.pair = dca.pair;
    dcaEntity.frequencyInDays = dca.frequencyInDays;
    dcaEntity.hour = dca.hour;
    dcaEntity.amount = dca.amount;
    return dcaEntity;
  }
}

export { DcaMapper };
