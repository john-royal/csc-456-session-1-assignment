import { useOptionalUser } from "~/lib/auth";
import { likes, QueryBuilder } from "~/lib/repositories";
import { Like } from "~/lib/schema";
import { useSubscription } from "~/lib/use-subscription";

export const useLike = (postId: string) => {
  const user = useOptionalUser();

  const userPostLikeId = user ? `${user.uid}-${postId}` : null;

  const qb: QueryBuilder = (likes, { query, where }) =>
    query(likes, where("postId", "==", postId));
  const transform = (likes: Like[]) => {
    return {
      count: likes.length,
      isLiked: likes.find((like) => like.userId === user!.uid) ? true : false,
    };
  };

  const query = useSubscription({
    queryKey: ["likes", postId],
    getInitialData: async () => {
      const likesForPost = await likes.list(qb);
      return transform(likesForPost);
    },
    getSubscription: (onValue) =>
      likes.subscribe(qb, (newValue) => {
        onValue(transform(newValue));
      }),
  });

  const handleLikeClick = () => {
    if (!user || !userPostLikeId) return;
    if (query.data?.isLiked) {
      void likes.del(userPostLikeId);
    } else {
      void likes.set(userPostLikeId, { postId, userId: user.uid });
    }
  };

  return {
    isLiked: query.data?.isLiked ?? false,
    likeCount: query.data?.count ?? 0,
    handleLikeClick,
  };
};
