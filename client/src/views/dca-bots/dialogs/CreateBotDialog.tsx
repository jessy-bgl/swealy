import { useTranslation } from "react-i18next";

import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Exchange } from "../../../models/Exchange";
import { FirstForm } from "../forms/CreateBotFirstForm";
import { SecondForm } from "../forms/CreateBotSecondForm";
import { ThirdForm } from "../forms/CreateBotThirdForm";
import { BotConfirmation } from "../forms/CreateBotConfirmation";
import { useCreateBotDialog } from "../hooks/useCreateBotDialog";

type Props = {
  exchanges: Exchange[];
  onClose: () => void;
};

const CreateBotDialog = ({ exchanges, onClose }: Props) => {
  const { t } = useTranslation("dca");

  const {
    currentStep,
    allFormsData,
    handleSubmitFirstForm,
    handleSubmitSecondForm,
    handleSubmitThirdForm,
    handleClickPrevious,
    handleSubmit,
  } = useCreateBotDialog({ closeDialog: onClose });

  const renderForm = () => {
    if (currentStep === 1)
      return (
        <FirstForm
          exchanges={exchanges}
          onSubmit={handleSubmitFirstForm}
          defaultValues={{ exchange: allFormsData.exchange }}
        />
      );
    else if (currentStep === 2)
      return (
        <SecondForm
          exchangeId={allFormsData.exchange}
          onSubmit={handleSubmitSecondForm}
          onClickPrevious={handleClickPrevious}
          defaultValues={{ pair: allFormsData.pair }}
        />
      );
    else if (currentStep === 3)
      return (
        <ThirdForm
          onSubmit={handleSubmitThirdForm}
          onClickPrevious={handleClickPrevious}
          defaultValues={{
            amount: allFormsData.amount,
            frequencyInDays: allFormsData.frequencyInDays,
            hour: allFormsData.hour,
          }}
        />
      );
    else
      return (
        <BotConfirmation
          exchanges={exchanges}
          onSubmit={handleSubmit}
          onClickPrevious={handleClickPrevious}
          data={allFormsData}
        />
      );
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>
        {t("createDca")}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 12 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{renderForm()}</DialogContent>
    </Dialog>
  );
};

export { CreateBotDialog };
