import { nanoid } from "nanoid";
import { z } from "zod";

import { QueryBuilder, Repository } from "~/data/common/repository";
import { useSubscription } from "~/data/common/use-subscription";

export const Comment = z.object({
  id: z.string().default(nanoid),
  postId: z.string(),
  user: z.object({
    id: z.string(),
    username: z.string(),
    imageUrl: z.string().url().nullable(),
  }),
  content: z.string(),
  createdAt: z.number().default(() => Date.now()),
});

export type Comment = z.infer<typeof Comment>;

export const commentsRepository = new Repository("comments", Comment);

export const useComments = (postId: string) => {
  const qb: QueryBuilder = (ref, { query, where, orderBy }) =>
    query(ref, where("postId", "==", postId), orderBy("createdAt", "asc"));

  return useSubscription({
    queryKey: ["comments", postId],
    getInitialData: () => commentsRepository.list(qb),
    getSubscription: (onValue) => commentsRepository.subscribe(qb, onValue),
  });
};
