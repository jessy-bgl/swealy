import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Dca } from "../models/Dca";
import { Pair } from "../models/Exchange";
import { DcaService } from "../services/api/DcaService";
import { ExchangeService } from "../services/api/ExchangeService";

const DCA_QUERY_KEY = "dcas";
const SINGLE_DCA_QUERY_KEY = "dca";
const EXCHANGE_PAIRS_QUERY_KEY = "pairs";

const useFetchDcas = () => {
  return useQuery<Dca[], Error>(DCA_QUERY_KEY, () => DcaService.fetchDcas());
};

const useFetchOneDca = (id?: string) => {
  return useQuery<Dca, Error>(SINGLE_DCA_QUERY_KEY, () => {
    if (!id) throw new Error("Missing ID");
    return DcaService.fetchOneDca(id);
  });
};

const useCreateDca = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("dca");
  const queryClient = useQueryClient();

  return useMutation(DcaService.createDca, {
    onSuccess: (newDca: Dca) => {
      // this is a little hack, because using setQueryData do not trigger any update
      queryClient.refetchQueries(DCA_QUERY_KEY);
      // queryClient.setQueryData<Dca[]>(DCA_QUERY_KEY, (dcas) => {
      //   if (!dcas) return [];
      //   dcas.push(newDca);
      //   return dcas;
      // });
      enqueueSnackbar(t("createDcaSuccess"), { variant: "success" });
    },
    onError: (error: Error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
};

const useUpdateDca = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("dca");
  const queryClient = useQueryClient();

  return useMutation(DcaService.updateDca, {
    onSuccess: (updatedDca: Dca) => {
      queryClient.setQueryData<Dca[]>(DCA_QUERY_KEY, (dcas) => {
        if (!dcas) return [];
        const dataIndex = dcas.findIndex((dca) => dca.id === updatedDca.id);
        dcas[dataIndex] = updatedDca;
        return dcas;
      });
      enqueueSnackbar(t("updateDcaSuccess"), { variant: "success" });
    },
    onError: (error: Error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
};

const useUpdateDcaStatus = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("dca");
  const queryClient = useQueryClient();

  return useMutation(DcaService.updateDcaStatus, {
    onSuccess: (updatedDca: Dca) => {
      // this is a little hack, because using setQueryData do not trigger any update
      queryClient.refetchQueries(DCA_QUERY_KEY);
      enqueueSnackbar(t("updateDcaSuccess"), { variant: "success" });
    },
    onError: (error: Error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
};

const useFetchExchangePairs = (exchangeId: string) => {
  return useQuery<Pair[], Error>(EXCHANGE_PAIRS_QUERY_KEY, () =>
    ExchangeService.fetchAvailableSpotPairs(exchangeId)
  );
};

export {
  useFetchDcas,
  useFetchOneDca,
  useCreateDca,
  useUpdateDca,
  useUpdateDcaStatus,
  useFetchExchangePairs,
};
