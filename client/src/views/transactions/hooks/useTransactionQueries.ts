import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Transaction } from "../../../models/Transaction";
import { TransactionService } from "../../../services/api/TransactionService";

const TRANSACTIONS_QUERY_KEY = "transactions";

const useFetchTransactions = () => {
  return useQuery<Transaction[], Error>(TRANSACTIONS_QUERY_KEY, () =>
    TransactionService.fetchTransactions()
  );
};

const useCreateTransaction = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("transaction");
  const queryClient = useQueryClient();

  return useMutation(TransactionService.createTransaction, {
    onSuccess: (newTransaction: Transaction) => {
      queryClient.setQueryData<Transaction[]>(
        TRANSACTIONS_QUERY_KEY,
        (transactions) => {
          if (!transactions) return [];
          transactions.push(newTransaction);
          return transactions;
        }
      );
      enqueueSnackbar(t("createTransactionSuccess"), { variant: "success" });
    },
    onError: (error: Error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
};

const useDeleteTransaction = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("transaction");
  const queryClient = useQueryClient();

  return useMutation(TransactionService.deleteTransaction, {
    onSuccess: (deletedTransaction: Transaction) => {
      queryClient.setQueryData<Transaction[]>(
        TRANSACTIONS_QUERY_KEY,
        (transactions) => {
          if (!transactions) return [];
          return transactions.filter(
            (transaction) => transaction.id !== deletedTransaction.id
          );
        }
      );
      enqueueSnackbar(t("deleteTransactionSuccess"), { variant: "success" });
    },
    onError: (error: Error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
};

export { useFetchTransactions, useCreateTransaction, useDeleteTransaction };
