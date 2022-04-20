import { useState } from "react";

import { CreateDcaDTO } from "../../../../models/Dca";
import { useCreateDca } from "./useDcaQueries";

type Props = {
  closeDialog: () => void;
};

const useCreateDcaDialog = ({ closeDialog }: Props) => {
  const [allFormsData, setFormsData] = useState({} as CreateDcaDTO);

  const [currentStep, setCurrentStep] = useState(1);

  const handleClickPrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmitFirstForm = ({ exchange }: { exchange: string }) => {
    setFormsData({ ...allFormsData, exchange });
    setCurrentStep(currentStep + 1);
  };

  const handleSubmitSecondForm = ({ pair }: { pair: string }) => {
    setFormsData({ ...allFormsData, pair });
    setCurrentStep(currentStep + 1);
  };

  const handleSubmitThirdForm = ({
    frequencyInDays,
    hour,
    amount,
  }: {
    frequencyInDays: number;
    hour: number;
    amount: number;
  }) => {
    setFormsData({ ...allFormsData, frequencyInDays, hour, amount });
    setCurrentStep(4);
  };

  const createDcaQuery = useCreateDca();

  const handleSubmit = () => {
    createDcaQuery.mutateAsync(allFormsData).then(() => closeDialog());
  };

  return {
    currentStep,
    allFormsData,
    handleSubmitFirstForm,
    handleSubmitSecondForm,
    handleSubmitThirdForm,
    handleClickPrevious,
    handleSubmit,
  };
};

export { useCreateDcaDialog };
