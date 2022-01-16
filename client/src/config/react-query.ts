import { QueryClient, setLogger } from "react-query";

const queryClient = new QueryClient();

queryClient.setDefaultOptions({
  queries: { refetchOnWindowFocus: false },
});

setLogger({
  log: () => {},
  warn: () => {},
  error: () => {},
});

export { queryClient };
