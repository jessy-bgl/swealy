import { Container, Grid, List } from "@mui/material";

import { AppVersion } from "./components/AppVersion";
import { License } from "./components/License";
import { GitHub } from "./components/GitHub";

const About = () => {
  return (
    <Container maxWidth="xs">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <List>
            <AppVersion />
            <License />
            <GitHub />
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export { About };
