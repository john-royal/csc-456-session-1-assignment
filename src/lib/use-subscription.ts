import { useEffect } from "react";
import {
  DefaultError,
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

export interface UseSubscriptionOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> extends Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryFn"
  > {
  getInitialData: () => Promise<TQueryFnData>;
  getSubscription: (
    onValue: (data: TQueryFnData) => void,
    onError: (error: TError) => void,
  ) => () => void;
}

export const useSubscription = <
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>({
  queryKey,
  getInitialData,
  getSubscription,
  ...queryOptions
}: UseSubscriptionOptions<TData, TError, TData, TQueryKey>) => {
  const query = useQuery({
    queryKey,
    queryFn: getInitialData,

    // Refetching is disabled because the subscription updates the value in real-time.
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,

    ...queryOptions,
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = getSubscription(
      (data) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
        queryClient.setQueryData(queryKey, data as any);
      },
      () => {
        void queryClient.invalidateQueries({ queryKey });
      },
    );

    return unsubscribe;
  }, [queryClient, getSubscription, queryKey]);

  return query;
};
