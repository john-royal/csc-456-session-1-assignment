import type { z } from "zod";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import type { QueryBuilder, Repository } from "./repositories";

export interface UseFirestoreSubscriptionOptions<
  TKey extends string[],
  TSchema extends z.AnyZodObject,
  TData extends z.infer<TSchema>,
> {
  queryKey: TKey;
  repository: Repository<TSchema, TData>;
  queryFn: QueryBuilder;
}

export const useFirestoreSubscription = <
  TKey extends string[],
  TSchema extends z.AnyZodObject,
  TData extends z.infer<TSchema>,
>({
  queryKey,
  queryFn,
  repository,
}: UseFirestoreSubscriptionOptions<TKey, TSchema, TData>) => {
  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const result = await repository.list(queryFn);
      return result;
    },

    // Refetching is disabled because the subscription updates the value in real-time.
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = repository.subscribe(queryFn, (updateData) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
      queryClient.setQueryData(queryKey, updateData as any);
    });

    return unsubscribe;
  }, [queryClient, repository, queryFn, queryKey]);

  return query;
};
