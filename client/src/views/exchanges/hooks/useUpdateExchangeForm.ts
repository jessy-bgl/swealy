import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { UpdateExchangeDTO } from "../../../models/Exchange";

type Props = {
  data: UpdateExchangeDTO;
};

const useUpdateExchangeForm = ({ data = {} as UpdateExchangeDTO }: Props) => {
  const { t } = useTranslation("exchange");

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

  return { handleSubmit, register, errors, isDirty };
};

export { useUpdateExchangeForm };
