import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import LicenseIcon from "@mui/icons-material/Description";
import LinkIcon from "@mui/icons-material/OpenInNew";

const License = () => {
  const { t } = useTranslation("about");

  return (
    <ListItem divider>
      <ListItemIcon>
        <LicenseIcon />
      </ListItemIcon>
      <ListItemText primary={t("license")} secondary={"GPLv3"} />
      <ListItemSecondaryAction>
        <IconButton
          href="https://github.com/jessy-bgl/swealy/blob/main/LICENSE"
          target="_blank"
        >
          <LinkIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export { License };
