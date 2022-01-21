import { useTranslation } from "react-i18next";
import { Button, Grid, Paper, Tabs, Tab } from "@mui/material";

import AddIcon from "@mui/icons-material/AddCircle";

import { DcaStatusEnum } from "../../models/Dca";
import { CreateDcaDialog } from "./CreateDcaDialog";
import { useFetchExchanges } from "../exchanges/hooks/useExchangeQueries";
import { DcaCard } from "./Dca";
import { Statistics } from "./Statistics";
import { DcaStatistics } from "./DcaStatistics";
import { DcaInfo } from "./DcaInfo";
import { useDcas } from "./hooks/useDcas";

type Props = {
  dcaStatus: DcaStatusEnum;
};

const Dcas = ({ dcaStatus }: Props) => {
  const { t } = useTranslation("dca");

  const fetchExchangesQuery = useFetchExchanges();

  const {
    dcas,
    isLoading,
    DcaTabs,
    selectedDcaId,
    selectedTab,
    openAddDcaDialog,
    handleClickAddDca,
    handleSelectDca,
    handleSelectTab,
    handleCoseAddDcaDialog,
  } = useDcas(dcaStatus);

  const renderInfoStats = () => {
    if (!selectedDcaId) return <Statistics dcaCounter={dcas.length} />;
    else if (selectedDcaId && selectedTab === DcaTabs.STATISTICS)
      return <DcaStatistics />;
    else if (selectedDcaId && selectedTab === DcaTabs.INFO)
      return <DcaInfo data={dcas.find((dca) => dca.id === selectedDcaId)} />;
  };

  if (isLoading) return <div />;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} xl={3}>
          <Grid container direction="column" alignItems="center" spacing={2}>
            {dcas.map((dca) => (
              <Grid item key={dca.id} sx={{ width: "100%" }}>
                <DcaCard
                  data={dca}
                  isSelected={dca.id === selectedDcaId}
                  onClickDca={handleSelectDca}
                />
              </Grid>
            ))}
            {dcaStatus === DcaStatusEnum.ACTIVE && (
              <Grid item>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleClickAddDca}
                >
                  {t("createDca")}
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid item xs={12} md={8} xl={9}>
          <Paper>
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
          </Paper>
        </Grid>
      </Grid>

      {openAddDcaDialog && (
        <CreateDcaDialog
          onClose={handleCoseAddDcaDialog}
          exchanges={fetchExchangesQuery.data || []}
        />
      )}
    </>
  );
};

export { Dcas };
