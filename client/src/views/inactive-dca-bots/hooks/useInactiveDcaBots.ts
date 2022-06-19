import { useEffect, useState } from "react";

import { Dca, DcaStatusEnum } from "../../../models/Dca";
import { useFetchDcas } from "../../../hooks/useDcaQueries";

const useInactiveDcaBots = () => {
  const [pausedBots, setPausedBots] = useState([] as Dca[]);
  const [archivedBots, setArchivedBots] = useState([] as Dca[]);

  const { data, isLoading } = useFetchDcas();

  useEffect(() => {
    if (data) {
      setPausedBots(data.filter((dca) => dca.status === DcaStatusEnum.PAUSED));
      setArchivedBots(
        data.filter((dca) => dca.status === DcaStatusEnum.ARCHIVED)
      );
    }
  }, [data]);

  return { pausedBots, archivedBots, isLoading };
};

export { useInactiveDcaBots };
