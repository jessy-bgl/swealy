import { useTranslation } from "react-i18next";
import { Button, Grid, Typography, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircle";

type Props = {
  title: string;
  showAddDca: boolean;
  handleClickAddDca: () => void;
};

const BotsListHeader = ({ title, showAddDca, handleClickAddDca }: Props) => {
  const { t } = useTranslation("dca");

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        padding={1.1}
        spacing={1}
      >
        <Grid item>
          <Typography variant="h6">{title}</Typography>
        </Grid>
        {showAddDca && (
          <Grid item>
            <Button
              fullWidth
              size="small"
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleClickAddDca}
            >
              {t("createDca")}
            </Button>
          </Grid>
        )}
      </Grid>
      <Divider />
    </>
  );
};

export { BotsListHeader };
