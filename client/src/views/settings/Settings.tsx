import { Container, Grid } from "@mui/material";
import { LanguageSettings } from "./Language";

const Settings = () => {
  return (
    <Container maxWidth="sm">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <LanguageSettings />
        </Grid>
      </Grid>
    </Container>
  );
};

export { Settings };
