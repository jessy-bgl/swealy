import { useTranslation } from "react-i18next";
import { Button, Grid, Paper } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";

import { useFetchTransactions } from "./hooks/useTransactionQueries";
import { useTransactionStyles } from "./hooks/useTransactionStyles";
import { useTransactions } from "./hooks/useTransactions";

import { CreateTransactionDialog } from "./CreateTransactionDialog";
import { DeleteTransactionDialog } from "./DeleteTransactionDialog";
import { TransactionInfoDialog } from "./TransactionInfoDialog";

const Transactions = () => {
  const { t } = useTranslation("transaction");
  const classes = useTransactionStyles()();
  const { data, isLoading } = useFetchTransactions();
  const {
    openAddTransactionDialog,
    deleteTransactionDialog,
    transactionInfoDialog,
    toggleAddTransactionDialog,
    closeDeleteTransactionDialog,
    closeTransactionInfoDialog,
    columns,
  } = useTransactions();

  return (
    <>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Button
                size="small"
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={toggleAddTransactionDialog}
              >
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
                      `transaction-${params.row.success ? "success" : "fail"}`
                    }
                    components={{
                      Toolbar: GridToolbar,
                    }}
                  />
                </div>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>

      {openAddTransactionDialog && (
        <CreateTransactionDialog onClose={toggleAddTransactionDialog} />
      )}

      {deleteTransactionDialog.open && (
        <DeleteTransactionDialog
          data={deleteTransactionDialog.data}
          onClose={closeDeleteTransactionDialog}
        />
      )}

      {transactionInfoDialog.open && (
        <TransactionInfoDialog
          data={transactionInfoDialog.data}
          onClose={closeTransactionInfoDialog}
        />
      )}
    </>
  );
};

export { Transactions };
