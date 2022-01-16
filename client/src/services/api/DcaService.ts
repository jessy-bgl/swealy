import api from "./http-api";
import { Dca, CreateDcaDTO, UpdateDcaDTO } from "../../models/Dca";

const DcaService = {
  fetchDcas: (): Promise<Dca[]> => api.get("/dca"),
  createDca: (dto: CreateDcaDTO): Promise<Dca> => api.post("/dca", dto),
  updateDca: (dto: UpdateDcaDTO): Promise<Dca> =>
    api.put(`/dca/${dto.id}`, dto),
  deleteDca: (id: string): Promise<Dca> => api.delete(`/dca/${id}`),
};

export { DcaService };
