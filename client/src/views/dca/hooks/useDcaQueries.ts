import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Dca } from "../../../models/Dca";
import { Pair } from "../../../models/Exchange";
import { DcaService } from "../../../services/api/DcaService";
import { ExchangeService } from "../../../services/api/ExchangeService";

const DCAS_QUERY_KEY = "dcas";
const EXCHANGE_PAIRS_QUERY_KEY = "pairs";

const useFetchDcas = () => {
  return useQuery<Dca[], Error>(DCAS_QUERY_KEY, () => DcaService.fetchDcas());
};

const useCreateDca = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("dca");
  const queryClient = useQueryClient();

  return useMutation(DcaService.createDca, {
    onSuccess: (newDca: Dca) => {
      queryClient.setQueryData<Dca[]>(DCAS_QUERY_KEY, (dcas) => {
        if (!dcas) return [];
        dcas.push(newDca);
        return dcas;
      });
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
      queryClient.setQueryData<Dca[]>(DCAS_QUERY_KEY, (dcas) => {
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

const useFetchExchangePairs = (exchangeId: string) => {
  return useQuery<Pair[], Error>(EXCHANGE_PAIRS_QUERY_KEY, () =>
    ExchangeService.fetchAvailableSpotPairs(exchangeId)
  );
};

export { useCreateDca, useFetchDcas, useUpdateDca, useFetchExchangePairs };
