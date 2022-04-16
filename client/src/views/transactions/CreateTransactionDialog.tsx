import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Skeleton,
  TextField,
  useMediaQuery,
} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import CloseIcon from "@mui/icons-material/Close";

import { CreateTransactionDTO, OrderTypesEnum } from "../../models/Transaction";
import { useFetchDcas } from "../dashboard/dca/hooks/useDcaQueries";
import { useCreateTransactionForm } from "./hooks/useTransactionForm";
import { useCreateTransaction } from "./hooks/useTransactionQueries";

type Props = {
  onClose: () => void;
};

const styles = { field: { width: 250 } };

const CreateTransactionDialog = ({ onClose }: Props) => {
  const theme = useTheme();
  const fullScreenDialog = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchDcaQuery = useFetchDcas();
  const createTransactionQuery = useCreateTransaction();

  const { handleSubmit, register, errors, isDirty, control } =
    useCreateTransactionForm();

  const onSubmit = (values: CreateTransactionDTO) => {
    createTransactionQuery.mutateAsync(values).then(() => onClose());
  };

  const { t } = useTranslation(["common", "transaction"]);

  return (
    <Dialog open onClose={onClose} fullScreen={fullScreenDialog}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle sx={{ minWidth: 300 }}>
          {t("transaction:newTransaction")}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 12 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Grid
            container
            direction="column"
            alignItems="center"
            spacing={2}
            sx={{ paddingTop: 1 }}
          >
            <Grid item>
              <Controller
                control={control}
                name="datetime"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          fullWidth
                          helperText={error?.message}
                          error={error ? true : false}
                          sx={styles.field}
                        />
                      )}
                      label={t("transaction:form.datetime")}
                      value={value}
                      onChange={onChange}
                      maxDateTime={new Date()}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
            <Grid item>
              {fetchDcaQuery.isLoading ? (
                <Skeleton width={200} />
              ) : (
                <TextField
                  fullWidth
                  select
                  {...register("dca")}
                  type="string"
                  label={t("transaction:form.dca")}
                  defaultValue=""
                  helperText={errors["dca"]?.message}
                  error={errors["dca"] ? true : false}
                  sx={styles.field}
                >
                  {fetchDcaQuery.data?.map((dca) => (
                    <MenuItem key={dca.id} value={dca.id}>
                      {`${dca.pair} (${dca.exchange.label})`}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                {...register("price")}
                type="number"
                label={t("transaction:form.price")}
                helperText={errors["price"]?.message}
                error={errors["price"] ? true : false}
                sx={styles.field}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                {...register("size")}
                type="number"
                label={t("transaction:form.size")}
                helperText={errors["size"]?.message}
                error={errors["size"] ? true : false}
                sx={styles.field}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                select
                {...register("type")}
                type="string"
                defaultValue={OrderTypesEnum.LIMIT}
                label={t("transaction:form.type")}
                helperText={errors["type"]?.message}
                error={errors["type"] ? true : false}
                sx={styles.field}
              >
                <MenuItem value={OrderTypesEnum.LIMIT}>
                  {OrderTypesEnum.LIMIT}
                </MenuItem>
                <MenuItem value={OrderTypesEnum.MARKET}>
                  {OrderTypesEnum.MARKET}
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                multiline
                {...register("description")}
                type="string"
                label={t("transaction:form.description")}
                helperText={errors["description"]?.message}
                error={errors["description"] ? true : false}
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
                disabled={!isDirty || createTransactionQuery.isLoading}
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

export { CreateTransactionDialog };
