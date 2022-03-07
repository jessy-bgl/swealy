import { useTranslation } from "react-i18next";
import SimpleBar from "simplebar-react";

import { Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircle";

import { Dca } from "../../models/Dca";
import { CreateDcaDialog } from "./CreateDcaDialog";
import { useFetchExchanges } from "../exchanges/hooks/useExchangeQueries";
import { DcaCard } from "./Dca";
import { useDcas } from "./hooks/useDcas";

interface DcasProps {
  data: Dca[];
  showAddDca: boolean;
  selectedDcaId: string;
  setSelectedDcaId: (dcaId: string) => void;
}

const Dcas = ({
  data,
  showAddDca,
  selectedDcaId,
  setSelectedDcaId,
}: DcasProps) => {
  const { t } = useTranslation("dca");

  const fetchExchangesQuery = useFetchExchanges();

  const {
    openAddDcaDialog,
    handleClickAddDca,
    handleSelectDca,
    handleCoseAddDcaDialog,
  } = useDcas({ data, showAddDca, selectedDcaId, setSelectedDcaId });

  return (
    <>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item sx={{ width: "100%" }}>
          <SimpleBar style={{ maxHeight: 559 }}>
            <Grid container direction="column" alignItems="center" spacing={2}>
              {data.map((dca) => (
                <Grid item key={dca.id} sx={{ width: "100%" }}>
                  <DcaCard
                    data={dca}
                    isSelected={dca.id === selectedDcaId}
                    onClickDca={handleSelectDca}
                  />
                </Grid>
              ))}
            </Grid>
          </SimpleBar>
        </Grid>

        {showAddDca && (
          <Grid item sx={{ width: "100%" }}>
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
export type { DcasProps };
