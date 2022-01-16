import api from "./http-api";
import {
  CreateExchangeDTO,
  Exchange,
  UpdateExchangeDTO,
} from "../../models/Exchange";

const ExchangeService = {
  fetchExchanges: (): Promise<Exchange[]> => api.get("/exchange"),
  createExchange: (dto: CreateExchangeDTO): Promise<Exchange> =>
    api.post("/exchange", dto),
  updateExchange: (dto: UpdateExchangeDTO): Promise<Exchange> =>
    api.put(`/exchange/${dto.id}`, dto),
  checkApiKeys: (id: string): Promise<void> => api.get(`/exchange/${id}/check`),
  deleteExchange: (id: string): Promise<Exchange> =>
    api.delete(`/exchange/${id}`),
};

export { ExchangeService };
