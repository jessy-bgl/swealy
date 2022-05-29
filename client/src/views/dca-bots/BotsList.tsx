import { List, ListItem, ListItemText } from "@mui/material";
import { useTranslation } from "react-i18next";

import { Dca } from "../../models/Dca";
import { BotListItem } from "./BotListItem";
import { BotsListHeader } from "./BotsListHeader";

interface Props {
  data: Dca[];
  showAddDca: boolean;
  title: string;
  handleClickDca: (dcaId: string) => void;
  handleClickAddDca: () => void;
}

const BotsList = ({
  data,
  showAddDca,
  title,
  handleClickAddDca,
  handleClickDca,
}: Props) => {
  const { t } = useTranslation("common");

  return (
    <List
      dense
      disablePadding
      subheader={
        <BotsListHeader
          title={title}
          showAddDca={showAddDca}
          handleClickAddDca={handleClickAddDca}
        />
      }
    >
      {data.length ? (
        data.map((dca) => (
          <BotListItem
            key={dca.id}
            data={dca}
            onClick={() => handleClickDca(dca.id)}
          />
        ))
      ) : (
        <ListItem sx={{ textAlign: "center" }}>
          <ListItemText>{t("none")}</ListItemText>
        </ListItem>
      )}
    </List>
  );
};

export { BotsList };
