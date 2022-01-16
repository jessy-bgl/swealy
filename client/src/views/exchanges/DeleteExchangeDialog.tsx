import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { Exchange } from "../../models/Exchange";
import { useDeleteExchange } from "./hooks/useExchangeQueries";

type Props = {
  data: Exchange;
  onClose: () => void;
};

const DeleteExchangeDialog = ({ data, onClose }: Props) => {
  const { t } = useTranslation(["common", "exchange"]);

  const deleteExchangeQuery = useDeleteExchange();

  const handleDeleteExchange = () => {
    deleteExchangeQuery.mutateAsync(data.id).then(() => onClose());
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>
        {t("exchange:removeExchangeTitle", {
          label: data.label,
          name: data.name.toUpperCase(),
        })}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t("exchange:removeExchangeWarning")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("common:cancel")}</Button>
        <Button
          onClick={handleDeleteExchange}
          autoFocus
          disabled={deleteExchangeQuery.isLoading}
        >
          {t("common:confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DeleteExchangeDialog };
