import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import * as locale from "date-fns/locale";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

import { Transaction } from "../../models/Transaction";
import { useDeleteTransaction } from "./hooks/useTransactionQueries";
import { LanguageContext } from "../../services/stores/language/LanguageContext";

type Props = {
  data: Transaction;
  onClose: () => void;
};

const DeleteTransactionDialog = ({ data, onClose }: Props) => {
  const { t } = useTranslation(["common", "transaction"]);
  const { language } = useContext(LanguageContext);
  const deleteTransactionQuery = useDeleteTransaction();

  const handleDeleteTransaction = () => {
    deleteTransactionQuery.mutateAsync(data.id).then(() => onClose());
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>
        {t("transaction:removeTransactionTitle", {
          pair: data.dca.pair,
          date: format(new Date(data.datetime), "PPp", {
            locale: language === "fr" ? locale.fr : locale.enGB,
          }),
        })}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t("transaction:removeTransactionWarning")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("common:cancel")}</Button>
        <Button
          onClick={handleDeleteTransaction}
          autoFocus
          disabled={deleteTransactionQuery.isLoading}
        >
          {t("common:confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DeleteTransactionDialog };
