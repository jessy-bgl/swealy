import { useEffect, useState } from "react";

import { Dca, DcaStatusEnum } from "../../../models/Dca";
import { useFetchDcas } from "../../../hooks/useDcaQueries";

const useDashboard = () => {
  const [dcas, setDcas] = useState([] as Dca[]);

  const { data, isLoading } = useFetchDcas();

  useEffect(() => {
    if (data)
      setDcas(data.filter((dca) => dca.status === DcaStatusEnum.ACTIVE));
  }, [data]);

  return { dcas, isLoading };
};

export { useDashboard };
