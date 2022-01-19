import { SyntheticEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Grid, Paper, Tabs, Tab } from "@mui/material";

import AddIcon from "@mui/icons-material/AddCircle";

import { Dca, DcaStatusEnum } from "../../models/Dca";
import { CreateDcaDialog } from "./CreateDcaDialog";
import { useFetchDcas } from "./hooks/useDcaQueries";
import { useFetchExchanges } from "../exchanges/hooks/useExchangeQueries";

import { DcaCard } from "./Dca";
import { Statistics } from "./Statistics";
import { DcaStatistics } from "./DcaStatistics";
import { DcaInfo } from "./DcaInfo";

type Props = {
  dcaStatus: DcaStatusEnum;
};

enum DcaTabs {
  STATISTICS = "statistics",
  INFO = "info",
}

const Dcas = ({ dcaStatus }: Props) => {
  const [dcas, setDcas] = useState([] as Dca[]);
  const [selectedDcaId, setSelectedDcaId] = useState("");
  const [selectedTab, setSelectedTab] = useState(DcaTabs.STATISTICS);
  const [openAddDcaDialog, setOpenAddDcaDialog] = useState(false);

  const { t } = useTranslation("dca");
  const fetchExchangesQuery = useFetchExchanges();
  const { data, isLoading } = useFetchDcas();

  // TODO : bug here - this is not alaways called after data update
  useEffect(() => {
    if (data) setDcas(data.filter((dca) => dca.status === dcaStatus));
    setSelectedDcaId("");
  }, [data, dcaStatus]);

  const handleSelectDca = (dcaId: string) => {
    if (selectedDcaId === dcaId)
      setSelectedDcaId(selectedDcaId !== "" ? "" : selectedDcaId);
    else setSelectedDcaId(dcaId);
  };

  const handleSelectTab = (event: SyntheticEvent, newTab: DcaTabs) => {
    setSelectedTab(newTab);
  };

  const handleClickAddDca = () => setOpenAddDcaDialog(true);
  const handleCoseAddDcaDialog = () => setOpenAddDcaDialog(false);

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
