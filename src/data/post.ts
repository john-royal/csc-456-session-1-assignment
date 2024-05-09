import { nanoid } from "nanoid";
import { z } from "zod";

import { QueryBuilder, Repository } from "~/data/common/repository";
import { useSubscription } from "~/data/common/use-subscription";

export const Post = z.object({
  id: z.string().default(nanoid),
  user: z.object({
    id: z.string(),
    username: z.string(),
    imageUrl: z.string().url().nullable(),
  }),
  imageUrl: z.string().url(),
  createdAt: z.number().default(() => Date.now()),
});

export type Post = z.infer<typeof Post>;

export const postsRepository = new Repository("posts", Post);

export const usePosts = () => {
  const qb: QueryBuilder = (ref, { query, orderBy }) =>
    query(ref, orderBy("createdAt", "desc"));

  return useSubscription({
    queryKey: ["posts"],
    getInitialData: () => postsRepository.list(qb),
    getSubscription: (onValue) => postsRepository.subscribe(qb, onValue),
  });
};

export const usePostsByUser = (userId: string) => {
  const qb: QueryBuilder = (ref, { query, where, orderBy }) =>
    query(ref, where("user.id", "==", userId), orderBy("createdAt", "desc"));

  return useSubscription({
    queryKey: ["postsByUser", userId],
    getInitialData: () => postsRepository.list(qb),
    getSubscription: (onValue) => postsRepository.subscribe(qb, onValue),
  });
};
