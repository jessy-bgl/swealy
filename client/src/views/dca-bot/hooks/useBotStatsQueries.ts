import { useQuery } from "react-query";

import { BotTransactionsSummary } from "../../../models/Statistics";
import { StatsService } from "../../../services/api/StatisticsService";

const TRANSACTIONS_SUMMARY_KEY = "transactions_summary";

const useFetchTransactionsSummary = (dcaId: string) => {
  return useQuery<BotTransactionsSummary, Error>(
    TRANSACTIONS_SUMMARY_KEY,
    () => StatsService.fetchBotTransactionsSummary(dcaId),
    { retry: false }
  );
};

export { useFetchTransactionsSummary };
