import { useState } from "react";

import { DcasProps } from "../Dcas";

const useDcas = ({ selectedDcaId, setSelectedDcaId }: DcasProps) => {
  const [openAddDcaDialog, setOpenAddDcaDialog] = useState(false);

  const handleSelectDca = (dcaId: string) => {
    if (selectedDcaId === dcaId)
      setSelectedDcaId(selectedDcaId !== "" ? "" : selectedDcaId);
    else setSelectedDcaId(dcaId);
  };

  const handleClickAddDca = () => setOpenAddDcaDialog(true);
  const handleCoseAddDcaDialog = () => setOpenAddDcaDialog(false);

  return {
    openAddDcaDialog,
    handleClickAddDca,
    handleSelectDca,
    handleCoseAddDcaDialog,
  };
};

export { useDcas };
