import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  CreateTransactionDTO,
  OrderTypesEnum,
} from "../../../models/Transaction";

const useCreateTransactionForm = () => {
  const { t } = useTranslation("transaction");

  const schema = yup.object({
    datetime: yup
      .date()
      .typeError(t("form.dateRequired"))
      .required(t("form.requiredField")),
    dca: yup.string().required(t("form.requiredField")),
    price: yup
      .number()
      .typeError(t("form.requiredField"))
      .required(t("form.requiredField"))
      .positive(t("form.mustBePositive")),
    size: yup
      .number()
      .typeError(t("form.requiredField"))
      .required(t("form.requiredField"))
      .positive(t("form.mustBePositive")),
    type: yup
      .string()
      .oneOf([OrderTypesEnum.LIMIT, OrderTypesEnum.MARKET])
      .required(t("form.requiredField")),
    description: yup.string().optional(),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<CreateTransactionDTO>({
    resolver: yupResolver(schema),
  });

  return { handleSubmit, register, errors, isDirty, control };
};

export { useCreateTransactionForm };
