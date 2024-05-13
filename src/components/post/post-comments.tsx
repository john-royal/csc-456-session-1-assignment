import { Link } from "react-router-dom";
import { toast } from "sonner";

import { Comment, commentsRepository, useComments } from "~/data/comment";
import { useOptionalUser } from "~/lib/auth";
import { cn } from "~/lib/ui";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button, LoadingButton } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

export default function PostComments({ postId }: { postId: string }) {
  const { data, error, status } = useComments(postId);

  if (status === "pending") {
    return <p>Loading...</p>;
  } else if (status === "error") {
    return <p className="text-red-500">Error: {error.message}</p>;
  } else if (data.length === 0) {
    return (
      <div>
        <p>No comments yet</p>
        <NewCommentForm postId={postId} />
      </div>
    );
  }

  return (
    <div>
      <ul>
        {data.map((comment) => (
          <li key={comment.id}>
            <CommentItem comment={comment} />
          </li>
        ))}
      </ul>
      <NewCommentForm postId={postId} />
    </div>
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
      await commentsRepository.set(data.id!, data as Comment);
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
