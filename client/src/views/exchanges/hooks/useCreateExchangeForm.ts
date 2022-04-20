import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { CreateExchangeDTO } from "../../../models/Exchange";

const useCreateExchangeForm = () => {
  const { t } = useTranslation("exchange");

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

  return { handleSubmit, register, errors, isDirty };
};

export { useCreateExchangeForm };
