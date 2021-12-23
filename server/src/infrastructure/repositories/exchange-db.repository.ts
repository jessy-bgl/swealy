import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateExchangeDTO } from '../../infrastructure/controllers/exchange/exchange.create.dto';
import { UpdateExchangeDTO } from '../../infrastructure/controllers/exchange/exchange.update.dto';
import { IExchangeDbRepository } from '../../domain/repositories/exchange-db.repository';
import {
  Exchange as ExchangeModel,
  ExchangeDocument,
} from '../entities/exchange.entity';
import { Exchange } from '../../domain/entities/exchange';

@Injectable()
class ExchangeDbRepository implements IExchangeDbRepository {
  constructor(
    @InjectModel(ExchangeModel.name)
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

  async update(
    id: string,
    updateExchangeDTO: UpdateExchangeDTO,
  ): Promise<Exchange> {
    try {
      const exchange = await this.exchangeModel.findOneAndUpdate(
        { _id: id },
        updateExchangeDTO,
        { new: true },
      );
      if (!exchange) throw new NotFoundException();
      return exchange;
    } catch (e) {
      throw e;
    }
  }

  async delete(id: string): Promise<Exchange> {
    try {
      const exchange = await this.exchangeModel.findOneAndDelete({ _id: id });
      if (!exchange) throw new NotFoundException();
      return exchange;
    } catch (e) {
      throw e;
    }
  }
}

export { ExchangeDbRepository };
