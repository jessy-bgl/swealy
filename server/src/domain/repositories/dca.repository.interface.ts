import { CreateDcaDTO } from '../../infrastructure/controllers/dca/dca.create.dto';
import { Dca } from '../entities/dca';

interface IDcaRepository {
  fetch(): Promise<Dca[]>;
  create(createDcaDTO: CreateDcaDTO): Promise<Dca>;
}

export { IDcaRepository };
