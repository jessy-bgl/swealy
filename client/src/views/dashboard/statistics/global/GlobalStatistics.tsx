import { Grid } from "@mui/material";

import { useFetchGlobalStats } from "../hooks/useStatsQueries";
import { AssetsAllocationStats } from "./AssetsAllocationStats";
import { DcaGlobalStatsCard } from "./DcaStatsCard";
import { TransactionGlobalStatsCard } from "./TransactionStatsCard";

const GlobalStatistics = () => {
  const globalStatsQuery = useFetchGlobalStats();

  if (globalStatsQuery.isLoading) return <div />;

  if (!globalStatsQuery.data) return <div />;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} xl={3}>
        <DcaGlobalStatsCard
          data={globalStatsQuery.data.dca}
          activeDcas={true}
        />
      </Grid>

      <Grid item xs={12} sm={6} xl={3}>
        <DcaGlobalStatsCard
          data={globalStatsQuery.data.dca}
          activeDcas={false}
        />
      </Grid>

      <Grid item xs={12} sm={6} xl={3}>
        <TransactionGlobalStatsCard
          data={globalStatsQuery.data.transaction}
          success={true}
        />
      </Grid>

      <Grid item xs={12} sm={6} xl={3}>
        <TransactionGlobalStatsCard
          data={globalStatsQuery.data.transaction}
          success={false}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <AssetsAllocationStats data={globalStatsQuery.data.currencies} />
      </Grid>
    </Grid>
  );
};

export { GlobalStatistics };
