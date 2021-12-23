import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';
import { Dca } from '../../domain/entities/dca';
import { CreateDcaDTO } from '../controllers/dca/dca.create.dto';
import { UpdateDcaDTO } from '../controllers/dca/dca.update.dto';
import { Dca as DcaModel, DcaDocument } from '../entities/dca.entity';

@Injectable()
class DcaRepository implements IDcaRepository {
  constructor(
    @InjectModel(DcaModel.name)
    private readonly dcaModel: Model<DcaDocument>,
  ) {}

  async fetch(): Promise<Dca[]> {
    try {
      const dcas = await this.dcaModel.find().lean();
      return dcas;
    } catch (e) {
      throw e;
    }
  }

  async create(createDcaDTO: CreateDcaDTO): Promise<Dca> {
    try {
      const dca = new this.dcaModel(createDcaDTO);
      return dca.save();
    } catch (e) {
      throw e;
    }
  }

  async update(id: string, updateDcaDTO: UpdateDcaDTO): Promise<Dca> {
    try {
      const dca = await this.dcaModel.findOneAndUpdate(
        { _id: id },
        updateDcaDTO,
        { new: true },
      );
      if (!dca) throw new NotFoundException();
      return dca;
    } catch (e) {
      throw e;
    }
  }
  $;

  async delete(id: string): Promise<Dca> {
    try {
      const dca = await this.dcaModel.findOneAndDelete({ _id: id });
      if (!dca) throw new NotFoundException();
      return dca;
    } catch (e) {
      throw e;
    }
  }
}

export { DcaRepository };
