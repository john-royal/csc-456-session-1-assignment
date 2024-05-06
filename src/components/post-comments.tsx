import { Link } from "react-router-dom";
import { toast } from "sonner";

import { useOptionalUser } from "~/lib/auth";
import { comments } from "~/lib/repositories";
import { Comment } from "~/lib/schema";
import { cn } from "~/lib/ui";
import { useFirestoreSubscription } from "~/lib/use-subscription";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button, LoadingButton } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "./ui/form";
import { Textarea } from "./ui/textarea";

export default function PostComments({ postId }: { postId: string }) {
  return (
    <div>
      <h2 className="sr-only">Comments</h2>
      <CommentsList postId={postId} />
      <NewCommentForm postId={postId} />
    </div>
  );
}

function CommentsList({ postId }: { postId: string }) {
  const { data, error, status } = useFirestoreSubscription({
    queryKey: ["comments", postId],
    queryFn: (ref, { query, where, orderBy }) =>
      query(ref, where("postId", "==", postId), orderBy("createdAt", "asc")),
    repository: comments,
  });

  if (status === "pending") {
    return <p>Loading...</p>;
  } else if (status === "error") {
    return <p className="text-red-500">Error: {error.message}</p>;
  } else if (data.length === 0) {
    return <p>No comments yet</p>;
  }
  return (
    <ul>
      {data.map((comment) => (
        <li key={comment.id}>
          <CommentItem comment={comment} />
        </li>
      ))}
    </ul>
  );
}

function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div>
      <div className="flex items-center">
        <Avatar>
          {comment.user.imageUrl && (
            <AvatarImage
              src={comment.user.imageUrl}
              alt={comment.user.username}
            />
          )}
          <AvatarFallback>{comment.user.username[0]}</AvatarFallback>
        </Avatar>
        <h3>{comment.user.username}</h3>
      </div>
      <p>{comment.content}</p>
    </div>
  );
}

function NewCommentForm({ postId }: { postId: string }) {
  const user = useOptionalUser();
  const form = useForm({
    schema: Comment,
    defaultValues: {
      postId,
      user: {
        id: user?.uid,
        username: user?.username,
        imageUrl: user?.profilePicURL ?? null,
      },
      content: "",
    },
  });

  if (!user) {
    return (
      <Button asChild>
        <Link to="/auth/sign-in">Sign in to comment</Link>
      </Button>
    );
  }

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await comments.set(data.id!, data as Comment);
      form.reset();
    } catch (error) {
      toast.error("Failed to post comment", {
        description:
          error instanceof Error ? error.message : "An unknown error occurred.",
      });
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className={cn("space-y-4", !user && "opacity-50")}
      >
        <h2 className="sr-only">New Comment</h2>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton type="submit" loading={form.formState.isLoading}>
          Post Comment
        </LoadingButton>
      </form>
    </Form>
  );
}
