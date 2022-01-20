import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const useCreateDcaFirstForm = () => {
  const { t } = useTranslation("dca");
  const schema = yup.object({
    exchange: yup.string().required(t("form.requiredField")),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return { handleSubmit, errors, isDirty, control };
};

const useCreateDcaSecondForm = () => {
  const { t } = useTranslation("dca");
  const schema = yup.object({
    pair: yup.string().required(t("form.requiredField")),
  });
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return { handleSubmit, errors, isDirty, control };
};

const useCreateDcaThirdForm = () => {
  const { t } = useTranslation("dca");
  const fields = [
    { name: "amount" },
    { name: "frequencyInDays" },
    { name: "hour" },
  ];
  const schema = yup.object({
    amount: yup
      .number()
      .typeError(t("form.requiredField"))
      .min(1, t("form.mustBeGreaterOrEqualTo", { value: 1 }))
      .required(t("form.requiredField")),
    frequencyInDays: yup
      .number()
      .typeError(t("form.requiredField"))
      .min(1, t("form.mustBeGreaterOrEqualTo", { value: 1 }))
      .required(t("form.requiredField")),
    hour: yup
      .number()
      .typeError(t("form.requiredField"))
      .min(0, t("form.mustBeGreaterOrEqualTo", { value: 0 }))
      .required(t("form.requiredField")),
  });
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return { handleSubmit, errors, isDirty, control, fields, register, reset };
};

export { useCreateDcaFirstForm, useCreateDcaSecondForm, useCreateDcaThirdForm };
