import { useQuery } from "react-query";

import { GlobalStats } from "../../../models/Statistics";
import { StatsService } from "../../../services/api/StatisticsService";

const GLOBAL_STATS_QUERY_KEY = "global_stats";

const useFetchGlobalStats = () => {
  return useQuery<GlobalStats, Error>(GLOBAL_STATS_QUERY_KEY, () =>
    StatsService.fetchGlobalStats()
  );
};

export { useFetchGlobalStats };
