import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkIcon from "@mui/icons-material/OpenInNew";

const GitHub = () => {
  const { t } = useTranslation("about");

  return (
    <ListItem divider>
      <ListItemIcon>
        <GitHubIcon />
      </ListItemIcon>
      <ListItemText primary={"GitHub"} secondary={t("githubInfo")} />
      <ListItemSecondaryAction>
        <IconButton href="https://github.com/jessy-bgl/swealy" target="_blank">
          <LinkIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export { GitHub };
