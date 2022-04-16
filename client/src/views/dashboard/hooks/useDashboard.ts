import { SyntheticEvent, useEffect, useState } from "react";

import { Dca, DcaStatusEnum } from "../../../models/Dca";
import { useFetchDcas } from "../dca/hooks/useDcaQueries";

enum DcaTabs {
  STATISTICS = "statistics",
  INFO = "info",
}

const useDashboard = (dcaStatus: DcaStatusEnum) => {
  const [dcas, setDcas] = useState([] as Dca[]);
  const [selectedDcaId, setSelectedDcaId] = useState("");
  const [selectedTab, setSelectedTab] = useState(DcaTabs.STATISTICS);

  const { data, isLoading } = useFetchDcas();

  // TODO : bug here - this is not always called after data update
  useEffect(() => {
    if (data) setDcas(data.filter((dca) => dca.status === dcaStatus));
    setSelectedDcaId("");
  }, [data, dcaStatus]);

  const handleSelectTab = (_: SyntheticEvent, newTab: DcaTabs) => {
    setSelectedTab(newTab);
  };

  return {
    dcas,
    isLoading,
    selectedDcaId,
    setSelectedDcaId,
    selectedTab,
    handleSelectTab,
  };
};

export { useDashboard, DcaTabs };
