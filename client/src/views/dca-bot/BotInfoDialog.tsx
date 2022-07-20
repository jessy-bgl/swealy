import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Dca } from "../../models/Dca";
import { BotInfoForm } from "./BotInfoForm";

type Props = {
  onClose: () => void;
  data: Dca;
};

const BotInfoDialog = ({ onClose, data }: Props) => {
  const { t } = useTranslation("dca");

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>
        {t("info")}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 12 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1, pb: 1 }}>
        <BotInfoForm data={data} />
      </DialogContent>
    </Dialog>
  );
};

export { BotInfoDialog };
