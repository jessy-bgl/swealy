import api from "./http-api";
import { GlobalStats } from "../../models/Statistics";

const StatsService = {
  fetchGlobalStats: (): Promise<GlobalStats> => api.get("/statistics/global"),
};

export { StatsService };
