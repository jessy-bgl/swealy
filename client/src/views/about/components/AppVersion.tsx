import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useTranslation } from "react-i18next";

import AppVersionIcon from "@mui/icons-material/InfoOutlined";

const AppVersion = () => {
  const { t } = useTranslation("about");

  return (
    <ListItem divider>
      <ListItemIcon>
        <AppVersionIcon />
      </ListItemIcon>
      <ListItemText
        primary={t("appVersion")}
        secondary={process.env.REACT_APP_VERSION}
      />
    </ListItem>
  );
};

export { AppVersion };
