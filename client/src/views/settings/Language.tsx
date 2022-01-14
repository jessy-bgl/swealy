import { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  MenuItem,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

import {
  LanguageContext,
  Languages,
} from "../../services/stores/language/LanguageContext";

const LanguageSettings = () => {
  const { t } = useTranslation("settings");
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <List>
      <ListItem divider>
        <ListItemIcon>
          <LanguageIcon />
        </ListItemIcon>
        <ListItemText primary={t("settings:language.title")} />
        <TextField
          select
          size="small"
          value={language}
          onChange={(e) => setLanguage(e.target.value as Languages)}
        >
          {Object.values(Languages).map((lang) => {
            return (
              <MenuItem key={lang} value={lang}>
                {t(`language.${lang}`)}
              </MenuItem>
            );
          })}
        </TextField>
      </ListItem>
    </List>
  );
};

export { LanguageSettings };
