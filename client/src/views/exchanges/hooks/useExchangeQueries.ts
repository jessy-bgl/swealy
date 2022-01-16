import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Exchange } from "../../../models/Exchange";
import { ExchangeService } from "../../../services/api/ExchangeService";

const EXCHANGES_QUERY_KEY = "exchanges";

const useFetchExchanges = () => {
  return useQuery<Exchange[], Error>(EXCHANGES_QUERY_KEY, () =>
    ExchangeService.fetchExchanges()
  );
};

const useCreateExchange = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("exchange");
  const queryClient = useQueryClient();

  return useMutation(ExchangeService.createExchange, {
    onSuccess: (newExchange: Exchange) => {
      queryClient.setQueryData<Exchange[]>(EXCHANGES_QUERY_KEY, (exchanges) => {
        if (!exchanges) return [];
        exchanges.push(newExchange);
        return exchanges;
      });
      enqueueSnackbar(t("createExchangeSuccess"), { variant: "success" });
    },
    onError: (error: Error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
};

const useUpdateExchange = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("exchange");
  const queryClient = useQueryClient();

  return useMutation(ExchangeService.updateExchange, {
    onSuccess: (updatedExchange: Exchange) => {
      queryClient.setQueryData<Exchange[]>(EXCHANGES_QUERY_KEY, (exchanges) => {
        if (!exchanges) return [];
        const dataIndex = exchanges.findIndex(
          (exchange) => exchange.id === updatedExchange.id
        );
        exchanges[dataIndex] = updatedExchange;
        return exchanges;
      });
      enqueueSnackbar(t("updateExchangeSuccess"), { variant: "success" });
    },
    onError: (error: Error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
};

const useCheckApiKeysValidity = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("exchange");

  return useMutation(ExchangeService.checkApiKeys, {
    onSuccess: () => {
      enqueueSnackbar(t("checkApiKeysSuccess"), { variant: "success" });
    },
    onError: (error: Error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
};

const useDeleteExchange = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("exchange");
  const queryClient = useQueryClient();

  return useMutation(ExchangeService.deleteExchange, {
    onSuccess: (deletedExchange: Exchange) => {
      queryClient.setQueryData<Exchange[]>(EXCHANGES_QUERY_KEY, (exchanges) => {
        if (!exchanges) return [];
        return exchanges.filter(
          (exchange) => exchange.id !== deletedExchange.id
        );
      });
      enqueueSnackbar(t("deleteExchangeSuccess"), { variant: "success" });
    },
    onError: (error: Error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
};

export {
  useFetchExchanges,
  useCreateExchange,
  useUpdateExchange,
  useDeleteExchange,
  useCheckApiKeysValidity,
};
