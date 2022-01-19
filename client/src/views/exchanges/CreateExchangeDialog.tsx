import { useTranslation } from "react-i18next";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

import { useCreateExchangeForm } from "./hooks/useCreateExchangeForm";
import { ExchangesEnum } from "../../models/Exchange";

type Props = {
  onClose: () => void;
};

const styles = {
  field: { minWidth: 275 },
};

const CreateExchangeDialog = ({ onClose }: Props) => {
  const { t } = useTranslation(["common", "exchange"]);

  const theme = useTheme();
  const fullScreenDialog = useMediaQuery(theme.breakpoints.down("sm"));

  const { submit, register, errors, isDirty, isLoading } =
    useCreateExchangeForm({ closeDialog: onClose });

  return (
    <Dialog fullScreen={fullScreenDialog} open={true} onClose={onClose}>
      <form onSubmit={submit}>
        <DialogTitle>
          {t("exchange:newExchange")}
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
                select
                {...register("name")}
                helperText={errors["name"]?.message}
                error={errors["name"] ? true : false}
                defaultValue={ExchangesEnum.FTX}
                sx={styles.field}
              >
                {Object.values(ExchangesEnum).map((exchangeName) => (
                  <MenuItem key={exchangeName} value={exchangeName}>
                    {exchangeName.toUpperCase()}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                {...register("subaccountName")}
                label={t("exchange:subaccountName")}
                helperText={errors["subaccountName"]?.message}
                error={errors["subaccountName"] ? true : false}
                sx={styles.field}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                {...register("label")}
                label={t("exchange:label")}
                helperText={errors["label"]?.message}
                error={errors["label"] ? true : false}
                sx={styles.field}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                {...register("apiKey")}
                label={t("exchange:apiKey")}
                helperText={errors["apiKey"]?.message}
                error={errors["apiKey"] ? true : false}
                sx={styles.field}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                {...register("apiSecret")}
                label={t("exchange:apiSecret")}
                helperText={errors["apiSecret"]?.message}
                error={errors["apiSecret"] ? true : false}
                sx={styles.field}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Grid container justifyContent="center" spacing={1}>
            <Grid item>
              <Button
                type="submit"
                color="primary"
                variant="outlined"
                disabled={!isDirty || isLoading}
              >
                {t("common:submit")}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export { CreateExchangeDialog };
