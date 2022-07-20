import { useState } from "react";

const useBot = () => {
  const [openBotDialog, setOpenBotDialog] = useState(false);
  const handleOpenBotDialog = () => setOpenBotDialog(true);
  const handleCloseBotDialog = () => setOpenBotDialog(false);

  return {
    openBotDialog,
    handleOpenBotDialog,
    handleCloseBotDialog,
  };
};

export { useBot };
