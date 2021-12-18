import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExchangeDTO } from '../../infrastructure/controllers/exchange/exchange.create.dto';
import { UpdateExchangeDTO } from '../../infrastructure/controllers/exchange/exchange.update.dto';
import { IExchangeDbRepository } from '../../domain/repositories/exchange-db.repository.interface';
import {
  Exchange,
  ExchangeDocument,
} from '../../domain/entities/exchange.entity';

@Injectable()
class ExchangeDbRepository implements IExchangeDbRepository {
  constructor(
    @InjectModel(Exchange.name)
    private readonly exchangeModel: Model<ExchangeDocument>,
  ) {}

  async fetch(): Promise<Exchange[]> {
    try {
      const exchanges = await this.exchangeModel.find().lean();
      return exchanges;
    } catch (e) {
      throw e;
    }
  }

  async fetchOne(id: string): Promise<Exchange> {
    try {
      const exchange = await this.exchangeModel.findById(id).lean();
      return exchange;
    } catch (e) {
      throw e;
    }
  }

  create(createExchangeDTO: CreateExchangeDTO): Promise<Exchange> {
    try {
      const exchange = new this.exchangeModel(createExchangeDTO);
      return exchange.save();
    } catch (e) {
      throw e;
    }
  }

  update(updateExchangeDTO: UpdateExchangeDTO): Promise<Exchange> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<Exchange> {
    throw new Error('Method not implemented.');
  }
}

export { ExchangeDbRepository };
