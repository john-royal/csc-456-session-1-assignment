import { Link } from "react-router-dom";
import { toast } from "sonner";

import { conversationsRepository } from "~/data/conversation";
import { Message, messagesRepository, useMessages } from "~/data/message";
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

export default function Messages({
  conversationId,
}: {
  conversationId: string;
}) {
  const { data, error, status } = useMessages(conversationId);

  if (status === "pending") {
    return <p>Loading...</p>;
  } else if (status === "error") {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  return (
    <div>
      <ul>
        {data.length === 0 && <p>No messages yet</p>}
        {data.map((message) => (
          <li key={message.id}>
            <MessageItem message={message} />
          </li>
        ))}
      </ul>
      <NewMessageForm conversationId={conversationId} />
    </div>
  );
}

function MessageItem({ message }: { message: Message }) {
  return (
    <div>
      <div className="flex items-center">
        <Avatar>
          {message.user.imageUrl && (
            <AvatarImage
              src={message.user.imageUrl}
              alt={message.user.username}
            />
          )}
          <AvatarFallback>{message.user.username[0]}</AvatarFallback>
        </Avatar>
        <h3>{message.user.username}</h3>
      </div>
      <p>{message.content}</p>
    </div>
  );
}

function NewMessageForm({ conversationId }: { conversationId: string }) {
  const user = useOptionalUser();
  const form = useForm({
    schema: Message,
    defaultValues: {
      conversationId,
      user: {
        id: user?.uid,
        username: user?.username,
        imageUrl: user?.profilePicURL,
      },
      content: "",
    },
  });

  if (!user) {
    return (
      <Button asChild>
        <Link to="/auth/sign-in">Sign in to message</Link>
      </Button>
    );
  }

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await Promise.allSettled([
        messagesRepository.set(data.id!, data as Message),
        conversationsRepository.set(conversationId, {
          lastMessageContent: data.content,
          lastMessageTime: Date.now(),
        }),
      ]);
      form.reset();
    } catch (error) {
      toast.error("Failed to send message", {
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
        <h2 className="sr-only">New Message</h2>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton type="submit" loading={form.formState.isLoading}>
          Send
        </LoadingButton>
      </form>
    </Form>
  );
}
