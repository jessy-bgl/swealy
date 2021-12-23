import { CreateDcaDTO } from '../../infrastructure/controllers/dca/dca.create.dto';
import { Dca } from '../entities/dca';

interface IDcaRepository {
  create(createDcaDTO: CreateDcaDTO): Promise<Dca>;
}

export { IDcaRepository };
