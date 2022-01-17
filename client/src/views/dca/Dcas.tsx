import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Grid } from "@mui/material";

import AddIcon from "@mui/icons-material/AddCircle";

import { DcaStatusEnum } from "../../models/Dca";
import { DcaCard } from "./Dca";
import { CreateDcaDialog } from "./CreateDcaDialog";
import { useFetchDcas } from "./hooks/useDcaQueries";
import { useFetchExchanges } from "../exchanges/hooks/useExchangeQueries";

type Props = {
  dcaStatus: DcaStatusEnum;
};

const Dcas = ({ dcaStatus }: Props) => {
  const [selectedDcaId, setSelectedDcaId] = useState("");

  const [openAddDcaDialog, setOpenAddDcaDialog] = useState(false);

  const fetchExchangesQuery = useFetchExchanges();

  const { t } = useTranslation("dca");

  const { data, isLoading } = useFetchDcas();

  const handleSelectDca = (dcaId: string) => {
    if (selectedDcaId === dcaId)
      setSelectedDcaId(selectedDcaId !== "" ? "" : selectedDcaId);
    else setSelectedDcaId(dcaId);
  };

  const handleClickAddDca = () => setOpenAddDcaDialog(true);
  const handleCoseAddDcaDialog = () => setOpenAddDcaDialog(false);

  if (isLoading) return <div />;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} xl={3}>
          <Grid container direction="column" alignItems="center" spacing={2}>
            {data
              ?.filter((dca) => dca.status === dcaStatus)
              .map((dca) => (
                <Grid item key={dca.id}>
                  <DcaCard
                    data={dca}
                    isSelected={dca.id === selectedDcaId}
                    onClickDca={handleSelectDca}
                  />
                </Grid>
              ))}
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
          </Grid>
        </Grid>
        <Grid item xs={12} md={8} xl={9}>
          {/* TODO : statistics */}
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
