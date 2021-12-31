import { Dca } from '../models/dca';
import {
  CreateDcaDTO,
  UpdateDcaDTO,
} from '../../infrastructure/controllers/dca/dca.dto';

// TODO : replace the DTOs as it breaks the clean archi
interface IDcaRepository {
  fetch(): Promise<Dca[]>;
  create(createDcaDTO: CreateDcaDTO): Promise<Dca>;
  update(id: string, updateDcaDTO: UpdateDcaDTO): Promise<Dca>;
  delete(id: string): Promise<Dca>;
}

export { IDcaRepository };
