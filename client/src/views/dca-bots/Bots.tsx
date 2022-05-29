import SimpleBar from "simplebar-react";

import { Paper } from "@mui/material";

import { Dca } from "../../models/Dca";
import { CreateBotDialog } from "./dialogs/CreateBotDialog";
import { useFetchExchanges } from "../exchanges/hooks/useExchangeQueries";
import { useBots } from "./hooks/useBots";
import { BotsList } from "./BotsList";

interface Props {
  data: Dca[];
  showAddDca: boolean;
  title: string;
}

const Bots = (props: Props) => {
  const fetchExchangesQuery = useFetchExchanges();

  const {
    openAddDcaDialog,
    handleClickAddDca,
    handleCloseAddDcaDialog,
    handleClickDca,
  } = useBots();

  return (
    <>
      <Paper>
        <SimpleBar style={{ maxHeight: 559 }}>
          <BotsList
            handleClickAddDca={handleClickAddDca}
            handleClickDca={handleClickDca}
            {...props}
          />
        </SimpleBar>
      </Paper>

      {openAddDcaDialog && (
        <CreateBotDialog
          onClose={handleCloseAddDcaDialog}
          exchanges={fetchExchangesQuery.data || []}
        />
      )}
    </>
  );
};

export { Bots };
