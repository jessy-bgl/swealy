import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useUpdateExchange } from "./useExchangeQueries";
import { UpdateExchangeDTO } from "../../../models/Exchange";

type Props = {
  data: UpdateExchangeDTO;
  closeDialog: () => void;
};

const useUpdateExchangeForm = ({
  data = {} as UpdateExchangeDTO,
  closeDialog,
}: Props) => {
  const { t } = useTranslation("exchange");
  const updateExchangeQuery = useUpdateExchange();

  const schema = yup.object({
    label: yup.string().required(t("form.requiredField")),
    apiKey: yup.string().required(t("form.requiredField")),
    apiSecret: yup.string().required(t("form.requiredField")),
    subaccountName: yup.string(),
  });

  const defaultValues = {
    label: data.label,
    apiKey: data.apiKey,
    apiSecret: data.apiSecret,
    subaccountName: data.subaccountName,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UpdateExchangeDTO>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = (values: UpdateExchangeDTO) => {
    updateExchangeQuery
      .mutateAsync({ ...values, id: data.id })
      .then(() => closeDialog());
  };

  const submit = handleSubmit(onSubmit);

  const isLoading = updateExchangeQuery.isLoading;

  return { submit, register, errors, isDirty, isLoading };
};

export { useUpdateExchangeForm };
