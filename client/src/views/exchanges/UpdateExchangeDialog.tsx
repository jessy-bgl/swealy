import { useTranslation } from "react-i18next";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

import { Exchange, UpdateExchangeDTO } from "../../models/Exchange";
import { useUpdateExchangeForm } from "./hooks/useUpdateExchangeForm";
import { useUpdateExchange } from "./hooks/useExchangeQueries";

type Props = {
  data: Exchange;
  onClose: () => void;
};

const UpdateExchangeDialog = ({ data, onClose }: Props) => {
  const { t } = useTranslation(["common", "exchange"]);

  const theme = useTheme();
  const fullScreenDialog = useMediaQuery(theme.breakpoints.down("sm"));

  const updateExchangeQuery = useUpdateExchange();

  const handleUpdateExchange = (values: UpdateExchangeDTO) => {
    updateExchangeQuery.mutateAsync({ ...values, id: data.id }).then(onClose);
  };

  const { handleSubmit, register, errors, isDirty } = useUpdateExchangeForm({
    data,
  });

  const dialogTitle = data.subaccountName
    ? `${data.name.toUpperCase()} - ${data.subaccountName}`
    : data.name.toUpperCase();

  return (
    <Dialog fullScreen={fullScreenDialog} open={true} onClose={onClose}>
      <form onSubmit={handleSubmit(handleUpdateExchange)}>
        <DialogTitle>
          {dialogTitle}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 12 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item>
              <TextField
                fullWidth
                {...register("subaccountName")}
                label={t("exchange:subaccountName")}
                helperText={errors["subaccountName"]?.message}
                error={errors["subaccountName"] ? true : false}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                {...register("label")}
                label={t("exchange:label")}
                helperText={errors["label"]?.message}
                error={errors["label"] ? true : false}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                {...register("apiKey")}
                label={t("exchange:apiKey")}
                helperText={errors["apiKey"]?.message}
                error={errors["apiKey"] ? true : false}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                {...register("apiSecret")}
                label={t("exchange:apiSecret")}
                helperText={errors["apiSecret"]?.message}
                error={errors["apiSecret"] ? true : false}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Grid container justifyContent="center" spacing={1}>
            <Grid item>
              <Button
                type="submit"
                color="warning"
                variant="outlined"
                disabled={!isDirty || updateExchangeQuery.isLoading}
              >
                {t("common:update")}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export { UpdateExchangeDialog };
