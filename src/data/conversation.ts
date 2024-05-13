import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router";
import { z } from "zod";

import { useUser } from "~/lib/auth";
import { QueryBuilder, Repository } from "./common/repository";
import { useSubscription } from "./common/use-subscription";

export const Conversation = z.object({
  id: z.string().default(nanoid),
  participantIds: z.array(z.string()),
  participants: z.array(
    z.object({
      id: z.string(),
      username: z.string(),
      imageUrl: z.string().optional(),
    }),
  ),
  lastMessageContent: z.string().optional(),
  lastMessageTime: z.number().default(() => Date.now()),
});

export type Conversation = z.infer<typeof Conversation>;

export const conversationsRepository = new Repository(
  "conversations",
  Conversation,
);

export const useStartConversation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["startConversation"],
    mutationFn: async (participants: Conversation["participants"]) => {
      const conversation: Conversation = {
        id: participants
          .map((p) => p.id)
          .sort()
          .join("-"),
        participants,
        participantIds: participants.map((p) => p.id),
      };
      const existingConversation = await conversationsRepository.get(
        conversation.id,
      );
      if (existingConversation) {
        return existingConversation;
      }
      await conversationsRepository.set(conversation.id, conversation);
      return conversation;
    },
    onSuccess: (data) => {
      navigate(`/messages/${data.id}`);
    },
  });
};

export const useConversations = () => {
  const user = useUser();

  const qb: QueryBuilder = (conversations, { query, where, orderBy }) => {
    return query(conversations);
  };

  const format = (conversations: Conversation[]) => {
    return conversations.map((conversation) => {
      return {
        ...conversation,
        participants: conversation.participants.filter(
          (participant) => participant.id !== user.uid,
        ),
      };
    });
  };

  return useSubscription({
    queryKey: ["conversations", user.uid],
    getInitialData: async () => format(await conversationsRepository.list(qb)),
    getSubscription: (onSnapshot, onError) =>
      conversationsRepository.subscribe(
        qb,
        (snapshot) => onSnapshot(format(snapshot)),
        onError,
      ),
  });
};
