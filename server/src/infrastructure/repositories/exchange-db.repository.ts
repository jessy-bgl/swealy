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

  create(createExchangeDTO: CreateExchangeDTO): Promise<Exchange> {
    throw new Error('Method not implemented.');
  }

  update(updateExchangeDTO: UpdateExchangeDTO): Promise<Exchange> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<Exchange> {
    throw new Error('Method not implemented.');
  }
}

export { ExchangeDbRepository };
