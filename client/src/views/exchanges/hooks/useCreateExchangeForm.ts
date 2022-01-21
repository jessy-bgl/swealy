import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useCreateExchange } from "./useExchangeQueries";
import { CreateExchangeDTO } from "../../../models/Exchange";

type Props = {
  closeDialog: () => void;
};

const useCreateExchangeForm = ({ closeDialog }: Props) => {
  const { t } = useTranslation("exchange");
  const createExchangeQuery = useCreateExchange();

  const schema = yup.object({
    name: yup.string().required(t("form.requiredField")),
    label: yup.string().required(t("form.requiredField")),
    apiKey: yup.string().required(t("form.requiredField")),
    apiSecret: yup.string().required(t("form.requiredField")),
    subaccountName: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<CreateExchangeDTO>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: CreateExchangeDTO) => {
    createExchangeQuery.mutateAsync(values).then(() => closeDialog());
  };

  const submit = handleSubmit(onSubmit);

  const isLoading = createExchangeQuery.isLoading;

  return { submit, register, errors, isDirty, isLoading };
};

export { useCreateExchangeForm };
