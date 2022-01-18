import api from "./http-api";
import {
  Dca,
  CreateDcaDTO,
  UpdateDcaDTO,
  UpdateDcaStatusDTO,
} from "../../models/Dca";

const DcaService = {
  fetchDcas: (): Promise<Dca[]> => api.get("/dca"),
  createDca: (dto: CreateDcaDTO): Promise<Dca> => api.post("/dca", dto),
  updateDca: (dto: UpdateDcaDTO): Promise<Dca> =>
    api.put(`/dca/${dto.id}`, dto),
  updateDcaStatus: (dto: UpdateDcaStatusDTO): Promise<Dca> =>
    api.put(`/dca/${dto.id}/status`, dto),
  deleteDca: (id: string): Promise<Dca> => api.delete(`/dca/${id}`),
};

export { DcaService };
