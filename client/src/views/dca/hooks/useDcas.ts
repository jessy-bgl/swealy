import { SyntheticEvent, useEffect, useState } from "react";

import { Dca, DcaStatusEnum } from "../../../models/Dca";
import { useFetchDcas } from "../hooks/useDcaQueries";

enum DcaTabs {
  STATISTICS = "statistics",
  INFO = "info",
}

const useDcas = (dcaStatus: DcaStatusEnum) => {
  const [dcas, setDcas] = useState([] as Dca[]);
  const [selectedDcaId, setSelectedDcaId] = useState("");
  const [selectedTab, setSelectedTab] = useState(DcaTabs.STATISTICS);
  const [openAddDcaDialog, setOpenAddDcaDialog] = useState(false);

  const { data, isLoading } = useFetchDcas();

  // TODO : bug here - this is not always called after data update
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

  return {
    dcas,
    DcaTabs,
    selectedDcaId,
    selectedTab,
    openAddDcaDialog,
    handleClickAddDca,
    handleSelectDca,
    handleSelectTab,
    handleCoseAddDcaDialog,
    isLoading,
  };
};

export { useDcas, DcaTabs };
