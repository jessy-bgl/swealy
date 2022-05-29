import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useBots = () => {
  const navigate = useNavigate();
  const handleClickDca = (dcaId: string) => navigate(`/dca/${dcaId}`);

  const [openAddDcaDialog, setOpenAddDcaDialog] = useState(false);
  const handleClickAddDca = () => setOpenAddDcaDialog(true);
  const handleCloseAddDcaDialog = () => setOpenAddDcaDialog(false);

  return {
    openAddDcaDialog,
    handleClickAddDca,
    handleCloseAddDcaDialog,
    handleClickDca,
  };
};

export { useBots };
