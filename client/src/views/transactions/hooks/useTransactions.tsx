import { useContext, useState } from "react";
import {
  GridActionsCellItem,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import * as locale from "date-fns/locale";

import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";

import { Transaction } from "../../../models/Transaction";
import { LanguageContext } from "../../../services/stores/language/LanguageContext";

const useTransactions = () => {
  const [openAddTransactionDialog, setOpenAddTransactionDialog] =
    useState(false);

  const [transactionInfoDialog, setTransactionInfoDialog] = useState({
    data: "",
    open: false,
  });

  const [deleteTransactionDialog, setDeleteTransactionDialog] = useState({
    data: {} as Transaction,
    open: false,
  });

  const toggleAddTransactionDialog = () =>
    setOpenAddTransactionDialog(!openAddTransactionDialog);

  const openDeleteTransactionDialog = (data: Transaction) =>
    setDeleteTransactionDialog({ data, open: true });

  const closeDeleteTransactionDialog = () =>
    setDeleteTransactionDialog({ data: {} as Transaction, open: false });

  const openTransactionInfoDialog = (data: string) =>
    setTransactionInfoDialog({ data, open: true });

  const closeTransactionInfoDialog = () =>
    setTransactionInfoDialog({ data: "", open: false });

  const { t } = useTranslation("transaction");
  const { language } = useContext(LanguageContext);

  const columns: GridColDef[] = [
    {
      field: "datetime",
      headerName: t("date"),
      type: "date",
      width: 175,
      valueFormatter: (params) => {
        const formattedDate = format(new Date(params.value as string), "PPp", {
          locale: language === "fr" ? locale.fr : locale.enGB,
        });
        return formattedDate;
      },
    },
    {
      field: "success",
      headerName: t("success"),
      type: "boolean",
    },
    {
      field: "manual",
      headerName: t("type"),
      type: "string",
      valueFormatter: (params) => (params.value ? t("manual") : t("automatic")),
      width: 125,
    },
    {
      field: "pair",
      headerName: t("pair"),
      type: "string",
      valueGetter: (params: GridValueGetterParams<Transaction>) =>
        params.row.dca.pair,
      width: 115,
    },
    {
      field: "exchange",
      headerName: t("exchange"),
      type: "string",
      valueGetter: (params: GridValueGetterParams<Transaction>) =>
        params.row.dca.exchange.label,
      width: 125,
    },
    { field: "price", headerName: t("price"), type: "number" },
    { field: "size", headerName: t("size"), type: "number" },
    {
      field: "type",
      headerName: t("orderType"),
      type: "string",
      width: 125,
      align: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: t("actions"),
      renderCell: ({ row }) => {
        if (row.manual)
          return (
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              color="error"
              onClick={() => openDeleteTransactionDialog(row)}
            />
          );
        if (!row.success)
          return (
            <GridActionsCellItem
              icon={<InfoIcon />}
              label="Info"
              color="info"
              onClick={() => openTransactionInfoDialog(row.description)}
            />
          );
      },
    },
  ];

  return {
    openAddTransactionDialog,
    deleteTransactionDialog,
    transactionInfoDialog,
    toggleAddTransactionDialog,
    openDeleteTransactionDialog,
    closeDeleteTransactionDialog,
    closeTransactionInfoDialog,
    columns,
  };
};

export { useTransactions };
