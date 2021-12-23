import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IDcaRepository } from '../../domain/repositories/dca.repository.interface';
import { CreateDcaDTO } from '../controllers/dca/dca.create.dto';
import { Dca, DcaDocument } from '../entities/dca.entity';

@Injectable()
class DcaRepository implements IDcaRepository {
  constructor(
    @InjectModel(Dca.name)
    private readonly dcaModel: Model<DcaDocument>,
  ) {}

  async create(createDcaDTO: CreateDcaDTO): Promise<Dca> {
    try {
      const dca = new this.dcaModel(createDcaDTO);
      return dca.save();
    } catch (e) {
      throw e;
    }
  }
}

export { DcaRepository };
