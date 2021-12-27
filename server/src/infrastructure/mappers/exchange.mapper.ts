import { Types } from 'mongoose';
import { Exchange } from '../../domain/models/exchange';
import { Exchange as ExchangeEntity } from '../entities/exchange.entity';

class ExchangeMapper {
  static toExchange(exchangeEntity: ExchangeEntity): Exchange {
    if (!exchangeEntity) return undefined;
    const exchange = new Exchange();
    exchange.id = exchangeEntity._id.toString();
    exchange.name = exchangeEntity.name;
    exchange.label = exchangeEntity.label;
    exchange.apiKey = exchangeEntity.apiKey;
    exchange.apiSecret = exchangeEntity.apiSecret;
    exchange.subaccountName = exchangeEntity.subaccountName;
    return exchange;
  }

  static toExchangeEntity(exchange: Exchange): ExchangeEntity {
    const exchangeEntity = new ExchangeEntity();
    exchangeEntity._id = new Types.ObjectId(exchange.id);
    exchangeEntity.name = exchange.name;
    exchangeEntity.label = exchange.label;
    exchangeEntity.apiKey = exchange.apiKey;
    exchangeEntity.apiSecret = exchange.apiSecret;
    exchangeEntity.subaccountName = exchange.subaccountName;
    return exchangeEntity;
  }
}

export { ExchangeMapper };
