import { Dca } from '../models/dca';
import { UpdateDcaDTO } from '../../infrastructure/controllers/dca/dca.update.dto';
import { CreateDcaDTO } from '../../infrastructure/controllers/dca/dca.create.dto';

interface IDcaRepository {
  fetch(): Promise<Dca[]>;
  create(createDcaDTO: CreateDcaDTO): Promise<Dca>;
  update(id: string, updateDcaDTO: UpdateDcaDTO): Promise<Dca>;
  delete(id: string): Promise<Dca>;
}

export { IDcaRepository };
