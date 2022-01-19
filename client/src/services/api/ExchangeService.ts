import api from "./http-api";
import {
  CreateExchangeDTO,
  Exchange,
  Pair,
  UpdateExchangeDTO,
} from "../../models/Exchange";

const ExchangeService = {
  fetchExchanges: (): Promise<Exchange[]> => api.get("/exchange"),
  createExchange: (dto: CreateExchangeDTO): Promise<Exchange> =>
    api.post("/exchange", dto),
  updateExchange: (dto: UpdateExchangeDTO): Promise<Exchange> =>
    api.put(`/exchange/${dto.id}`, dto),
  deleteExchange: (id: string): Promise<Exchange> =>
    api.delete(`/exchange/${id}`),
  checkApiKeys: (id: string): Promise<void> => api.get(`/exchange/${id}/check`),
  fetchAvailableSpotPairs: (id: string): Promise<Pair[]> =>
    api.get(`/exchange/${id}/pairs`),
};

export { ExchangeService };
