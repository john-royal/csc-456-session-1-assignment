import { useMemo } from "react";
import { z } from "zod";

import { QueryBuilder, Repository } from "~/data/common/repository";
import { useSubscription } from "~/data/common/use-subscription";
import { useOptionalUser } from "~/lib/auth";

export const Like = z.object({
  postId: z.string(),
  userId: z.string(),
});

export type Like = z.infer<typeof Like>;

export const likes = new Repository("likes", Like);

export const useLikes = (postId: string) => {
  const user = useOptionalUser();

  const userPostLikeId = user ? `${user.uid}-${postId}` : null;

  const qb: QueryBuilder = (likes, { query, where }) =>
    query(likes, where("postId", "==", postId));

  const query = useSubscription({
    queryKey: ["likes", postId],
    getInitialData: () => likes.list(qb),
    getSubscription: (onValue) =>
      likes.subscribe(qb, (newValue) => {
        onValue(newValue);
      }),
  });

  const { isLiked, likeCount } = useMemo(() => {
    return {
      isLiked: query.data?.find((like) => like.userId === user?.uid)
        ? true
        : false,
      likeCount: query.data?.length ?? 0,
    };
  }, [query.data, user?.uid]);

  const handleLikeClick = () => {
    if (!user || !userPostLikeId) return;
    if (isLiked) {
      void likes.del(userPostLikeId);
    } else {
      void likes.set(userPostLikeId, { postId, userId: user.uid });
    }
  };

  return {
    isLiked,
    likeCount,
    handleLikeClick,
  };
};
