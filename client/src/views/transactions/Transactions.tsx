import { useContext } from "react";
import { Button, Grid, Paper } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import * as locale from "date-fns/locale";

import AddIcon from "@mui/icons-material/Add";

import { Transaction } from "../../models/Transaction";
import { useFetchTransactions } from "./hooks/useTransactionQueries";
import { useTransactionStyles } from "./hooks/useTransactionStyles";
import { LanguageContext } from "../../services/stores/language/LanguageContext";

const Transactions = () => {
  const classes = useTransactionStyles();

  const { data, isLoading } = useFetchTransactions();

  const { language } = useContext(LanguageContext);

  const { t } = useTranslation("transaction");

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
  ];

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button size="small" variant="outlined" startIcon={<AddIcon />}>
              {t("addTransaction")}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Paper>
          <div style={{ height: 500, width: "100%" }}>
            <div style={{ display: "flex", height: "100%" }}>
              <div style={{ flexGrow: 1 }} className={classes.root}>
                <DataGrid
                  autoPageSize
                  loading={isLoading}
                  rows={data || []}
                  columns={columns}
                  disableSelectionOnClick
                  getRowClassName={(params) =>
                    `transaction-${params.row ? "success" : "fail"}`
                  }
                />
              </div>
            </div>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export { Transactions };
