import api from "./http-api";

import { BotTransactionsSummary, GlobalStats } from "../../models/Statistics";

const StatsService = {
  fetchGlobalStats: (): Promise<GlobalStats> => api.get("/statistics/global"),

  fetchBotTransactionsSummary: (
    dcaId: string
  ): Promise<BotTransactionsSummary> =>
    api.get(`/statistics/dca/transactions/summary?dcaId=${dcaId}`),
};

export { StatsService };
