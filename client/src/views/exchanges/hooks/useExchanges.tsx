import { useState } from "react";

import { Exchange } from "../../../models/Exchange";
import {
  useFetchExchanges,
  useCheckApiKeysValidity,
} from "./useExchangeQueries";

const useExchanges = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const [updateDialog, setUpdateDialog] = useState({
    data: {} as Exchange,
    open: false,
  });

  const [deleteDialog, setDeleteDialog] = useState({
    data: {} as Exchange,
    open: false,
  });

  const { data, isLoading } = useFetchExchanges();
  const checkApiKeysValidityQuery = useCheckApiKeysValidity();

  const handleClickApiKeysCheck = (exchangeID: string) =>
    checkApiKeysValidityQuery.mutate(exchangeID);

  const handleOpenUpdateDialog = (exchange: Exchange) =>
    setUpdateDialog({ data: exchange, open: true });
  const handleCloseUpdateDialog = () =>
    setUpdateDialog({ data: {} as Exchange, open: false });

  const handleOpenDeleteDialog = (exchange: Exchange) =>
    setDeleteDialog({ data: exchange, open: true });
  const handleCloseDeleteDialog = () =>
    setDeleteDialog({ data: {} as Exchange, open: false });

  const handleOpenCreateDialog: () => void = () => setOpenCreateDialog(true);
  const handleCloseCreateDialog: () => void = () => setOpenCreateDialog(false);

  return {
    openCreateDialog,
    updateDialog,
    deleteDialog,
    data,
    isLoading,
    handleOpenUpdateDialog,
    handleClickApiKeysCheck,
    handleCloseUpdateDialog,
    handleCloseCreateDialog,
    handleOpenCreateDialog,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
  };
};

export { useExchanges };
