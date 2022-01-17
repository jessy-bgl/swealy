import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  ICreateDcaDTO,
  IDcaRepository,
  IUpdateDcaDTO,
} from '../../domain/repositories/dca.repository.interface';
import { Dca } from '../../domain/models/dca';
import { Dca as DcaEntity, DcaDocument } from '../entities/dca.entity';
import { DcaMapper } from '../mappers/dca.mapper';

@Injectable()
class DcaRepository implements IDcaRepository {
  constructor(
    @InjectModel(DcaEntity.name)
    private readonly dcaEntity: Model<DcaDocument>,
  ) {}

  async fetch(): Promise<Dca[]> {
    try {
      const dcas = await this.dcaEntity.find().populate('exchange').lean();
      return dcas.map((d) => DcaMapper.toDca(d));
    } catch (e) {
      throw e;
    }
  }

  async create(createDcaDTO: ICreateDcaDTO): Promise<Dca> {
    try {
      const dca = new this.dcaEntity(createDcaDTO);
      await (await dca.save()).populate('exchange');
      return DcaMapper.toDca(dca);
    } catch (e) {
      throw e;
    }
  }

  async update(id: string, updateDcaDTO: IUpdateDcaDTO): Promise<Dca> {
    try {
      const dca = await this.dcaEntity
        .findOneAndUpdate({ _id: id }, updateDcaDTO, { new: true })
        .populate('exchange');
      if (!dca) throw new NotFoundException();
      return DcaMapper.toDca(dca);
    } catch (e) {
      throw e;
    }
  }
  $;

  async delete(id: string): Promise<Dca> {
    try {
      const dca = await this.dcaEntity
        .findOneAndDelete({ _id: id })
        .populate('exchange');
      if (!dca) throw new NotFoundException();
      return DcaMapper.toDca(dca);
    } catch (e) {
      throw e;
    }
  }

  async deleteByExchangeId(exchangeId: string): Promise<Dca[]> {
    try {
      const dcas = await this.dcaEntity
        .find({ exchange: exchangeId })
        .populate('exchange')
        .lean();
      await this.dcaEntity.deleteMany({ exchange: exchangeId });
      return dcas.map((dca) => DcaMapper.toDca(dca));
    } catch (e) {
      throw e;
    }
  }

  async incSuccessfulTransactionsCounter(id: string): Promise<void> {
    try {
      await this.dcaEntity.updateOne(
        { _id: id },
        { $inc: { successfulTransactionsCounter: 1 } },
      );
    } catch (e) {
      throw e;
    }
  }
}

export { DcaRepository };
