import { nanoid } from "nanoid";
import { z } from "zod";

import { QueryBuilder, Repository } from "./common/repository";
import { useSubscription } from "./common/use-subscription";

export const Message = z.object({
  id: z.string().default(nanoid),
  conversationId: z.string(),
  user: z.object({
    id: z.string(),
    username: z.string(),
    imageUrl: z.string().optional(),
  }),
  content: z.string(),
  createdAt: z.number().default(Date.now()),
});

export type Message = z.infer<typeof Message>;

export const messagesRepository = new Repository("messages", Message);

export const useMessages = (conversationId: string) => {
  const qb: QueryBuilder = (messages, { query, where, orderBy }) => {
    return query(
      messages,
      where("conversationId", "==", conversationId),
      orderBy("createdAt", "asc"),
    );
  };

  return useSubscription({
    queryKey: ["messages", conversationId],
    getInitialData: () => messagesRepository.list(qb),
    getSubscription: (onSnapshot) =>
      messagesRepository.subscribe(qb, onSnapshot),
  });
};
