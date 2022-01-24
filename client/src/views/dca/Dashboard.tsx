import { Grid, Tabs, Tab } from "@mui/material";
import { useTranslation } from "react-i18next";

import { DcaStatusEnum } from "../../models/Dca";
import { GlobalStatistics } from "./statistics/global/GlobalStatistics";
import { DcaStatistics } from "./statistics/dca/DcaStatistics";
import { DcaInfo } from "./DcaInfo";
import { Dcas } from "./Dcas";
import { DcaTabs, useDashboard } from "./hooks/useDashboard";

type Props = {
  dcaStatus: DcaStatusEnum;
};

const Dashboard = ({ dcaStatus }: Props) => {
  const {
    dcas,
    isLoading,
    selectedDcaId,
    setSelectedDcaId,
    selectedTab,
    handleSelectTab,
  } = useDashboard(dcaStatus);

  const { t } = useTranslation("dca");

  const renderInfoStats = () => {
    if (!selectedDcaId) return <GlobalStatistics />;
    else if (selectedDcaId && selectedTab === DcaTabs.STATISTICS)
      return <DcaStatistics />;
    else if (selectedDcaId && selectedTab === DcaTabs.INFO)
      return <DcaInfo data={dcas.find((dca) => dca.id === selectedDcaId)} />;
  };

  if (isLoading) return <div />;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} xl={3}>
        <Dcas
          data={dcas}
          showAddDca={dcaStatus === DcaStatusEnum.ACTIVE}
          selectedDcaId={selectedDcaId}
          setSelectedDcaId={setSelectedDcaId}
        />
      </Grid>

      <Grid item xs={12} md={8} xl={9}>
        {selectedDcaId && (
          <Tabs
            value={selectedTab}
            onChange={handleSelectTab}
            variant="fullWidth"
          >
            <Tab label={t("statistics")} value={DcaTabs.STATISTICS} />
            <Tab label={t("info")} value={DcaTabs.INFO} />
          </Tabs>
        )}
        {renderInfoStats()}
      </Grid>
    </Grid>
  );
};

export { Dashboard };
